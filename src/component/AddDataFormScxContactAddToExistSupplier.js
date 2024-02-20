import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/ScxBankAddToExistSupplier'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { fetchData } from "./Api"

const AddDataFormScxContactAddToExistSupplier = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "data_source":"",
    "scx_id":"",
    "contact_types":"",
    "contact_email":"",
    "contact_first_name":"",
    "contact_last_name":"",
    "party_ext_id":"",
    "contact_ext_id":"",
    "vendor_site_id":"",
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
      const response = await fetch(`https://7lnvs6qdt0.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/contact-addition-to-existing-supplier/${editData.id}`, {
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
          <Form.Group controlId="scx_id">
            <Form.Label>SCX&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="scx_id" value={formData.scx_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="contact_types">
            <Form.Label>CONTACT&nbsp;TYPES:</Form.Label>
            <Form.Control type="text" name="contact_types" value={formData.contact_types} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="contact_email">
            <Form.Label>CONTACT_EMAIL:</Form.Label>
            <Form.Control type="text" name="contact_email" value={formData.contact_email} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="contact_first_name">
            <Form.Label>CONTACT&nbsp;FIRST&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="contact_first_name" value={formData.contact_first_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="contact_last_name">
            <Form.Label>CONTACT&nbsp;LAST&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="contact_last_name" value={formData.contact_last_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="party_ext_id">
            <Form.Label>PARTY&nbsp;EXT&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="party_ext_id" value={formData.party_ext_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="contact_ext_id">
            <Form.Label>CONTACT&nbsp;EXT&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="contact_ext_id" value={formData.contact_ext_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="vendor_site_id">
            <Form.Label>VENDOR&nbsp;SITE&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="vendor_site_id" value={formData.vendor_site_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="processing_status">
            <Form.Label>PROCESSING_STATUS:</Form.Label>
            <Form.Control type="text" name="processing_status" value={formData.processing_status} onChange={handleChange} />
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

export default AddDataFormScxContactAddToExistSupplier;
