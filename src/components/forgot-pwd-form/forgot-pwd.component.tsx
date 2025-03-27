import React, { useContext, useState } from "react";
import "./forgot-pwd-component.scss";
import { AuthContext } from "../../context/AuthContext";
import { ButtonLoader } from "../loader/loader.component";

const ForgotPassword: React.FC<{
  setForm: (form: "login" | "forgot-password" | "reset-link-sent") => void;
  resetEmail: string;
  setResetEmail: React.Dispatch<React.SetStateAction<string>>;
}> = ({ setForm, resetEmail, setResetEmail }) => {
  const { forgotPassword } = useContext(AuthContext)!;
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setIsButtonDisabled(true);
    if (!resetEmail) {
      setError("Please enter a value");
      setIsLoading(false)
      setIsButtonDisabled(false);
      return; // Stop execution if email is empty
    }

    try {
      setError("");

      // Call forgotPassword function from AuthContext
      const message = await forgotPassword(resetEmail);
      setTimeout(() => {
        setIsLoading(false);
        setIsButtonDisabled(false);
        setForm("reset-link-sent");
      }, 2500);
    } catch (error: any) {
      setError(error?.message);
      setIsLoading(false)
      setIsButtonDisabled(false)
    }
  };

  const handleReturnToLogin = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default anchor behavior
    setForm("login"); // Switch to the login form
  };

  return (
    <div className="wrapper">
      <>
        <h3>Reset your password</h3>
        <p>Fear not. We'll email you instructions to reset your password. </p>
        <div className="input-wrapper">
          <label htmlFor="email" id="email" className="email">
            Email
          </label>
          <input
            type="text"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <div className="input-error">{error}</div>
          <span className="focus-text">
            We'll email you a password reset link.
          </span>
        </div>

        <div className="control">
          <button onClick={handleSubmit} disabled={isButtonDisabled}>
            {isLoading ? (
              <>
                Loading <ButtonLoader />
              </>
            ) : (
              "Reset Password"
            )}
          </button>
          <a href="#" onClick={handleReturnToLogin}>
            Return to login
          </a>
        </div>
      </>
    </div>
  );
};

export default ForgotPassword;
