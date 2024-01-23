// Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight, faHome, faFileAlt } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
    const [showSubitems, setShowSubitems] = useState(false);

    const handleItemClick = () => {
        setShowSubitems(!showSubitems)
    }
    return (
        <nav className="sidebar">
            <div className="brand">
                <h4>SupplierConnect</h4>
            </div>
            <Link to="/" className="sidebar-link">
                {/* <FaHome className="sidebar-icon" /> */}
                <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                Home
            </Link>
            <hr className="separator" />
            {/* <div to="/item1" className="sidebar-link"> */}
                {/* <FaBook className="sidebar-icon" /> */}
                <div className="sidebar-link" onClick={handleItemClick} style={{ cursor: 'pointer' }}>
                    {showSubitems ? (
                      <FontAwesomeIcon icon={faAngleDown} style={{ marginRight: '5px' }} />
                    ) : (
                      <FontAwesomeIcon icon={faAngleRight} style={{ marginRight: '5px' }} />
                    )}
        Copy Subs Project
        {/* </div> */}
            </div>

            {showSubitems && (
                <div style={{ marginLeft: '20px' }}>
                    <Link to="/copysubs/subleveldqremediation" className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                        <div>Subs Level DQ Remediation</div>
                    </Link>
                    <hr className="separator" />
                    <Link to="/copysubs/copysubscontactaddition" className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                        <div>Copy Subs Contact Addition</div>
                    </Link>
                    <hr className="separator" />
                    <Link to="/copysubs/copysubsbankaddition" className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                        <div>Copy Subs Bank Addition</div>
                    </Link>
                    <hr className="separator" />
                    <Link to="/copysubs/copysubstax" className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                        <div>Copy Subs Tax</div>
                    </Link>
                    <hr className="separator" />
                    <Link to="/copysubs/copysubsscopedetails" className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                        <div>Copy Subs Scope Details</div>
                    </Link>
                    <hr className="separator" />
                    <Link to="/copysubs/copysubsdqapproval" className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                        <div>Copy Subs DQ Approval</div>
                    </Link>
                    <hr className="separator" />
                    <Link to="/copysubs/copysubsdqapproval" className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                        <div>Testing Webpages</div>
                    </Link>
                </div>
            )}
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
                {/* <FaBook className="sidebar-icon" /> */}
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Ref Data Top Side Update
            </Link>
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
                {/* <FaBook className="sidebar-icon" /> */}
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Reference Data: IncoTerms Lookup
            </Link>
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
               <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Gold/BUC/Branch Top side update
            </Link>
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
                {/* <FaBook className="sidebar-icon" /> */}
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                GSL6 and GSL9 Merge	
            </Link>
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
                {/* <FaBook className="sidebar-icon" /> */}
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Fyi approvals
            </Link>
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
                {/* <FaBook className="sidebar-icon" /> */}
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Gold BUC Info
            </Link>
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
                {/* <FaBook className="sidebar-icon" /> */}
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Update TaxId
            </Link>
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
                {/* <FaBook className="sidebar-icon" /> */}
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Matching /Grouping
            </Link>
            <hr className="separator" />
            {/* Add more sidebar links as needed */}
        </nav>
    );
};

export default Sidebar;

