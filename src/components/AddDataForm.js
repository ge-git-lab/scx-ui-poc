// components/AddDataForm.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/Courses'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDataForm = ({ show, handleSaveData, handleClose, editData }) => {
    // const [show, setShow] = useState(false);
    const [formData, setFormData] = useState(editData || {
        name: '',
        email: '',
        phone: '',
        address: '',
        description: '',
    }); //initialize formData with editData if provided

    //for input validations data 

    const [formErrors, setFormErrors] = useState({
      name: '',
      email: '',
      phone: '',
      address: '',
      description: '',
    })

    const validateForm = () => {
      let isValid = true;
      const errors = {};

      //to validate each input 
      Object.entries(formData).forEach(([key, value]) => {
        if(!value.trim()) {
          errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
          isValid = false;
        }
        //additional validation
      });

    setFormErrors(errors)
    return isValid;
  }

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
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleSave = () => {
    //validate the form before submission
    // if (validateForm()) {
      // Call the function to save data to the backend
      if (editData) {
        // If editing existing data
        handleEditData(formData);
      } else {
        // If adding new data
        handleSaveData(formData);
      }
    // } else {
      //form is not valid, display validation errors
      // console.log('Form validation failed');
    // }
    // Close the modal after saving
    setFormData({});
    handleClose();
    toast.success('Data saved successfully !', {position: toast.POSITION.TOP_CENTER});
  };
    
    const handleEditData = async (data) => {
        try {
            // Make the PUT request to update existing data
            const response = await fetch(`https://nhwx7j6qaa.execute-api.us-east-1.amazonaws.com/scx-dev-1/dspupdatedata/${editData.id}`, {
                method: 'PUT',
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

    //to disable the submit button is any field is blank 
    const isSubmitDsiabled = Object.values(FormData).some((value) => !value.trim());

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? 'Edit Data' : 'Add Data'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} isInvalid={!!formErrors.name} />
            {/* <Form.Control.Feedback type='invalid'>{formErrors.name}</Form.Control.Feedback> */}
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
