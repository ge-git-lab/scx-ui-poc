// components/AddDataForm.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/Courses'

const AddDataForm = ({ show, handleSaveData, handleClose, editData }) => {
    // const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(editData || {
        name: '',
        email: '',
        phone: '',
        address: '',
        description: '',
    }); //initialize formData with editData if provided

  useEffect(() => {
    // If we are editing existing data, populate the form with that data
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

    // const handleClose = () => {
    //     setFormData({});
    //     setShow(false);
    // }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const handleSave = () => {
        // Call the function to save data to the backend
        if (editData) {
            // If editing existing data
            handleEditData(formData);
        } else {
            // If adding new data
            handleSaveData(formData);
        }
        // Close the modal after saving
        setFormData({});
        handleClose();
    };
    
    const handleEditData = async (data) => {
        try {
            // Make the PUT request to update existing data
            const response = await fetch(`https://nhwx7j6qaa.execute-api.us-east-1.amazonaws.com/scx-dev-1/dspupdatedata/${editData.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                // Handle successful response
                console.log('Data updated successfully!');
                // You can update the UI or trigger any other actions
            } else {
                // Handle error response
                console.error('Failed to update data:', response.status);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? 'Edit Data' : 'Add Data'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone:</Form.Label>
            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {formData.id ? 'Save Changes': 'Save Data'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDataForm;
