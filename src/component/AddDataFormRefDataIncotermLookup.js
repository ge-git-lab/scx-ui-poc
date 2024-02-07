import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/CopySubsTax'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from "./Api"

const AddDataFormRefDataIncotermLookup = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "zsource": "",
    "Erp Term": "",
    "Erp Name": "",
    "SCX Term": "",
    "SCX Name": "",
    "addedby": "",
    "addedon": "",
    "changedby": "",
    "changedon": "",
  }); //initialize formData with editData if provided

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

  const handleSave = (e) => {
    e.preventDefault();
    // Check if any field is empty
    let isEmpty = false;
    for (const key in formData) {
      if (formData[key] === '') {
        isEmpty = true;
        break;
      }
    }

    if (editData) {
      // If editing existing data
      handleEditData(formData);
      setFormData({});
    } else {
      // If adding new data
      handleSaveData(formData);
      setFormData({});
    }
    handleClose();
    toast.success('Data saved successfully !', { position: toast.POSITION.TOP_CENTER });

  };

  const handleEditData = async (data) => {
    try {
      // Make the PUT request to update existing data
      const response = await fetch(`https://jlqq9h5b2c.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/dsprefdataincotermlookup/${editData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Data updated successfully!');
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
          <Form.Group controlId="DATA_SOURCE">
            <Form.Label>DATA&nbsp;SOURCE:</Form.Label>
            <Form.Control type="text" name="zsource" value={formData.zsource || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="ERP Term">
            <Form.Label>ERP&nbsp;TERM:</Form.Label>
            <Form.Control type="text" name="ERP Term" value={formData['ERP Term']} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="ERP Name">
            <Form.Label>ERP&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="ERP Name" value={formData['ERP Name']} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="SCX Term">
            <Form.Label>SCX&nbsp;TERM:</Form.Label>
            <Form.Control type="text" name="SCX Term" value={formData['SCX Term']} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="SCX Name">
            <Form.Label>SCX&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="SCX Name" value={formData['SCX Name']} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="addedby">
            <Form.Label>ADDED&nbsp;BY:</Form.Label>
            <Form.Control type="text" name="addedby" value={formData.addedby} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="addedon">
            <Form.Label>ADDED&nbsp;ON:</Form.Label>
            <Form.Control type="text" name="addedon" value={formData.addedon} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="changedby">
            <Form.Label>CHANGED&nbsp;BY:</Form.Label>
            <Form.Control type="text" name="changedby" value={formData.changedby} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="changedon">
            <Form.Label>CHANGED&nbsp;ON:</Form.Label>
            <Form.Control type="text" name="changedon" value={formData.changedon} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} >
          {formData.id ? 'Save Changes' : 'Save Data'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDataFormRefDataIncotermLookup;
