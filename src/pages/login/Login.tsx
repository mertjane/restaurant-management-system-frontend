import { useFormRender } from "../../lib/hooks/useFormRender";
import LoginForm from "../../components/auth/loginForm/LoginForm";
import ForgotPwd from "../../components/auth/forgotPwd/ForgotPwd";
import "./login.component.scss";
import Spinner from "../../components/spinner/Spinner";
import ResetPwdSent from "../../components/auth/resetPwdSent/ResetPwdSent";
import ChangePwd from "../../components/auth/changePwd/ChangePwd";
import { SuccessToaster } from "../../components/toaster/Toaster";

const Login = () => {
  const {
    view,
    email,
    spinner,
    showForgotPassword,
    showLogin,
    showResetPasswordSent,
    resetToken,
    error,
  } = useFormRender();
  return (
    <div className="login-container">
      <div className="layer">
        {spinner ? (
          <Spinner />
        ) : view === "login" ? (
          <LoginForm onForgotPassword={showForgotPassword} />
        ) : view === "forgotPassword" ? (
          <ForgotPwd
            onBackToLogin={showLogin}
            onResetPwdSent={(email: string) => showResetPasswordSent(email)}
          />
        ) : view === "resetPasswordSent" && email ? (
          <ResetPwdSent email={email} onBackToLogin={showLogin} />
        ) : view === "changePassword" && resetToken ? (
          <ChangePwd resetToken={resetToken} onBackToLogin={showLogin} />
        ) : error ? (
          <p>{error}</p>
        ) : null}
      </div>
      <SuccessToaster/>
    </div>
  );
};

export default Login;
