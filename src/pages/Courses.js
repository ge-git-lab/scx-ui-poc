// pages/course.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
// import Button from '../components/Button';
// import AddDataForm from '../components/AddDataForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from '../components/DataTable';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Button, Table } from 'react-bootstrap';
import AddDataForm from '../components/AddDataForm';

const Courses = () => {
  const [courseData, setCourseData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleted, setDeleted] = useState(false);

  // to fetch the data
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
  
  useEffect(() => {
    // const getData = async () => {
    //   try {
    //     const response = await fetch('https://asxucwg1u7.execute-api.us-east-1.amazonaws.com/dev-test-1/dspfetchalldata')
    //     const jsonData = await response.json()
    //     const actualData = JSON.parse(jsonData.body);
    //     setCourseData(actualData);
    //     console.log(actualData)
    //   } catch (error) {
    //     // Handle error
    //   }
    // };

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
        const response = await fetch('https://zaoz973vnj.execute-api.us-east-1.amazonaws.com/scx-dsp/dspsavedata', {
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
        getData();
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

//to delete a single item
  const handleDeleteData = async (idToDelete) => {
    const isConfirmed = window.confirm('Are you sure want to delete the item ?')
    if (isConfirmed) {
      try {

        const response = await fetch(`https://nhwx7j6qaa.execute-api.us-east-1.amazonaws.com/scx-dev-1/dspupdatedata/${idToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            // Include any additional headers if needed
          },
        });


        if (response.ok) {
          // Successful deletion
          setDeleted(true)
          toast.success('Item deleted successfully!', { position: toast.POSITION.TOP_CENTER });
          console.log('deleted the data')
          // Update your state or fetch data again as needed
        } else {
          // Handle errors
          toast.warning('Failed to delete data, please try again!', { position: toast.POSITION.TOP_CENTER });
          console.error('Error deleting data:', response.statusText);
        }
        getData();
      } catch (error) {
        toast.error('Error deleting data', { position: toast.POSITION.TOP_CENTER })
        console.error('Error deleting data:', error.message);
      }
    } else {
       toast.info('Deletion cancelled.', { position: toast.POSITION.TOP_CENTER })
    }
  }

  //to delete all the data 
  const handleDeleteAll = async () => {
    try {
        const response = await fetch('https://vc3d6uum44.execute-api.us-east-1.amazonaws.com/scx-dev-1/dspdeletealldata', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Include any additional headers if needed
            },
        });

        if (response.status === 204) {
            // Successful deletion of all records
            // Update your state or fetch data again as needed
        } else {
            // Handle errors
            console.error('Error deleting all data:', response.statusText);
        }
        getData();
    } catch (error) {
        console.error('Error deleting all data:', error.message);
    }
};

  return (
    <div className='row'>
       <Header title="SCX Data Page" />
      <div className="container mt-4 mb-2">
        <div className="d-flex justify-content-end">
          <div className="ml-2">
            <Button variant="success" className="me-2" onClick={handleAddData}>
              Add Data
            </Button>
            <Button variant="danger"  onClick={handleDeleteAll}>
              Delete All
            </Button>
          </div>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {courseData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
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
