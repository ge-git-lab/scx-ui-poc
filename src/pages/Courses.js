// pages/course.js
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import AddDataForm from '../components/AddDataForm';
// import Button from '../components/Button';
import { Modal, Button, Table} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios'
import { CSVLink } from 'react-csv';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData, saveData, updateData, deleteData, deleteAllData, importData, exportData } from "../components/Api"

const Courses = () => {
  const [courseData, setCourseData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const fileInputRef = useRef(null);
  const [show, setShow] = useState(false);

  const fetchDataAndSetState = async () => {
    try {
      const result = await fetchData('https://asxucwg1u7.execute-api.us-east-1.amazonaws.com/dev-test-1/dspfetchalldata');
      const actualData = JSON.parse(result.body);
      setCourseData(actualData);
    } catch (error) {
      console.log('Error fetching the data');
    }
  }

  useEffect(() => {
    fetchDataAndSetState();
  }, []);

  const handleAddData = async () => {
    setShowAddForm(true);
    setEditData(null);
  };

  const handleEditData = (data) => {
    setEditData(data);
    setShowAddForm(true);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  //function to save a data
  const handleSaveData = async (data) => {
    try {
      await saveData('https://zaoz973vnj.execute-api.us-east-1.amazonaws.com/scx-dsp/dspsavedata', data);

      fetchDataAndSetState();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  //to delete a single item
  const handleDeleteData = async (idToDelete) => {
    try {
      await deleteData('https://nhwx7j6qaa.execute-api.us-east-1.amazonaws.com/scx-dev-1/dspupdatedata', idToDelete)
      setDeleted(true)
      fetchDataAndSetState();
    } catch (error) {
      toast.error('Error deleting data', { position: toast.POSITION.TOP_CENTER })
      console.error('Error deleting data:', error.message);
    }
  }

  const importDataInCSV = async () => {
    const backendData = await handleImport();
    const actualData = JSON.parse(backendData);
    const headers = Object.keys(actualData[0]);
    const csvData = [headers, ...actualData.map(obj => Object.values(obj))];

    //created a temp csv link to trigger the download
    const csvLink = document.createElement('a');
    csvLink.href = encodeURI(`data:text/csv;charset=utf-8, ${csvData.join('\n').replace(/,/g, ',')}`);
    csvLink.target = '_blank';
    csvLink.download = 'dsp_data.csv';
    csvLink.click();
    toast.success('Data imported successfully!', {
      position: toast.POSITION.TOP_CENTER
    });
  };
  //to hadle the import data from db
  const handleImport = async () => {
    try {
      const response = await exportData('https://zkegmoos07.execute-api.us-east-1.amazonaws.com/scx-dsp/dspImportdata');
      const csvData = response;
      return csvData;
      //Process the csv data as needed 
      console.log(csvData);
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }

  //to hadle the export data from db
  const handleExport = async () => {
    try {
      const fileInput = fileInputRef.current;

      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileReader = new FileReader();

        fileReader.onload = () => {
          const csvData = fileReader.result;
          importData(csvData);
        }

        fileReader.readAsText(file);
      } else {
        console.error('No file selected');
      }
    } catch (err) {
      console.error('Error exporting data:', err);
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
      // getData();
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
            <Button variant="warning" className="me-1" onClick={importDataInCSV}>
              Import Data
            </Button>
            <Button variant="warning" className="me-1" onClick={handleShow}>
              Export Data
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              contentLabel="File Attachment Modal">
              <Modal.Header closeButton>
                <Modal.Title>Attach File</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input type='file' ref={fileInputRef} accept=".csv, .xlsx" />
                <Button  variant="primary"onClick={handleExport} className='me-1'>Export</Button>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
              </Modal.Body>
            </Modal>
            <Button variant="success" className="me-1" onClick={handleAddData}>
              Add Data
            </Button>
            <Button variant="danger" onClick={handleDeleteAll}>
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
                  <Button variant="primary" className="me-1" onClick={() => handleEditData(item)}>
                    Edit
                  </Button>
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
