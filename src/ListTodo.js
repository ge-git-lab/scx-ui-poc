import React, {Fragment, useEffect, useState} from 'react'

import EditTodo from './EditTodo';

const ListTodo = () => {
    const [todos, setTodos] = useState([])

    //delete function 
    const deleteTodo = async(id) => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/delete/${id}`, {
                method: "DELETE"
            })

            //code which delete item without refreshing the page
            // setTodos(todos.filter(item => item.id !== id));
            window.location='/'
        } catch (err) {
            console.error(err.message)
        }
    }
    const getTodos = async() => {
        try {
            const response = await fetch('https://ozvv67hcb3.execute-api.us-east-1.amazonaws.com/test_scx/dspfetchall')
            const jsonData = await response.json()
            const actualData = JSON.parse(jsonData.body);
            setTodos(actualData)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
       getTodos()
    }, []);

    console.log(todos)
    return (
        <Fragment>
            <table className='table mt-5 text-center'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody className='text-center mt-5'>
                    {todos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.description}</td>
                            <td>
                                <EditTodo item={item} />
                            </td>
                            <td>
                                {/* <!-- Button trigger modal --> */}
                                <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Delete
                                </button>

                                {/* <!-- Modal --> */}
                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="exampleModalLabel">Are you sure to delete the item {item.name}?</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <p>Please note this process cannnot be undone.</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-danger" onClick={() => deleteTodo(item.id)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <button className='btn btn-danger' onClick={() => deleteTodo(item.id)}>Delete</button> */}


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

  export default ListTodo;