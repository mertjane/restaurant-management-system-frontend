import { useEffect, useState } from 'react';
import { validateResetToken } from '../api/auth.api';

export type AuthView = "login" | "forgotPassword" | "resetPasswordSent" | "changePassword";

export const useFormRender = () => {
  const [view, setView] = useState<AuthView>("login");
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [email, setEmail] = useState<string | null>(null);
  const [spinner, setSpinner] = useState<boolean>(false);

  // Function to show the spinner
  const showSpinner = () => setSpinner(true);
  const hideSpinner = () => setSpinner(false);

  // Function to transition between views with a spinner effect
  const transitionTo = (nextView: AuthView) => {
    setSpinner(true);
    setTimeout(() => {
      setView(nextView);
      hideSpinner();
    }, 1000); // Spinner delay before rendering new view
  };


  // Function to show the login view
  const showLogin = () => transitionTo("login");
  // Function to show the forgot password view
  const showForgotPassword = () => transitionTo("forgotPassword");
  // Function to show the reset password sent view
  const showResetPasswordSent = (userEmail: string) => {
    setEmail(userEmail);
    transitionTo("resetPasswordSent");
  }

  // Function to show the change password view with the reset token
  const showChangePassword = (token: string) => {
    setResetToken(token);
    transitionTo("changePassword");
  };

  // Fetch reset token from URL params and validate it when the user clicks the link
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      setResetToken(token);
      validateResetToken(token)
        .then(() => showChangePassword(token))  // Proceed to change password if valid
        .catch((error) => setError(error.message)); // Handle invalid token error
    }
  }, []);


  return {
    view,
    email,
    resetToken,
    error,
    spinner,
    showSpinner,
    showLogin,
    showForgotPassword,
    showResetPasswordSent,
    showChangePassword,
  }
}