import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/RefDataTaxClassificationLookup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from "./Api"

const AddDataFormRefDataTaxClassificationLookup = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "zsource": "",
    "ERP Tax Classification": "",
    "US/Non_US": "",
    "SCX Tax Classification": "",
    "format": "",
    "required": "",
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
      const response = await fetch(`https://gndq3k7kvb.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/dsp-refdata-taxclassification-lookup/${editData.id}`, {
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
          <Form.Group controlId="ERP Tax Classification">
            <Form.Label>ERP&nbsp;TAX&nbsp;CLASSIFICATION:</Form.Label>
            <Form.Control type="text" name="ERP Tax Classification" value={formData['ERP Tax Classification']} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="US/Non_US">
            <Form.Label>US/Non_US:</Form.Label>
            <Form.Control type="text" name="US/Non_US" value={formData['US/Non_US']} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="SCX Tax Classification">
            <Form.Label>SCX&nbsp;TAX&nbsp;CLASSIFICATION:</Form.Label>
            <Form.Control type="text" name="SCX Tax Classification" value={formData['SCX Tax Classification']} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="format">
            <Form.Label>FORMAT:</Form.Label>
            <Form.Control type="text" name="format" value={formData['format']} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="required">
            <Form.Label>REQUIRED:</Form.Label>
            <Form.Control type="text" name="required" value={formData['required']} onChange={handleChange} />
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

export default AddDataFormRefDataTaxClassificationLookup;
