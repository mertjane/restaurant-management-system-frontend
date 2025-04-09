import React, { useEffect, useState } from "react";
import "./resetPwdSent.styles.scss";
import { resetPwdSentProps } from "./resetPwdSent.types";
import { MailSendIcon } from "../../../lib/icons/Icons";
import { formatTime } from "../../../lib/utils/auth.utils";

export interface ResetPwdSentProps extends resetPwdSentProps {
  email: string;
}

const ResetPwdSent: React.FC<ResetPwdSentProps> = ({ onBackToLogin, email}) => {
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

  return (
    <div className="wrapper">
      <MailSendIcon />
      <p>
        The reset password link has been sent to <strong>{email}</strong>.
      </p>
      <p>Didn't receive the mail?</p>
      <div className="control">
        <button disabled={isButtonDisabled}>
          {isLoading ? "Loading..." : isButtonDisabled ? (
            `Resend in ${formatTime(count)}`
          ) : (
            "Send Again"
          )}
        </button>
        <span onClick={onBackToLogin}>Return to login</span>
      </div>
    </div>
  );
};

export default ResetPwdSent;
