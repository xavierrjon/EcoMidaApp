import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await hash(registerDto.password, 10);
    const user = await this.usersService.createUser({
      name: registerDto.name,
      email: registerDto.email,
      password: passwordHash,
    });

    const tokens = await this.generateTokens(user.id, user.email);
    const refreshTokenHash = await hash(tokens.refreshToken, 10);

    await this.usersService.updateRefreshTokenHash(user.id, refreshTokenHash);

    return {
      success: true,
      data: {
        user: this.mapUser(user),
        ...tokens,
      },
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await compare(loginDto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    const refreshTokenHash = await hash(tokens.refreshToken, 10);

    await this.usersService.updateRefreshTokenHash(user.id, refreshTokenHash);

    return {
      success: true,
      data: {
        user: this.mapUser(user),
        ...tokens,
      },
    };
  }

  async refresh(refreshTokenDto: RefreshTokenDto) {
    const payload = await this.jwtService.verifyAsync<{ sub: string; email: string }>(
      refreshTokenDto.refreshToken,
      {
        secret: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret',
      },
    );

    const user = await this.usersService.findById(payload.sub);

    if (!user?.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const refreshTokenMatches = await compare(refreshTokenDto.refreshToken, user.refreshTokenHash);

    if (!refreshTokenMatches) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    const refreshTokenHash = await hash(tokens.refreshToken, 10);

    await this.usersService.updateRefreshTokenHash(user.id, refreshTokenHash);

    return {
      success: true,
      data: tokens,
    };
  }

  async logout(userId: string) {
    await this.usersService.updateRefreshTokenHash(userId, null);

    return {
      success: true,
      data: null,
    };
  }

  private async generateTokens(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync({ sub: userId, email });
    const refreshToken = await this.jwtService.signAsync(
      { sub: userId, email },
      {
        secret: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret',
        expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN ?? '7d') as never,
      },
    );

    return { accessToken, refreshToken };
  }

  private mapUser(user: { id: string; name: string; email: string; createdAt: Date; updatedAt: Date }) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}