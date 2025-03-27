import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./form.component.scss";
import RememberMeComponent from "../remember-me/remember-me.component";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../api/auth";
import { ErrorIcon, PwdHideIcon, PwdShowIcon } from "../icons/Icons";
import { ButtonLoader, Spinner } from "../loader/loader.component";
import ForgotPassword from "../forgot-pwd-form/forgot-pwd.component";
import EmailSuccess from "../email-sent-success/EmailSuccess.component";
import ChangePwd from "../change-pwd/ChangePwd.component";

const LoginForm: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [form, setForm] = useState<
    "login" | "forgot-password" | "reset-link-sent" | "change-pwd"
  >("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();

  // Check URL for token and switch form to "change-pwd"
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    console.log("Token detected:", token); // Debug log
    if (token) {
      setForm("change-pwd");
    }
  }, [location]);

  const handleFormSwitch = () => {
    console.log("Switching form..."); // Check if this logs
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setForm((prevForm) =>
        prevForm === "login" ? "forgot-password" : "login"
      );
      console.log("Form switched!"); // Check if this logs
    }, 2500);
  };

  if (!authContext) {
    return <div>Error: Auth context is missing</div>;
  }

  const { login } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmit(true);

    try {
      const response = await loginUser({ email, password });

      // Store token and user info
      login(response.token, response.user);
      

      window.location.href = "/dashboard"; // Redirect after login
    } catch (err: any) {
      setError(err.message);
    } finally {
      // Wait for at least 2 seconds before hiding the loader
      setTimeout(() => {
        setIsSubmit(false); // Reset submit state after 2 seconds
      }, 2000); // 2000 ms = 2 seconds
    }
  };

  // password see and hide back
  const handlePwdSee = () => {
    setShowPwd(!showPwd);
  };

  return (
    <form onSubmit={handleSubmit}>
      {isLoading ? (
        <Spinner />
      ) : form === "login" ? (
        <>
          {error ? (
            <div className="server-error">
              {!email || !password
                ? "Username or Password cannot be empty."
                : error}
              <ErrorIcon />
            </div>
          ) : (
            <h3>Log in</h3>
          )}
          <div className="input-control">
            <label htmlFor="email" className="email-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
              placeholder=""
            />
          </div>
          <div className="input-control">
            <label htmlFor="password" className="password-label">
              Password
            </label>
            <input
              type={showPwd ? "text" : "password"}
              name="password"
              id="password"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
            {showPwd ? (
              <PwdHideIcon onClick={handlePwdSee} />
            ) : (
              <PwdShowIcon onClick={handlePwdSee} />
            )}
            <RememberMeComponent
              email={email}
              setEmail={setEmail}
              handleFormSwitch={handleFormSwitch}
            />
          </div>
          <button type="submit">
            {isSubmit ? (
              <>
                Loading <ButtonLoader />
              </>
            ) : (
              "Log In"
            )}
          </button>
        </>
      ) : form === "forgot-password" ? (
        <ForgotPassword
          setForm={setForm}
          resetEmail={resetEmail}
          setResetEmail={setResetEmail}
        />
      ) : form === "reset-link-sent" ? (
        <EmailSuccess resetEmail={resetEmail} setForm={setForm} />
      ) : (
        <ChangePwd setForm={setForm} form={form} />
      )}
    </form>
  );
};

export default LoginForm;
