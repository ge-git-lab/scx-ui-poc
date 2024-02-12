import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/RefDataPaymentTermLookup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from "./Api"

const AddDataFormRefDataPaymentTermLookup = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "zsource": "",
    "erp_name": "",
    "erp_description": "",
    "scx_name": "",
    "scx_description": "",
    "type": "",
    "discount1_percent": "",
    "discount1days": "",
    "discount2_percent": "",
    "discount2days": "",
    "discount3_percent": "",
    "discount3days": "",
    "net_due_days": "",
    "settlement_frequency": "",
    "due_day_of_month": "",
    "due_months_forward": "",
    "is_approved": "",
    "added": "",
    "addedby": "",
    "addedon": "",
    "changedby": "",
    "changedon": ""
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
          <Form.Group controlId="erp_name">
            <Form.Label>ERP&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="erp_name" value={formData.erp_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="erp_description">
            <Form.Label>ERP&nbsp;DESCRIPTION:</Form.Label>
            <Form.Control type="text" name="erp_description" value={formData.erp_description} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="scx_name">
            <Form.Label>SCX&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="scx_name" value={formData.scx_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="scx_description">
            <Form.Label>SCX&nbsp;DESCRIPTION:</Form.Label>
            <Form.Control type="text" name="scx_description" value={formData.scx_description} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>TYPE:</Form.Label>
            <Form.Control type="text" name="type" value={formData.type} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="discount1_percent">
            <Form.Label>DISCOUNT&nbsp;1&nbsp;PERCENT:</Form.Label>
            <Form.Control type="text" name="discount1_percent" value={formData.discount1_percent} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="discount1days">
            <Form.Label>DISCOUNT&nbsp;1&nbsp;DAYS:</Form.Label>
            <Form.Control type="text" name="discount1days" value={formData.discount1days} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="discount2_percent">
            <Form.Label>DISCOUNT&nbsp;2&nbsp;PERCENT:</Form.Label>
            <Form.Control type="text" name="discount2_percent" value={formData.discount2_percent} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="discount2days">
            <Form.Label>DISCOUNT&nbsp;2&nbsp;DAYS:</Form.Label>
            <Form.Control type="text" name="discount2days" value={formData.discount2days} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="discount3_percent">
            <Form.Label>DISCOUNT&nbsp;3&nbsp;PERCENT:</Form.Label>
            <Form.Control type="text" name="discount3_percent" value={formData.discount3_percent} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="discount3days">
            <Form.Label>DISCOUNT&nbsp;3&nbsp;DAYS:</Form.Label>
            <Form.Control type="text" name="discount3days" value={formData.discount3days} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="net_due_days">
            <Form.Label>NET&nbsp;DUE&nbsp;DAYS:</Form.Label>
            <Form.Control type="text" name="net_due_days" value={formData.net_due_days} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="settlement_frequency">
            <Form.Label>SETTLEMENT&nbsp;FREQUENCY:</Form.Label>
            <Form.Control type="text" name="settlement_frequency" value={formData.settlement_frequency} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="due_day_of_month">
            <Form.Label>DUE&nbsp;DAY&nbsp;OF&nbsp;MONTH:</Form.Label>
            <Form.Control type="text" name="due_day_of_month" value={formData.due_day_of_month} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="due_months_forward">
            <Form.Label>DUE&nbsp;MONTHS&nbsp;FORWARD:</Form.Label>
            <Form.Control type="text" name="due_months_forward" value={formData.due_months_forward} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="is_approved">
            <Form.Label>IS&nbsp;APPROVED:</Form.Label>
            <Form.Control type="text" name="is_approved" value={formData.is_approved} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="added">
            <Form.Label>ADDED:</Form.Label>
            <Form.Control type="text" name="added" value={formData.added} onChange={handleChange} />
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

export default AddDataFormRefDataPaymentTermLookup;
