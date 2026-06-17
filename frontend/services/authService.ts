import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase/config";
import { User } from "@/types/user";

class AuthService {
  private mapFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      name: firebaseUser.displayName || "",
      createdAt: firebaseUser.metadata.creationTime
        ? new Date(firebaseUser.metadata.creationTime)
        : new Date(),
    };
  }

  async register(name: string, email: string, password: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      await updateProfile(firebaseUser, { displayName: name });

      this.createUserDocumentsInBackground(firebaseUser.uid, name, email);

      return {
        uid: firebaseUser.uid,
        name,
        email,
        createdAt: new Date(),
      };
    } catch (error: any) {
      throw new Error(this.getFirebaseErrorMessage(error));
    }
  }

  private async createUserDocumentsInBackground(
    uid: string,
    name: string,
    email: string,
  ) {
    try {
      await Promise.all([
        setDoc(doc(db, "users", uid), {
          name,
          email,
          createdAt: serverTimestamp(),
        }),
        setDoc(doc(db, "userSettings", uid), {
          userId: uid,
          notificationEnabled: true,
          daysBeforeExpiration: 3,
        }),
      ]);
    } catch (error) {
      console.error("Erro ao criar documentos em background:", error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const firebaseUser = userCredential.user;

      return {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || "",
        email: firebaseUser.email!,
        createdAt: firebaseUser.metadata.creationTime
          ? new Date(firebaseUser.metadata.creationTime)
          : new Date(),
      };
    } catch (error: any) {
      throw new Error(this.getFirebaseErrorMessage(error));
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      throw new Error("Erro ao sair. Tente novamente.");
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(this.getFirebaseErrorMessage(error));
    }
  }

  getCurrentUser(): User | null {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) return null;
    return this.mapFirebaseUser(firebaseUser);
  }

  private getFirebaseErrorMessage(error: any): string {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Este e-mail já está cadastrado.";
      case "auth/invalid-email":
        return "E-mail inválido.";
      case "auth/weak-password":
        return "Senha muito fraca. Use pelo menos 6 caracteres.";
      case "auth/user-not-found":
        return "Usuário não encontrado.";
      case "auth/wrong-password":
        return "Senha incorreta.";
      default:
        return "Ocorreu um erro. Tente novamente.";
    }
  }
}

export const authService = new AuthService();
