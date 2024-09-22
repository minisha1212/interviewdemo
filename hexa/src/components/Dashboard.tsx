import React from 'react';
import { Outlet, Link,useNavigate } from 'react-router-dom';  
import { logout } from '../utils/auth'; 


const Dashboard = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <div className="wrapper">
      {/* Main Sidebar Container */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <span className="brand-text font-weight-light">HEXA</span>
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item">
                <Link to="/dashboard/home" className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>Home</p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/dashboard/profile" className="nav-link">
                  <i className="nav-icon fas fa-user"></i>
                  <p>Profile</p>
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/dashboard/tasks" className="nav-link">
                  <i className="nav-icon fas fa-cogs"></i>
                  <p>Manage Task</p>
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link">
                  <i className="nav-icon fas fa-cogs"></i>
                  <p>Logout</p>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0"></h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="content">
          <div className="container-fluid">
            <Outlet /> {/* This renders nested routes */}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="main-footer">
        <strong>Copyright &copy; 2024 <a href="#">Your Company</a>.</strong>
        All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
