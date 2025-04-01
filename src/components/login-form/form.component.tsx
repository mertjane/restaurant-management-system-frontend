import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./form.component.scss";
import RememberMeComponent from "../remember-me/remember-me.component";
import { loginUser } from "../../api/auth";
import { ErrorIcon, PwdHideIcon, PwdShowIcon } from "../icons/Icons";
import { ButtonLoader, Spinner } from "../loader/loader.component";
import ForgotPassword from "../forgot-pwd-form/forgot-pwd.component";
import EmailSuccess from "../email-sent-success/EmailSuccess.component";
import ChangePwd from "../change-pwd/ChangePwd.component";
import { RootState } from "../../redux/store";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState<string>("");

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [form, setForm] = useState<
    "login" | "forgot-password" | "reset-link-sent" | "change-pwd"
  >("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useDispatch<any>();

  const { error } = useSelector((state: RootState) => state.auth);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      setIsSubmit(true);
      setTimeout(() => {
        dispatch(loginUser({ email, password }));
        setIsLoading(false);
        setIsSubmit(false);
      }, 3000);
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
