import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import Customers from "./pages/customers/Customers";
import Bookings from "./pages/bookings/Bookings";

function App() {
  const [form, setForm] = useState<
    "login" | "forgot-password" | "reset-link-sent" | "change-pwd"
  >("login");

  console.log("App form state:", form);
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Nested Route inside Dashboard */}
            <Route path="customers" element={<Customers />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
