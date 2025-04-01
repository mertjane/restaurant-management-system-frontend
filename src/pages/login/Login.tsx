import { useEffect } from "react";
import LoginForm from "../../components/login-form/form.component";
import FooterComponent from "../../components/footer/footer.component";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard"); // Redirect if already logged in
    }
  }, [token, navigate]);

  return (
    <div className="login-container">
      <LoginForm />
      <FooterComponent />
    </div>
  );
};

export default Login;
