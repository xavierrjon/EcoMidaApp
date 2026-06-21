import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import {
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { authService } from "@/services/authService";
import { User } from "@/types/user";
import { uploadImageToCloudinary } from "@/services/uploadService";

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateUser: (data: { name: string; email: string }) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<void>;
  updateUserPhoto: (uri: string) => Promise<void>;
  removeProfilePhoto: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email!,
          photo: firebaseUser.photoURL || null,
          createdAt: firebaseUser.metadata.creationTime
            ? new Date(firebaseUser.metadata.creationTime)
            : new Date(),
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    const loggedUser = await authService.login(email, password);
    setUser(loggedUser);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const newUser = await authService.register(name, email, password);
    setUser(newUser);
  };

  const signOut = async () => {
    await authService.logout();
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    await authService.forgotPassword(email);
  };

  const updateUser = async (data: { name: string; email: string }) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Usuário não autenticado");

    if (data.name && data.name !== currentUser.displayName) {
      await updateProfile(currentUser, { displayName: data.name });
    }

    if (data.email && data.email !== currentUser.email) {
      await updateEmail(currentUser, data.email);
    }

    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, {
      name: data.name || currentUser.displayName,
      email: data.email || currentUser.email,
    });

    setUser((prev) =>
      prev
        ? {
            ...prev,
            name: data.name || prev.name,
            email: data.email || prev.email,
          }
        : null,
    );
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.email)
      throw new Error("Usuário não autenticado");

    const credential = EmailAuthProvider.credential(
      currentUser.email,
      currentPassword,
    );
    await reauthenticateWithCredential(currentUser, credential);
    await updatePassword(currentUser, newPassword);
  };

  const updateUserPhoto = async (uri: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Usuário não autenticado");

    const photoUrl = await uploadImageToCloudinary(uri);

    await updateProfile(currentUser, { photoURL: photoUrl });

    const userRef = doc(db, "users", currentUser.uid);
    await setDoc(
      userRef,
      {
        name: currentUser.displayName || "",
        email: currentUser.email || "",
        photo: photoUrl,
        createdAt: new Date(),
      },
      { merge: true }, 
    );

    setUser((prev) => (prev ? { ...prev, photo: photoUrl } : null));
  };

  const removeProfilePhoto = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("Usuário não autenticado");

    await updateProfile(currentUser, { photoURL: null });

    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, { photo: null });

    setUser((prev) =>
      prev
        ? {
            ...prev,
            photo: null,
          }
        : null,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        forgotPassword,
        updateUser,
        changePassword,
        updateUserPhoto,
        removeProfilePhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
