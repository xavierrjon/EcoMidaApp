import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser,
  EmailAuthProvider,
  updatePassword,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
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
      await setDoc(doc(db, "users", uid), {
        name,
        email,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error("Erro ao criar documento users:", error);
    }
    try {
      await setDoc(doc(db, "userSettings", uid), {
        userId: uid,
        notificationEnabled: true,
        daysBeforeExpiration: 3,
      });
    } catch (error) {
      console.error("Erro ao criar documento userSettings:", error);
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

  async updateProfile(data: { name?: string; email?: string }): Promise<User> {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser) {
      throw new Error("Usuário não autenticado");
    }

    if (data.name && data.name !== firebaseUser.displayName) {
      await updateProfile(firebaseUser, { displayName: data.name });
    }

    if (data.email && data.email !== firebaseUser.email) {
      await updateEmail(firebaseUser, data.email);
    }

    const userRef = doc(db, "users", firebaseUser.uid);
    await updateDoc(userRef, {
      name: data.name || firebaseUser.displayName,
      email: data.email || firebaseUser.email,
    });

    return this.mapFirebaseUser(firebaseUser);
  }

  async changePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const firebaseUser = auth.currentUser;
    if (!firebaseUser || !firebaseUser.email) {
      throw new Error("Usuário não autenticado");
    }

    const credential = EmailAuthProvider.credential(
      firebaseUser.email,
      currentPassword,
    );
    await reauthenticateWithCredential(firebaseUser, credential);
    await updatePassword(firebaseUser, newPassword);
  }
}

export const authService = new AuthService();
