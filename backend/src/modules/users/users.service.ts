import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateMeDto } from './dto/update-me.dto';

export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(input: CreateUserInput) {
    return this.prismaService.user.create({
      data: input,
    });
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  updateRefreshTokenHash(userId: string, refreshTokenHash: string | null) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { refreshTokenHash },
    });
  }

  async me(userId: string) {
    const user = await this.findById(userId);

    if (!user) {
      return null;
    }

    return this.mapUser(user);
  }

  async updateMe(userId: string, updateMeDto: UpdateMeDto) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...(updateMeDto.name ? { name: updateMeDto.name } : {}),
      },
    });

    return this.mapUser(user);
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