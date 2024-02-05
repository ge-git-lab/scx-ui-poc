import React, { useState, useEffect, useRef } from 'react';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddDataFormTax from '../component/AddDataFormRefDataIncotermLookup';
import { Modal, Button } from 'react-bootstrap';
import Header from '../component/Header';
import { toast } from 'react-toastify';
import { faPen, faTrashAlt, faUpload, faDownload, faPlus, faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import '../styles/CopySubsProject.css';
import { fetchData, saveData, deleteData, deleteAllData, importData, exportData, callProcedure } from "../component/Api"
import DeleteConfirmation from '../component/DeleteConfirmation';
import AddDataFormRefDataIncotermLookup from '../component/AddDataFormRefDataIncotermLookup';

const RefDataIncotermsLookup = () => {
  const [RefDataIncotermLookupData, setRefDataIncotermLookupData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const fileInputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemNameToDelete, setItemNameToDelete] = useState('');

  //to fetch the data from backend 
  const fetchDataAndSetState = async () => {
    try {
      const result = await fetchData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dspcopysubstax');
      setRefDataIncotermLookupData(result);
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
      await saveData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dspcopysubstax', data);
      fetchDataAndSetState();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  //to delete a single item
  const handleDeleteData = async (idToDelete) => {
    try {
      const result = await deleteData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dspcopysubstax', idToDelete)
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
    csvLink.download = 'copy_subs_tax.csv';
    csvLink.click();
    fetchDataAndSetState();
    toast.success('Data imported successfully!', {
      position: toast.POSITION.TOP_CENTER
    });
  };
  // to hadle the import data from db
  const handleImport = async () => {
    try {
      const response = await exportData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dspcopysubstax/importexport');
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
          importData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dspcopysubstax/importexport', csvData);
        }
        fileReader.readAsText(file);
        setShow(false);
        fetchDataAndSetState();
      } else {
        console.error('No file selected');
      }
      toast.success('Data inserted successfully!', { position: toast.POSITION.TOP_CENTER });

    } catch (err) {
      console.error('Error exporting data:', err);
    }
  }

  // to delete all the data 
  const handleDeleteAll = async () => {
    try {
      const response = await deleteAllData('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dspcopysubstax/importexport', {
        method: 'DELETE',
        'Content-Type': 'application/json'
      });

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

  const handleProcedure = async () => {
    try {
      const result = await callProcedure('https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dspcopysubstax/call-procedure');
      fetchDataAndSetState();
      console.log(result)
      toast.success('Procedure called successfully !', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  return (
    <div className="col-12 d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header title="Reference Data: IncoTerms Lookup" />
      <div className='button-section  mt-5 d-flex justify-content-end'>
        <button type='button' title='Add Data' className='btn-custom btn btn-custom-add me-1' onClick={handleAddData}>
          <FontAwesomeIcon icon={faPlus} className='icon-custom edit-icon' />
        </button>
        <button type='button' title='Update Data' className='btn-custom btn btn-custom-upload me-1' onClick={handleProcedure}>
          <FontAwesomeIcon icon={faSync} className='icon-custom edit-icon' />
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
                <th scope="col">ERP&nbsp;TERM</th>
                <th scope="col">ERP&nbsp;NAME</th>
                <th scope="col">SCX&nbsp;TERM</th>
                <th scope="col">SCX&nbsp;NAME</th>
                <th scope="col">ADDED&nbsp;BY</th>
                <th scope="col">ADDED&nbsp;ON</th>
                <th scope="col">CHANGED&nbsp;BY</th>
                <th scope="col">CHANGED&nbsp;ON</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {RefDataIncotermLookupData.map((item) => (
                <tr className='dsp-ellipsis' key={item.subscription_id}>
                  <td title={item.zsource}>{item.zsource}</td>
                  <td title={item['Erp Term']}>{item['Erp Term']}</td>
                  <td title={item['Erp Name']}>{item['Erp Name']}</td>
                  <td title={item['SCX Term']}>{item['SCX Term']}</td>
                  <td title={item['SCX Name']}>{item['SCX Name']}</td>
                  <td title={item.addedby}>{item.addedby}</td>
                  <td title={item.addedon}>{item.addedon}</td>
                  <td title={item.changedby}>{item.changedby}</td>
                  <td title={item.changedon}>{item.changedon}</td>
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
          <AddDataFormRefDataIncotermLookup
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

export default RefDataIncotermsLookup;