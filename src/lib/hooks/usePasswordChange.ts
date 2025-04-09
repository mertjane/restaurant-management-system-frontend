import { useMutation } from "@tanstack/react-query";
import { PasswordResetRequest, PasswordResetResponse } from "../types/auth.types";
import { changePwd } from "../api/auth.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { showToast } from "../redux/slices/toastSlice";


export const usePasswordChange = (onSuccessCallback: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation<PasswordResetResponse, Error, PasswordResetRequest>({
    mutationFn: async (credentials) => changePwd(credentials),
    onSuccess: (data) => {
      dispatch(
        showToast({
          message: "Successfully changed password",
          description: "Your password has been changed successfully.",
          type: "success",
        })
      )
      onSuccessCallback();
    },
    onError: (error) => {
      // Show error toast
      dispatch(
        showToast({
          message: error.message || "Something went wrong!",
          description: "There is an error while changing password.",
          type: "error",
        })
      );
    }
  })
}