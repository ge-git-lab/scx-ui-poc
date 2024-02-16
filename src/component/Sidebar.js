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
                <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                Home
            </Link>
            <hr className="separator" />
            <div className="sidebar-link" onClick={handleItemClick} style={{ cursor: 'pointer' }}>
                {showSubitems ? (
                    <FontAwesomeIcon icon={faAngleDown} style={{ marginRight: '5px' }} />
                ) : (
                        <FontAwesomeIcon icon={faAngleRight} style={{ marginRight: '5px' }} />
                    )}
        Copy Subs Project
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
                    <Link to="/copysubs/copysubsdqapproval" className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                        <div>Copy Subs DQ Approval</div>
                    </Link>
                    <hr className="separator" />
                    <Link to="/copysubs/copysubsbucaddition" className="sidebar-link" style={{ textDecoration: 'none' }}>
                        <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                        <div>Copy Subs Buc Addition</div>
                    </Link>
                </div>
            )}
            <hr className="separator" />
            <Link to="/tpsagreementsiteslookup" className="sidebar-link">
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                TPS Agreement Sites Lookup Page
            </Link>
            <hr className="separator" />
            <Link to="/refdataincotermlookup" className="sidebar-link">
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Reference Data: IncoTerms Lookup
            </Link>
            <hr className="separator" />
            <Link to="/refdatapaymenttermlookup" className="sidebar-link">
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Reference Data: Payment Term Lookup
            </Link>
            <hr className="separator" />
            <Link to="/refdatataxclassificationlookup" className="sidebar-link">
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Reference Data: Tax Classification Lookup
            </Link>
            <hr className="separator" />
            <Link to="/settlementpayprocesslookup" className="sidebar-link">
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Settlement and Payment Process Look up
            </Link>
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Gold BUC Info
            </Link>
            <hr className="separator" />
            <Link to="/" className="sidebar-link">
                <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '5px' }} />
                Update TaxId
            </Link>
            {/* Add more sidebar links as needed */}
        </nav>
    );
};

export default Sidebar;

