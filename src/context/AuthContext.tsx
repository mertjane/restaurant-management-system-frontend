import React, { createContext, useState } from "react";
import { changePwd, forgotPwd } from "../api/auth";
import { User } from "../api/types";

interface AuthContextType {
  token: string | null;
  login: (token: string, user: User) => void;
  user: User | null;
  logout: () => void;
  forgotPassword: (email: string) => Promise<string>;
  changePassword: (credentials: {
    newPassword: string;
    confirmPassword: string;
    token: string;
  }) => Promise<string>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (token: string, user: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user)); // Store user info
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Forgot Password Function
  const forgotPassword = async (email: string): Promise<string> => {
    try {
      const response = await forgotPwd({ email }); // Call API
      return response.message; // Return success message
    } catch (error: any) {
      throw new Error(error.message || "Failed to send reset email.");
    }
  };

  // Change Pwd Function
  const changePassword = async (credentials: {
    newPassword: string;
    confirmPassword: string;
    token: string;
  }): Promise<string> => {
    try {
      const response = await changePwd(credentials);
      return response.message;
    } catch (error: any) {
      throw new Error(error.message || "Failed to reset password.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, forgotPassword, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
