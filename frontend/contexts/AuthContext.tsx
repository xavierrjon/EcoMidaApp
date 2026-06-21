// contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { authService } from "@/services/authService";
import { User } from "@/types/user";

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
          photo: firebaseUser.photoURL,
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
    const updatedUser = await authService.updateProfile(data);
    setUser(updatedUser);
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    await authService.changePassword(currentPassword, newPassword);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
