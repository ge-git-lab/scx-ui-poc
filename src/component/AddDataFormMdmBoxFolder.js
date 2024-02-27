import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/MdmBoxFolder'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData, saveData } from "./Api"

const AddDataFormMdmBoxFolder = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [formData, setFormData] = useState(editData || {
    "mdmboxid": "",
    "category": "",
    "sub_category": "",
    "folder_name": "",
    "comments": "",
  }); //initialize formData with editData if provided

  useEffect(() => {
    // If we are editing existing data, populate the form with that data
    if (editData) {
      setFormData(editData);
    }
    async function fetchOptions() {
      const response = await fetchData('https://2kn86v8khc.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/mdm-box-folder/category');
      setOptions(response);
      setSelectedOption(response[0]?.id); // Default to first option
    }
    fetchOptions();
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
      const response = await fetch(`https://2kn86v8khc.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/mdm-box-folder/${editData.id}`, {
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
          <Form.Group controlId="mdmboxid">
            <Form.Label>MDM&nbsp;BOX&nbsp;ID:</Form.Label>
            <Form.Control type="number" name="mdmboxid" value={formData.mdmboxid} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>CATEGORY:</Form.Label>
            <Form.Control as="select" value={selectedOption} onChange={e => setSelectedOption(e.target.value)}>
              {options.map((option) => (
                <option key={option.id} value={option.id}>{option.category}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="sub_category">
            <Form.Label>SUB&nbsp;CATEGORY:</Form.Label>
            <Form.Control type="text" name="sub_category" value={formData.sub_category} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="folder_name">
            <Form.Label>FOLDER&nbsp;NAME:</Form.Label>
            <Form.Control type="text" name="folder_name" value={formData.folder_name} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="comments">
            <Form.Label>COMMENTS:</Form.Label>
            <Form.Control type="text" name="comments" value={formData.comments} onChange={handleChange} />
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

export default AddDataFormMdmBoxFolder;
