import { useEffect, useState } from "react";
import "./loginForm.styles.scss";
import { loginFormProps } from "./loginForm.types";
import { useLoginQuery } from "../../../lib/hooks/useLoginQuery";
import { emailValidator, passwordValidator } from "../../../lib/utils/auth.utils";
import Errors from "../formErrors/Errors";

const LoginForm = ({ onForgotPassword }: loginFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate, isPending, error } = useLoginQuery();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = emailValidator(email);
    const passwordError = passwordValidator(password);

    if (emailError) return setFormError(emailError);
    if (passwordError) return setFormError(passwordError);

    // Proceed with valid form
    setFormError(null);

    mutate({ email, password });
  };

  const handlePwdVisibility = () => setShowPwd(!showPwd);
  // Load saved email on mount
  useEffect(() => {
    const saved = localStorage.getItem("email");
    if (saved) {
      setEmail(saved);
      setRemember(true);
    }
  }, []);

  const handleEmailChange = (e: any) => {
    const value = e.target.value;
    setEmail(value);
    if (remember) localStorage.setItem("email", value);
  };

  const handleCheckbox = (e: any) => {
    const checked = e.target.checked;
    setRemember(checked);
    if (checked) localStorage.setItem("email", email);
    else localStorage.removeItem("email");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h1>Member login</h1>
      {formError && <Errors message={formError} />}
      {error && <p className="error-message">{error.message}</p>}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleEmailChange(e);
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type={!showPwd ? "password" : "text"}
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="show-pwd" onClick={handlePwdVisibility}>
          {!showPwd ? "SHOW" : "HIDE"}
        </span>
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="customCheckbox"
            checked={remember}
            onChange={handleCheckbox}
          />
          <label htmlFor="customCheckbox">
            Remember me <span className="checkmark"></span>
          </label>
        </div>
        <span className="forgot-password" onClick={onForgotPassword}>
          Forgot password?
        </span>
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
