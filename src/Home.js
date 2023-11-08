import React, { Component } from 'react';
import './Home.css'


class Home extends Component {
    render() {
        return (
            <div>
                <div className='container-fluid'>
                    <div className='row g-3 my-2'>
                        <div className='col-12 text-center'>
                                <h1 className='text-center bg-white'>Welcome to SupplierConnect</h1>
                                <p>Streamline Your Supply Chain with Our Extensive Network of ERP-based Module Suupliers</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
