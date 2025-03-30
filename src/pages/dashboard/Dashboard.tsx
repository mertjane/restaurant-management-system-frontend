import { useState } from "react";
import { DashboardHeader } from "../../components/header/Header";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routing
import "./Dashboard.scss";

import { DashboardSidebar } from "../../components/sidebar/Sidebar";

const Dashboard = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);

  const toggleSidebar = () => setOpenSidebar(!openSidebar);
  return (
    <div className="dashboard-container">
      <DashboardHeader
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
      />
      <aside className={`sidebar ${openSidebar ? "open" : "closed"}`}>
        <DashboardSidebar />
      </aside>

      <main className={`dashboard-main ${openSidebar ? "open" : "closed"}`}>
        <article>
          <Outlet /> {/* This will render the nested pages */}
        </article>
      </main>
    </div>
  );
};

export default Dashboard;
