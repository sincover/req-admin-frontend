import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./styles/styles.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <header className="dashboard-header">
          <h2>CS Requisition Data Dash</h2>
        </header>

        <div className="dashboard-tabs">
          <NavLink to="/" activeclassname="active" exact="true" className="tab">
            General CS Req Data
          </NavLink>
          <NavLink to="/graphics" activeclassname="active" className="tab">
            Graphics Req Data
          </NavLink>
          <NavLink to="/photo" activeclassname="active" className="tab">
            Photo Req Data
          </NavLink>
          <NavLink to="/video" activeclassname="active" className="tab">
            Video Req Data
          </NavLink>
        </div>

        <main className="dashboard-content">
          <Outlet />
        </main>

        <footer className="dashboard-footer">{/* Footer content */}</footer>
      </div>
    </div>
  );
};

export default AdminDashboard;
