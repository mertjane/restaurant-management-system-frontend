import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import "./dashboard.component.scss";
import { SuccessToaster } from "../../components/toaster/Toaster";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar-container">
        <Sidebar />
      </aside>
      <main className="dashboard-main">
        <Outlet />
      </main>
      <SuccessToaster />
    </div>
  );
};

export default Dashboard;
