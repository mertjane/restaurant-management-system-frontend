import { useState } from "react";

import "./forgotPwd.styles.scss";
import { forgotPwdProps } from "./forgotPwd.types";
import { useForgotPwdQuery } from "../../../lib/hooks/usePwdChQuery";
import { emailValidator } from "../../../lib/utils/auth.utils";
import Errors from "../formErrors/Errors";

const ForgotPwd = ({ onBackToLogin, onResetPwdSent }: forgotPwdProps) => {
  const [email, setEmail] = useState<string>("");
  const [formError, setFormError] = useState<string | null>(null);
  const { mutate, isPending, error } = useForgotPwdQuery(() =>
    onResetPwdSent(email)
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const emailError = emailValidator(email);
    if (emailError) return setFormError(emailError);

    mutate({ email });
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <h1>Reset Password</h1>
        <p>Fear not. We'll email you instructions to reset your password. </p>
        {formError && <Errors message={formError} />}
        {error && <p className="error-message">{error.message}</p>}
        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-text">
            We'll email you a password reset link.
          </span>
        </div>
        <div className="button-group">
          <button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Confirm"}
          </button>
          <span className="back-to-login" onClick={onBackToLogin}>
            Back to login
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgotPwd;
