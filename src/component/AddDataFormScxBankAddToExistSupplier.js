import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/ScxBankAddToExistSupplier'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { fetchData } from "./Api"

const AddDataFormScxBankAddToExistSupplier = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "scx_id":"",
    "bank_account_name":"",
    "bank_account_number":"",
    "iban":"",
    "bank_currency_code":"",
    "bank_country_code":"",
    "bank_routing_number":"",
    "bank_swift_code":"",
    "bank_name":"",
    "bank_address_line_1":"",
    "bank_address_line_2":"",
    "bank_cityname":"",
    "bank_statecode":"",
    "bank_postalcode":"",
    "processing_status":"",
    "party_ext_id":"",
    "bank_ext_id":"",
    "vendor_site_id":"",
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
      const response = await fetch(`https://ll2hrg36vb.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/bank-addition-to-existing-supplier/${editData.id}`, {
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
            <Form.Control type="text" name="scx_id" value={formData.scx_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_account_name">
            <Form.Label>BANK&nbsp;ACCOUNT&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="bank_account_name" value={formData.bank_account_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_account_number">
            <Form.Label>BANK&nbsp;ACCOUNT&nbsp;NUMBER:</Form.Label>
            <Form.Control type="text" name="bank_account_number" value={formData.bank_account_number} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="iban">
            <Form.Label>IBAN:</Form.Label>
            <Form.Control type="text" name="iban" value={formData.iban} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_currency_code">
            <Form.Label>BANK&nbsp;CURRENCY&nbsp;CODE:</Form.Label>
            <Form.Control type="text" name="bank_currency_code" value={formData.bank_currency_code} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_country_code">
            <Form.Label>BANK&nbsp;COUNTRY&nbsp;CODE:</Form.Label>
            <Form.Control type="text" name="bank_country_code" value={formData.bank_country_code} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_routing_number">
            <Form.Label>BANK&nbsp;ROUTING&nbsp;NUMBER:</Form.Label>
            <Form.Control type="text" name="bank_routing_number" value={formData.bank_routing_number} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_swift_code">
            <Form.Label>BANK&nbsp;SWIFT&nbsp;CODE:</Form.Label>
            <Form.Control type="text" name="bank_swift_code" value={formData.bank_swift_code} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_name">
            <Form.Label>BANK&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="bank_name" value={formData.bank_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_branch_name">
            <Form.Label>BANK&nbsp;BRANCH&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="bank_branch_name" value={formData.bank_branch_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_address_line_1">
            <Form.Label>BANK&nbsp;ADDRESS&nbsp;LINE&nbsp;1:</Form.Label>
            <Form.Control type="text" name="bank_address_line_1" value={formData.bank_address_line_1} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_address_line_2">
            <Form.Label>BANK&nbsp;ADDRESS&nbsp;LINE&nbsp;2:</Form.Label>
            <Form.Control type="text" name="bank_address_line_2" value={formData.bank_address_line_2} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_cityname">
            <Form.Label>BANK&nbsp;CITYNAME:</Form.Label>
            <Form.Control type="text" name="bank_cityname" value={formData.bank_cityname} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_statecode">
            <Form.Label>BANK&nbsp;STATECODE:</Form.Label>
            <Form.Control type="text" name="bank_statecode" value={formData.bank_statecode} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_postalcode">
            <Form.Label>BANK&nbsp;POSTALCODE:</Form.Label>
            <Form.Control type="text" name="bank_postalcode" value={formData.bank_postalcode} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="processing_status">
            <Form.Label>PROCESSING&nbsp;STATUS:</Form.Label>
            <Form.Control type="text" name="processing_status" value={formData.processing_status} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="party_ext_id">
            <Form.Label>PARTY&nbsp;EXT&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="party_ext_id" value={formData.party_ext_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="bank_ext_id">
            <Form.Label>BANK&nbsp;EXT&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="bank_ext_id" value={formData.bank_ext_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="vendor_site_id">
            <Form.Label>VENDOR&nbsp;SITE&nbsp;ID:</Form.Label>
            <Form.Control type="text" name="vendor_site_id" value={formData.vendor_site_id} onChange={handleChange} />
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

export default AddDataFormScxBankAddToExistSupplier;
