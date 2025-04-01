import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import Customers from "./pages/customers/Customers";
import Bookings from "./pages/bookings/Bookings";
import MenuComponent from "./pages/menu/MenuComponent";

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

          {/* Protected Route for Authenticated Users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="customers" element={<Customers />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="menu" element={<MenuComponent />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
