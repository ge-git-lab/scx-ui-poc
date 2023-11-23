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
        const data = await fetchData();
        setCourseData(data);
        console.log(data)
      } catch (error) {
        // Handle error
      }
    };

    getData();
  }, []);

  const handleAddData = () => {
    setShowAddForm(true);
    setEditData(null);
  };

  const handleEditData = (data) => {
    setEditData(data);
    setShowAddForm(true);
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
          onClose={() => {
            setShowAddForm(false);
            setEditData(null);
          }}
        />
      </div>
    </div>
  );
};

export default Courses;
