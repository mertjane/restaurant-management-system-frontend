import React, { useState } from "react";
import "./changePwd.component.scss";
import { changePwdTypes } from "./changePwd.types";
import { usePasswordChange } from "../../../lib/hooks/usePasswordChange";
import { confirmPasswordValidator } from "../../../lib/utils/auth.utils";
import Errors from "../formErrors/Errors";

const ChangePwd: React.FC<changePwdTypes> = ({ resetToken, onBackToLogin }) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPwd, setConfirmPwd] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState<boolean>(false);

  const {
    mutate,
    isPending,
    error: mutationError,
  } = usePasswordChange(onBackToLogin);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const validatorError = confirmPasswordValidator(newPassword, confirmPwd);
    if (validatorError) return setError(validatorError);

    mutate({
      token: resetToken,
      newPassword: newPassword,
      confirmPassword: confirmPwd,
    });
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h2>Change your password</h2>
        {error ? (
          <Errors message={error} />
        ) : (
          <p>Enter a new password to change your password.</p>
        )}
        {mutationError && <p className="error">{mutationError.message}</p>}
        <div className="form-group">
          <label htmlFor="newPassword">
            New password <abbr>*</abbr>
          </label>
          <input
            type={showPwd ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? "hide" : "show"}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPwd">
            Re-enter new password <abbr>*</abbr>
          </label>
          <input
            type={showConfirmPwd ? "text" : "password"}
            id="confirmPwd"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
          />
          <span onClick={() => setShowConfirmPwd(!showConfirmPwd)}>
            {showConfirmPwd ? "hide" : "show"}
          </span>
        </div>
        <button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Reset password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePwd;
