import React from "react";

interface ErrorsProps {
  message?: string;
}

const Errors: React.FC<ErrorsProps> = ({ message }) => {
  if (!message) return null;

  return <p className="error-message">{message}</p>;
};

export default Errors;
