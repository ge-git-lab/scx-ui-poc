import React, { useState, useEffect, useRef } from 'react';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddDataFormBucAddition from '../component/AddDataFormBucAddition';
import { Modal, Button, Table } from 'react-bootstrap';
import Header from '../component/Header';
import { toast } from 'react-toastify';
import { faPen, faTrashAlt, faUpload, faDownload, faPlus, faTrash, faSync, faDatabase } from '@fortawesome/free-solid-svg-icons';
import '../styles/CopySubsProject.css';
import { fetchData, saveData, deleteData, deleteAllData, importData, exportData, callProcedure } from "../component/Api"
import DeleteConfirmation from '../component/DeleteConfirmation';

const CopySubsBucAddition = () => {
  const [CopySubsBucAdditionData, setCopySubsBucAdditionData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const fileInputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemNameToDelete, setItemNameToDelete] = useState('');
  
  //to fetch the data from backend 
  const fetchDataAndSetState = async () => {
      try {
        const result = await fetchData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dsp-copysubsbucaddition');
        setCopySubsBucAdditionData(result);
      } catch (error) {
        console.log('Error fetching the data');
      }
  }

  useEffect(() => {
    fetchDataAndSetState();
  }, []);

  const handleAddData = async () => {
    setShowAddForm(true);
    setEditData(null);
  };

  const handleEditData = (data) => {
    setEditData(data);
    setShowAddForm(true);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  //function to save a data
  const handleSaveData = async (data) => {
    try {
      await saveData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dsp-copysubsbucaddition', data);
      fetchDataAndSetState();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  //to delete a single item
  const handleDeleteData = async (idToDelete) => {
    try {
      const result = await deleteData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dsp-copysubsbucaddition', idToDelete)
      console.log(result)
      if (result.status === 200) {
        toast.success('Deleted all data successfully!', {
          position: toast.POSITION.TOP_CENTER
        });
        fetchDataAndSetState();
      } else {
        console.error('Error deleting all data:', result.statusText);
      }
    } catch (error) {
      console.error('Error deleting data:', error.message);
    }
  }

  const importDataInCSV = async () => {
    const backendData = await handleImport();
    const actualData = JSON.parse(backendData);
    const headers = Object.keys(actualData[0]);
    const csvData = [headers, ...actualData.map(obj => Object.values(obj))];
    //created a temp csv link to trigger the download
    const csvLink = document.createElement('a');
    csvLink.href = encodeURI(`data:text/csv;charset=utf-8, ${csvData.join('\n').replace(/,/g, ',')}`);
    csvLink.target = '_blank';
    csvLink.download = 'copy_subs_buc_addition.csv';
    csvLink.click();
    fetchDataAndSetState();
    toast.success('Data imported successfully!', {
      position: toast.POSITION.TOP_CENTER
    });
  };
  // to hadle the import data from db
  const handleImport = async () => {
    try {
      const response = await exportData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dsp-copysubsbucaddition/importexport');
      const csvData = response;
      return csvData;
      //Process the csv data as needed 
      console.log(csvData);
    } catch (error) {
      console.error('Error importing data:', error);
    }
  }

  //to hadle the export data from db
  const handleExport = async () => {
    try {
      const fileInput = fileInputRef.current;
      if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const fileReader = new FileReader();

        fileReader.onload = () => {
          const csvData = fileReader.result;
          console.log(csvData)
          importData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dsp-copysubsbucaddition/importexport', csvData);
        }
        fileReader.readAsText(file);
        setShow(false);
        // fetchDataAndSetState();
      } else {
        console.error('No file selected');
      }
      toast.success('Data inserted successfully!', { position: toast.POSITION.TOP_CENTER });
      fetchDataAndSetState();
    } catch (err) {
      console.error('Error exporting data:', err);
    }
  }

  // to delete all the data 
  const handleDeleteAll = async () => {
    try {
      const response = await deleteAllData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dsp-copysubsbucaddition/importexport', {});

      if (response.status === 200) {
        toast.success('Deleted all data successfully!', {
          position: toast.POSITION.TOP_CENTER
        });
        fetchDataAndSetState();
      } else {
        console.error('Error deleting all data:', response.statusText);
      }
      setShowDeleteConfirmation(false);

    } catch (error) {
      console.error('Error deleting all data:', error.message);
    }
  };

  const handleUpdateProcedure = async () => {
    try {
      const result = await callProcedure('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dsp-copysubsbucaddition/updateProcedure');
      fetchDataAndSetState();
      console.log(result)
      toast.success('Updated procedure successfully !', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  const handleValidateProcedure = async () => {
    try {
      const result = await callProcedure('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dsp-copysubsbucaddition/validateProcedure');
      fetchDataAndSetState();
      console.log(result)
      toast.success('Staged procedure successfully !', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <div className="col-12 d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header title="Copy Subs Buc Addition" />
      <div className='button-section  mt-5 d-flex justify-content-end'>
        <button type='button' title='Add Data' className='btn-custom btn btn-custom-add me-1' onClick={handleAddData}>
          <FontAwesomeIcon icon={faPlus} className='icon-custom edit-icon' />
        </button>
        <button type='button' title='Update Procedure' className='btn-custom btn btn-custom-upload me-1' onClick={handleUpdateProcedure}>
          <FontAwesomeIcon icon={faSync} className='icon-custom edit-icon' />
        </button>
        <button type='button' title='Validate Procedure' className='btn-custom btn btn-custom-upload me-1' onClick={handleValidateProcedure}>
          <FontAwesomeIcon icon={faDatabase} className='icon-custom edit-icon' />
        </button>
        <button type='button' title='Import Data' className='btn-custom btn btn-custom-upload me-1' onClick={handleShow}>
          <FontAwesomeIcon icon={faUpload} className='icon-custom edit-icon' />
        </button>
        {/* Modal to attach the file for importing data */}
        <Modal
          show={show}
          onHide={handleClose}
          contentLabel="File Attachment Modal">
          <Modal.Header closeButton>
            <Modal.Title>Attach File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type='file' ref={fileInputRef} accept=".csv, .xlsx" />
            <Button variant="primary" onClick={handleExport} className='me-1'>Import</Button>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Body>
        </Modal>
        <button type='button' title='Export Data' className=' btn-custom btn btn-custom-download me-1' onClick={importDataInCSV}>
          <FontAwesomeIcon icon={faDownload} className='icon-custom edit-icon' />
        </button>
        <button type='button' title='Delete All' className='btn-custom btn btn-custom-delete' onClick={() => { setItemNameToDelete('All items'); setShowDeleteConfirmation(true) }}>
          <FontAwesomeIcon icon={faTrash} className='icon-custom edit-icon' />
        </button>
        <DeleteConfirmation
          show={showDeleteConfirmation}
          onHide={() => setShowDeleteConfirmation(false)}
          onDelete={handleDeleteAll}
          itemName={itemNameToDelete}
        />
      </div>
      <div className='scrollable-content flex-grow-1 overflow-auto'>
        <div className='table-content mt-3'>
          <table className="table table-striped dsp-custom-table">
            <thead>
              <tr>
                <th scope="col">DATA&nbsp;SOURCE</th>
                <th scope="col">SUBSCRIPTION&nbsp;ID</th>
                <th scope="col">SCID</th>
                <th scope="col">SCX&nbsp;ID</th>
                <th scope="col">BUC</th>
                <th scope="col">PROCESSING&nbsp;STATUS</th>
                <th scope="col">AUTHOR</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {CopySubsBucAdditionData.map((item) => (
                <tr className='dsp-ellipsis' key={item.subscription_id}>
                  <td title={item.data_source}>{item.data_source}</td>
                  <td title={item.subscription_id}>{item.subscription_id}</td>
                  <td title={item.scid}>{item.scid}</td>
                  <td title={item.address_scid}>{item.address_scid}</td>
                  <td title={item.buc}>{item.buc}</td>
                  <td title={item.processing_status}>{item.processing_status}</td>
                  <td title={item.updated_by}>{item.updated_by}</td>
                  <td>
                    <button type='button' className='btn-warning remove-border-icon me-3' onClick={() => handleEditData(item)}>
                      <FontAwesomeIcon icon={faPen} className='edit-icon' />
                    </button>
                    <button type='button' className='btn-danger remove-border-icon' onClick={() => handleDeleteData(item.id)}>
                      <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AddDataFormBucAddition
            show={showAddForm}
            editData={editData}
            handleSaveData={handleSaveData}
            handleClose={() => {
              setShowAddForm(false);
              setEditData(null);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CopySubsBucAddition;