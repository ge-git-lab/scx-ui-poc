// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBook } from 'react-icons/fa';
import '../styles/Sidebar.css'; // Import the CSS file

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="brand">
        <h4>SupplierConnect</h4>
      </div>
      <Link to="/" className="sidebar-link">
        <FaHome className="sidebar-icon" />
        Home
      </Link>
      <hr className="separator" />
      <Link to="/courses" className="sidebar-link">
        <FaBook className="sidebar-icon" />
        poc_data_page
      </Link>
      <hr className="separator" />
      <Link to="" className="sidebar-link">
        <FaBook className="sidebar-icon" />
        poc_data_page_2
      </Link>
      <hr className="separator" />
      {/* Add more sidebar links as needed */}
    </nav>
  );
};

export default Sidebar;
