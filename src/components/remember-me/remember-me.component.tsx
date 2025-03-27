import React, { useEffect, useState } from "react";
import "./remember-me.component.scss";

const RememberMeComponent: React.FC<{
  email: string;
  setEmail: (email: string) => void;
  handleFormSwitch: () => void;
}> = ({ email, setEmail, handleFormSwitch }) => {
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  // load remember me state from localStorage on component mount

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, [setEmail]);

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);

    if (isChecked) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };

  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        name="remember"
        id="remember"
        checked={rememberMe}
        onChange={handleRememberMeChange}
      />
      <label htmlFor="remember" id="remember-label">
        Remember Me
      </label>
      <a href="#" id="reset-pwd" onClick={handleFormSwitch}>
        Forgot password
      </a>
    </div>
  );
};

export default RememberMeComponent;
