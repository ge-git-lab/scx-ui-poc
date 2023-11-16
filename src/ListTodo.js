import React, {Fragment, useEffect, useState} from 'react'

const ListTodo = () => {
    const [todos, setTodos] = useState([])

    
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
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
};

  export default ListTodo;