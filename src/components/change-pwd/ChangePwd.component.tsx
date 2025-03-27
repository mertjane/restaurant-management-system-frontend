import { useState, useEffect, useContext } from "react";
import "./changePwd.component.scss";

import { useLocation } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../api/auth";
import { Success } from "../animations/Animation";
import { PwdHideIcon, PwdShowIcon } from "../icons/Icons";

interface ChangePwdProps {
  form: string;
  setForm: React.Dispatch<
    React.SetStateAction<
      "login" | "forgot-password" | "reset-link-sent" | "change-pwd"
    >
  >;
}

// Define the error response type for better TypeScript inference
interface ErrorResponse {
  message: string;
  // You can extend this with any other fields expected in the response
}

const ChangePwd: React.FC<ChangePwdProps> = ({ setForm, form }) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is missing");
  }
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState(false);
  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState<boolean>(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Extract query parameters
  const queryToken = queryParams.get("token"); // Get the token from the URL

  useEffect(() => {
    const fetchTokenValidation = async () => {
      if (!queryToken) {
        setError("Invalid or missing reset token.");
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/reset-password`, {
          params: { token: queryToken },
        });
        if (response.data.success) {
          setTokenValid(true); // Token is valid based on JSON response
        } else {
          setError(response.data.message || "Unexpected response from server.");
        }
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        if (axiosError.response) {
          setError(
            `Failed to validate token: ${
              axiosError.response.data?.message || "Unknown error"
            }`
          );
        } else if (axiosError.request) {
          setError("Server did not respond.");
        } else {
          setError("Failed to validate token.");
        }
      }
    };

    fetchTokenValidation();
  }, [queryToken, setForm]);

  const handleResetPwd = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password should contain 8 characters.");
      return;
    }

    if (!queryToken) {
      setError("Reset token is missing.");
      return;
    }

    try {
      const message = await authContext.changePassword({
        newPassword,
        confirmPassword,
        token: queryToken, // Type-safe due to prior check
      });
      setSuccessMessage(message);

      setTimeout(() => setForm("login"), 3000); // Redirect to login after success
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password.");
    }
  };

  // password see and hide back
  const handlePwdSee = () => {
    setShowPwd((prev) => !prev);
  };

  const handleConfirmSee = () => {
    setShowConfirmPwd((prev) => !prev);
  };

  return (
    <div className="wrapper">
      {successMessage ? (
        <p className="success-message">
          <Success />
          {successMessage}
        </p>
      ) : tokenValid ? (
        <>
          <h3>Change your password</h3>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <p>Enter a new password below to change your password.</p>
          )}

          <div className="input-control">
            <label htmlFor="newPassword">
              New password <abbr>*</abbr>
            </label>
            <input
              type={showPwd ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <div className="icon-box">
              {showPwd ? (
                <PwdHideIcon onClick={handlePwdSee} />
              ) : (
                <PwdShowIcon onClick={handlePwdSee} />
              )}
            </div>
          </div>
          <div className="input-control">
            <label htmlFor="confirmPwd">
              Re-enter new password <abbr>*</abbr>
            </label>
            <input
              type={showConfirmPwd ? "text" : "password"}
              id="confirmPwd"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="icon-box">
              {showConfirmPwd ? (
                <PwdHideIcon onClick={handleConfirmSee} />
              ) : (
                <PwdShowIcon onClick={handleConfirmSee} />
              )}
            </div>
          </div>
          <button onClick={handleResetPwd}>Reset password</button>
        </>
      ) : (
        <p className="error-message">
          Invalid token. Please check your email for a valid reset link.
        </p>
      )}
    </div>
  );
};

export default ChangePwd;
