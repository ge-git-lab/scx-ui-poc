import React, {Fragment, useState} from "react";
import ListTodo from './ListTodo'

const Order = () => {

    // to define state variable for each filed
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
           const body = {name, email, phone, address, description};
           const response = await fetch('http://localhost:5000/save', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
           })

           window.location = '/';
        } catch (err) {
            console.error(err.message)
        }
    }
    return (
        <Fragment>
            <h1 className="text-center mt-5">SCX Project - Fullstack POC</h1>
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input type='text' className='form-control me-1' placeholder='name' value={name} onChange={e => setName(e.target.value)} />
                <input type='text' className='form-control me-1' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type='text' className='form-control me-1' placeholder='phone' value={phone} onChange={e => setPhone(e.target.value)} />
                <input type='text' className='form-control me-1' placeholder='address' value={address} onChange={e => setAddress(e.target.value)} />
                <input type='text' className='form-control me-2' placeholder='description' value={description} onChange={e => setDescription(e.target.value)} />
                <button className='btn btn-success'>Add</button>
            </form>
            <ListTodo />
        </Fragment>
        
    )
};

export default Order;
