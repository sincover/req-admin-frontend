import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminDash.css';

const AdminDashboard = () => {
  return (
    <div className='dashboard-container'>
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>CS Requisition Data Dash</h1>
      </header>
      
      <div className="dashboard-tabs">
        <NavLink to="/" activeClassName="active" exact className="tab">
          General CS Req Data
        </NavLink>
        <NavLink to="/graphics" activeClassName="active" className="tab">
          Graphics Req Data
        </NavLink>
        <NavLink to="/photo" activeClassName="active" className="tab">
          Photo Req Data
        </NavLink>
        <NavLink to="/video" activeClassName="active" className="tab">
          Video Req Data
        </NavLink>
      </div>

      <main className="dashboard-content">
        <Outlet />
      </main>

      <footer className="dashboard-footer">
        {/* Footer content */}
      </footer>
    </div>
    </div>
  );
};

export default AdminDashboard;

