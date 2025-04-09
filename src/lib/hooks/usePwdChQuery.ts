import { useMutation } from "@tanstack/react-query";
import { forgotPwd } from "../api/auth.api";
import type { ForgotPwdRequest, ForgotPwdResponse } from "../types/auth.types";

export const useForgotPwdQuery = (onSuccessCallback: (email: string) => void) => {
  return useMutation<ForgotPwdResponse, Error, ForgotPwdRequest>({
    mutationFn: (credentials) => forgotPwd(credentials),
    onSuccess: (data, variables) => {
      onSuccessCallback(variables?.email) // call view transition function
    },
    onError: (error) => {
      console.error("Forgot password error:", error.message);
    },
  });
};