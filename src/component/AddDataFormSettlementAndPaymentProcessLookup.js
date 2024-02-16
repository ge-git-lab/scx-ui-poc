import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/SettlementAndPaymentProcessLookup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from "./Api"

const AddDataFormSettlementAndPaymentProcessLookup = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "data_source": "",
    "org_id": "",
    "key": "",
    "mapped": "",
    "purchasing_source_system": "",
    "invoice_source_system": "",
    "process": "",
    "pay_on_code": "",
    "scx_settlement_process": "",
    "scx_custom_payment_process": "",
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
      const response = await fetch(`https://uxugef40x8.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/dsp-settlement-payprocess-lookup/${editData.id}`, {
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
          <Form.Group controlId="data_source">
            <Form.Label>DATA&nbsp;SOURCE:</Form.Label>
            <Form.Control type="text" name="data_source" value={formData.data_source || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="org_id">
            <Form.Label>ORG&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="org_id" value={formData.org_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="key">
            <Form.Label>KEY:</Form.Label>
            <Form.Control type="text" name="key" value={formData.key} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="mapped">
            <Form.Label>MAPPED:</Form.Label>
            <Form.Control type="text" name="mapped" value={formData.mapped} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="purchasing_source_system">
            <Form.Label>PURCHASING&nbsp;SOURCE&nbsp;SYSTEM:</Form.Label>
            <Form.Control type="text" name="purchasing_source_system" value={formData.purchasing_source_system} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="invoice_source_system">
            <Form.Label>INVOICE&nbsp;SOURCE&nbsp;SYSTEM:</Form.Label>
            <Form.Control type="text" name="invoice_source_system" value={formData.invoice_source_system} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="process">
            <Form.Label>PROCESS:</Form.Label>
            <Form.Control type="text" name="process" value={formData.process} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="pay_on_code">
            <Form.Label>PAY&nbsp;ON&nbsp;CODE:</Form.Label>
            <Form.Control type="text" name="pay_on_code" value={formData.pay_on_code} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="scx_settlement_process">
            <Form.Label>SCX&nbsp;SETTLEMENT&nbsp;PROCESS:</Form.Label>
            <Form.Control type="text" name="scx_settlement_process" value={formData.scx_settlement_process} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="scx_custom_payment_process">
            <Form.Label>SCX&nbsp;CUSTOM&nbsp;PAYMENT&nbsp;PROCESS:</Form.Label>
            <Form.Control type="text" name="scx_custom_payment_process" value={formData.scx_custom_payment_process} onChange={handleChange} />
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
            <Form.Label>CHANGED&nbsp;BY:</Form.Label>
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

export default AddDataFormSettlementAndPaymentProcessLookup;
