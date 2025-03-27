import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { RestaurantProvider } from "./context/RestaurantContext.tsx";
import { CustomersProvider } from "./context/CustomersContext";
import { BookingProvider } from "./context/BookingContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RestaurantProvider>
        <CustomersProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </CustomersProvider>
      </RestaurantProvider>
    </AuthProvider>
  </StrictMode>
);
