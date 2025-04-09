

// Format a date string into a more readable format
export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

// Function to format a date string into a more readable format
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


// Function to validate email format using regex
export const emailValidator = (email: string): string | null => {
  if (!email) return "Email is required.";

  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }
  return null;
}

// Function to validate password length and requirements
export const passwordValidator = (password: string): string | null => {
  if (!password) return "Password is required.";
  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  return null;
};

// Function to validate confirm password against the original password
export const confirmPasswordValidator = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!password || !confirmPassword) {
    return "Both password fields are required.";
  }
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }
  if (confirmPassword.length < 8) {
    return "Confirm password must be at least 8 characters long.";
  }
  if (confirmPassword.length > 20) {
    return "Confirm password must be at most 20 characters long.";
  }
  return null;
};
