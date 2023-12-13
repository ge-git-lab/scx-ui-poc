import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/CopySubsDQApproval'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from "./Api"

const AddDataForm = ({ show, handleSaveData, handleClose, editData }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    data_source: '',
    subscription_id: '',
    dq_report_name: '',
    approved_rejected: '',
    comment: '',
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

    if (isEmpty) {
      toast.info('Please fill all the fields', { position: toast.POSITION.TOP_CENTER })
    } else {
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
    }
  };

  const handleEditData = async (data) => {
    try {
      // Make the PUT request to update existing data
      const response = await fetch(`https://k8i5vp9r2c.execute-api.us-east-1.amazonaws.com/dsp-scx/dspupdatedata/${editData.id}`, {
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
            <Form.Label>DATA_SOURCE:</Form.Label>
            <Form.Control type="text" name="data_source" value={formData.data_source || ''} onChange={handleChange} />
            {/* <Form.Control.Feedback type='invalid'>{formErrors.name}</Form.Control.Feedback> */}
          </Form.Group>
          <Form.Group controlId="subscription_id">
            <Form.Label>SUBSCRIPTION_ID:</Form.Label>
            <Form.Control type="number" name="subscription_id" value={formData.subscription_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="dq_report_name">
            <Form.Label>DQ_REPORT_NAME:</Form.Label>
            <Form.Control type="text" name="dq_report_name" value={formData.dq_report_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="approved_rejected">
            <Form.Label>APPROVAL_STATUS:</Form.Label>
            <Form.Control type="text" name="approved_rejected" value={formData.approved_rejected} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="comment">
            <Form.Label>COMMENT:</Form.Label>
            <Form.Control type="text" name="comment" value={formData.comment} onChange={handleChange} />
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

export default AddDataForm;
