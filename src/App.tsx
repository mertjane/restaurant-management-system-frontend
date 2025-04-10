import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTES } from "./lib/routes/routes";
import Login from "./pages/login/Login";
import "./App.scss";
import ProtectedRoute from "./lib/routes/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";
import Bookings from "./pages/bookings/Bookings";
import PublicRoute from "./lib/routes/PublicRoute";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          {/* Only accessible if NOT logged in */}
          <Route element={<PublicRoute />}>
            <Route path={ROUTES.ROOT} element={<Login />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />}>
              <Route path="customers" element={<Customers />} />
              <Route path="bookings" element={<Bookings />} />
              {/* 
              <Route path="menu" element={<MenuComponent />} /> */}
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
