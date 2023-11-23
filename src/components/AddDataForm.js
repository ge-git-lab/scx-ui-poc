// components/AddDataForm.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddDataForm = ({ show, editData, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    description: '',
  });

  useEffect(() => {
    // If we are editing existing data, populate the form with that data
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // You can add logic here to save data to the backend
    console.log('Save data:', formData);

    // Reset the form after saving
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      description: '',
    });

    onClose(); // Close the modal
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{editData ? 'Edit Data' : 'Add Data'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="phone">
            <Form.Label>Phone:</Form.Label>
            <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} />
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
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDataForm;
