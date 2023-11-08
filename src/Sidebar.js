import React, {Component} from 'react';
import './Sidebar.css'

class Sidebar extends Component {
    render() {
        return (
            <div className="bg-white sidebar p-2">
                <div className='m-2'>
                    <i className="bi bi-bootstrap-fill me-2 fs-4"></i>
                    <span className="brand-name fs-4">SupplierConnect</span>
                </div>
                <hr className="text-dark" />
                <div className='list-group list-group-flush'>
                    <a className='list-group-item list-group-item-action py-2'>
                        <i className="bi bi-speedometer-2 fs-5 me-2"></i>
                        <span>Copy Sub Project</span>
                    </a>
                    <a className='list-group-item list-group-item-action py-2'>
                        <i className="bi bi-table fs-2 me-2"></i>
                        <span>Products</span>
                    </a>
                    <a className='list-group-item list-group-item-action py-2'>
                        <i className="bi bi-clipboard fs-2 me-2"></i>
                        <span>Reports</span>
                    </a>
                    <a className='list-group-item list-group-item-action py-2'>
                        <i className="bi bi-people fs-2 me-2"></i>
                        <span>Customers</span>
                    </a>
                    <a className='list-group-item list-group-item-action py-2'>
                        <i className="bi bi-data fs-2 me-2"></i>
                        <span>Data</span>
                    </a>
                    <a className='list-group-item list-group-item-action py-2'>
                        <i className="bi bi-data fs-2 me-2"></i>
                        <span>Others</span>
                    </a>

                </div>
            </div>
        );
    }
}

export default Sidebar;
