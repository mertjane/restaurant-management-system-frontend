import axios from "axios";

export const setupApiMiddleware = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API Error:", error.response || error.message);
      return Promise.reject(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  );
};
