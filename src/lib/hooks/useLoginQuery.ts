// src/hooks/useLoginQuery.ts
import { useMutation } from "@tanstack/react-query";

import { login } from "../api/auth.api";
import type { LoginResponse } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { setUser } from "../redux/slices/authSlice";

interface LoginCredentials {
  email: string;
  password: string;
}

export const useLoginQuery = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Use useMutation and directly return it without passing generics in the call
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: ({ email, password }) => login(email, password),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      // Dispatch the setUser action with the full user object
      dispatch(
        setUser({
          token: data.token,
          user: {
            id: data.user.id,
            email: data.user.email,
            resetToken: data.user.resetToken,  // Ensure reset_token is passed
          },
        })
      );
      navigate("/dashboard"); // navigate after success
    },
  });
};


