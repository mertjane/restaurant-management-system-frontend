import React, { useContext, useEffect, useState } from "react";
import "./email-sent-success.component.scss";
import { MailSendIcon } from "../icons/Icons";

import { AuthContext } from "../../context/AuthContext";
import { ButtonLoader } from "../loader/loader.component";

const EmailSuccess: React.FC<{
  resetEmail: string;
  setForm: (form: "login" | "forgot-password" | "reset-link-sent") => void;
}> = ({ setForm, resetEmail }) => {
  const { forgotPassword } = useContext(AuthContext)!;
  const [count, setCount] = useState<number>(120);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Start the countdown when the component is mounted
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer); // Stop the timer when it reaches 0
          setIsButtonDisabled(false); // Enable the "Send Again" button
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000); // Update every second

    // Cleanup the timer when the component is unmounted
    return () => clearInterval(timer);
  }, [isButtonDisabled]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setIsButtonDisabled(true);
    setCount(120); // Reset the countdown timer

    try {
      await forgotPassword(resetEmail);
    } catch (error: any) {
      console.log(error?.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="wrapper">
      <MailSendIcon />
      <p>
        The reset password link has been sent to <strong>{resetEmail}</strong>.
      </p>
      <p>Didn't receive the mail?</p>
      <div className="control">
        <button disabled={isButtonDisabled} onClick={handleSubmit}>
          {isLoading ? (
            <>
              Loading <ButtonLoader />{" "}
            </>
          ) : isButtonDisabled ? (
            `Resend in ${formatTime(count)}`
          ) : (
            "Send Again"
          )}
        </button>
        <a href="#" onClick={() => setForm("login")}>
          Return to login
        </a>
      </div>
    </div>
  );
};

export default EmailSuccess;
