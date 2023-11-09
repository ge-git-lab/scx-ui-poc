import React, {Component} from 'react';
import './Sidebar.css'
import {Link} from 'react-router-dom';

class Sidebar extends Component {
    render() {
        return (
            <div className='sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100'>
                <div>
                    <a href='d-flex align-items-center'>
                        <i className='bi bi-bootstrap fs-5 me-2'></i>
                        <span className='fs-4'>SupplierConnect</span>
                    </a>
                    <hr className='text-secondary' />
                    <ul className="nav nav-pills flex-column">
                        <li className="nav-item p-1">
                            <Link className="nav-link text-white" to="/">Home</Link>
                        </li>
                        <li className="nav-item p-1">
                            <Link className="nav-link text-white" to="order">Order</Link>
                        </li>
                        <li className="nav-item p-1">
                            <a className="nav-link text-white" href="#">Products</a>
                        </li>
                        <li className="nav-item p-1">
                            <a className="nav-link text-white" href="#">Reports</a>
                        </li>
                        <li className="nav-item p-1">
                            <a className="nav-link text-white" href="#">Others</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <hr className='text-secondary' />
                    <a className='back-to-top' href=''>Back To Top</a>
                </div>
            </div>
        );
    }
}

export default Sidebar;
