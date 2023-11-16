import React, { Component } from 'react';
import './Home.css'
import {toast, ToastContainer} from 'react-toastify';



class Home extends Component {
    render() {
        return (
            <div className='row text-center mt-5'>
                <h1 className='text-center'>Welcome to SupplierConnect</h1>
                <p>Streamline Your Supply Chain with Our Extensive Network of ERP-based Module Suupliers</p>
            </div>
        );
    }
}

export default Home;
