import React from "react";
import LoginForm from "../../components/login-form/form.component";
import "./Login.scss";
import FooterComponent from "../../components/footer/footer.component";

const Login = () => {
  return (
    <div className="login-container">
      <LoginForm />
      <FooterComponent />
    </div>
  );
};

export default Login;
