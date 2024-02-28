import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/ScxVatAddition'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { fetchData } from "./Api"

const AddDataFormScxVatAddition = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "scx_id":"",
    "address_scx_id":"",
    "tax_taxtype":"",
    "tax_taxregistrationnumber":"",
    "tax_province":"",
    "tax_countrycode":"",
    "tax_taxauthority":"",
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
      const response = await fetch(`https://o971j813yd.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/vat-addition-to-existing-supplier/${editData.id}`, {
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
          <Form.Group controlId="scx_id">
            <Form.Label>SCX&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="scx_id" value={formData.scx_id || ''} onChange={handleChange} />
            {/* <Form.Control.Feedback type='invalid'>{formErrors.name}</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group controlId="address_scx_id">
            <Form.Label>ADDRESS&nbsp;SCX&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="address_scx_id" value={formData.address_scx_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tax_taxtype">
            <Form.Label>TAX&nbsp;TAX&nbsp;TYPE:</Form.Label>
            <Form.Control type="text" name="tax_taxtype" value={formData.tax_taxtype} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tax_taxregistrationnumber">
            <Form.Label>TAX&nbsp;TAX&nbsp;REGISTRATION&nbsp;NUMBER:</Form.Label>
            <Form.Control type="text" name="tax_taxregistrationnumber" value={formData.tax_taxregistrationnumber} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tax_province">
            <Form.Label>TAX&nbsp;PROVINCE:</Form.Label>
            <Form.Control type="text" name="tax_province" value={formData.tax_province} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tax_countrycode">
            <Form.Label>TAX&nbsp;COUNTRY&nbsp;CODE:</Form.Label>
            <Form.Control type="text" name="tax_countrycode" value={formData.tax_countrycode} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tax_taxauthority">
            <Form.Label>TAX&nbsp;TAX&nbsp;AUTHORITY:</Form.Label>
            <Form.Control type="text" name="tax_taxauthority" value={formData.tax_taxauthority} onChange={handleChange} />
          </Form.Group>
          {/* <Form.Group controlId="processing_status">
            <Form.Label>PROCESSING_STATUS:</Form.Label>
            <Form.Control type="text" name="processing_status" value={formData.processing_status} onChange={handleChange} />
          </Form.Group> */}
          {/* <Form.Group controlId="party_ext_id">
            <Form.Label>PARTY&nbsp;EXT&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="party_ext_id" value={formData.party_ext_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tax_ext_id">
            <Form.Label>TAX&nbsp;EXT&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="tax_ext_id" value={formData.tax_ext_id} onChange={handleChange} />
          </Form.Group> */}
          {/* <Form.Group controlId="vendor_site_id">
            <Form.Label>VENDOR&nbsp;SITE&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="vendor_site_id" value={formData.vendor_site_id} onChange={handleChange} />
          </Form.Group> */}
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

export default AddDataFormScxVatAddition;
