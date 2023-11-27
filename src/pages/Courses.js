// pages/course.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
// import Button from '../components/Button';
// import AddDataForm from '../components/AddDataForm';
import DataTable from '../components/DataTable';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Table } from 'react-bootstrap';
import AddDataForm from '../components/AddDataForm';
import { fetchData } from '../App'; // Import the fetchData utility function

const Courses = () => {
  const [courseData, setCourseData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState(null);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://asxucwg1u7.execute-api.us-east-1.amazonaws.com/dev-test-1/dspfetchalldata')
        const jsonData = await response.json()
        const actualData = JSON.parse(jsonData.body);
        setCourseData(actualData);
        console.log(actualData)
      } catch (error) {
        // Handle error
      }
    };

    getData();
  }, []);

  const handleAddData = async () => {
    setShowAddForm(true);
    setEditData(null);
  };

  const handleEditData = (data) => {
    setEditData(data);
    setShowAddForm(true);
  };

  const handleSaveData = async (data) => {
    try {
        // Make the POST request to save data to the backend
        const response = await fetch('https://99hqr8pdt2.execute-api.us-east-1.amazonaws.com/dev-test-1/dspSaveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            // Handle successful response
            console.log('Data saved successfully!');
            // You can update the UI or trigger any other actions
        } else {
            // Handle error response
            console.error('Failed to save data:', response.status);
        }
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

  const handleDeleteData = (id) => {
    setCourseData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className='row'>
       <Header title="SCX Data Page" />
      <div className="container mt-4 mb-2">
        <div className="d-flex justify-content-end">
          <div className="ml-2">
            <Button variant="success" onClick={handleAddData}>
              Add Data
            </Button>
          </div>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.description}</td>
                <td>
                  <Button variant="primary" onClick={() => handleEditData(item)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteData(item.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddDataForm
          show={showAddForm}
          editData={editData}
          handleSaveData={handleSaveData}
          handleClose={() => {
            setShowAddForm(false);
            setEditData(null);
          }}
        />
      </div>
    </div>
  );
};

export default Courses;
