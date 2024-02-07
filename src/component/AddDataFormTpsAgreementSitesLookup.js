import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/TpsAgreementSitesLookup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from "./Api"

const AddDataFormTpsAgreementSitesLookup = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "data_source": "",
    "org_id": "",
    "gsl6": "",
    "gsl": "",
    "tps_agreement": "",
    "discount_funding_model": ""
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
      const response = await fetch(`https://oiv6now4mf.execute-api.us-east-1.amazonaws.com/dsp-scx-tps/dsptpssitesagreementlookup/${editData.id}`, {
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
          <Form.Group controlId="data_source">
            <Form.Label>ORG&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="org_id" value={formData.org_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="gsl6">
            <Form.Label>GSL6:</Form.Label>
            <Form.Control type="text" name="gsl6" value={formData.gsl6} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="gsl">
            <Form.Label>GSL:</Form.Label>
            <Form.Control type="text" name="gsl" value={formData.gsl} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tps_agreement">
            <Form.Label>TPS&nbsp;AGREEMENT:</Form.Label>
            <Form.Control type="text" name="tps_agreement" value={formData.tps_agreement} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tps_agreement">
            <Form.Label>DISCOUNT&nbsp;FUNDING&nbsp;MODEL:</Form.Label>
            <Form.Control type="text" name="discount_funding_model" value={formData.discount_funding_model} onChange={handleChange} />
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

export default AddDataFormTpsAgreementSitesLookup;
