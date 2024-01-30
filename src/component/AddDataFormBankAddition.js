import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/CopySubsDQApproval'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { fetchData } from "./Api"

const AddDataFormBankAddition = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "data_source":"",
    "subscription_id":"",
    "scid":"",
    "address_scid":"",
    "bank_account_num":"",
    "currency_code":"",
    "routing_num":"",
    "swift_code":"",
    "country":"",
    "iban":"",
    "missing_values":"",
    "processing_status":"",
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
      const response = await fetch(`https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dsp-copysubsbankaddition/${editData.id}`, {
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
            <Form.Label>DATA_SOURCE:</Form.Label>
            <Form.Control type="text" name="data_source" value={formData.data_source || ''} onChange={handleChange} />
            {/* <Form.Control.Feedback type='invalid'>{formErrors.name}</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group controlId="subscription_id">
            <Form.Label>SUBSCRIPTION_ID:</Form.Label>
            <Form.Control type="number" name="subscription_id" value={formData.subscription_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="scid">
            <Form.Label>SCID:</Form.Label>
            <Form.Control type="text" name="scid" value={formData.scid} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="address_scid">
            <Form.Label>SCX ID:</Form.Label>
            <Form.Control type="text" name="address_scid" value={formData.address_scid} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_account_num">
            <Form.Label>BANK&nbsp;ACCOUNT&nbsp;NO:</Form.Label>
            <Form.Control type="text" name="bank_account_num" value={formData.bank_account_num} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="currency_code">
            <Form.Label>CURRENCY&nbsp;CODE:</Form.Label>
            <Form.Control type="text" name="currency_code" value={formData.currency_code} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="routing_num">
            <Form.Label>ROUTING&nbsp;NUM:</Form.Label>
            <Form.Control type="text" name="routing_num" value={formData.routing_num} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="swift_code">
            <Form.Label>SWIFT&nbsp;CODE:</Form.Label>
            <Form.Control type="text" name="swift_code" value={formData.swift_code} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>IBAN:</Form.Label>
            <Form.Control type="text" name="country" value={formData.country} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="iban">
            <Form.Label>COUNTRY:</Form.Label>
            <Form.Control type="text" name="iban" value={formData.iban} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="missing_values">
            <Form.Label>MISSING&nbsp;VALUES:</Form.Label>
            <Form.Control type="text" name="missing_values" value={formData.missing_values} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="processing_status">
            <Form.Label>PROCESSING_STATUS:</Form.Label>
            <Form.Control type="text" name="processing_status" value={formData.processing_status} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="updated_by">
            <Form.Label>AUTHOR:</Form.Label>
            <Form.Control type="text" name="updated_by" value={formData.updated_by} onChange={handleChange} />
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

export default AddDataFormBankAddition;
