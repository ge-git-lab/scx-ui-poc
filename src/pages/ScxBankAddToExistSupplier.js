import React, { useState, useEffect, useRef } from 'react';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddDataFormScxBankAddToExistSupplier from '../component/AddDataFormScxBankAddToExistSupplier';
import { Modal, Button, Table } from 'react-bootstrap';
import Header from '../component/Header';
import { toast } from 'react-toastify';
import { faPen, faTrashAlt, faUpload, faDownload, faPlus, faTrash, faSync, faDatabase } from '@fortawesome/free-solid-svg-icons';
import '../styles/CopySubsProject.css';
import { fetchData, saveData, deleteData, deleteAllData, importData, exportData, callProcedure } from "../component/Api"
import DeleteConfirmation from '../component/DeleteConfirmation';

const ScxBankAddToExistSupplier = () => {
  const [ScxBankAddToExistSupplierData, setScxBankAddToExistSupplierData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const fileInputRef = useRef(null);
  const [show, setShow] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemNameToDelete, setItemNameToDelete] = useState('');
  
  //to fetch the data from backend 
  const fetchDataAndSetState = async () => {
      try {
        const result = await fetchData('https://ll2hrg36vb.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/bank-addition-to-existing-supplier');
        setScxBankAddToExistSupplierData(result);
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
      await saveData('https://ll2hrg36vb.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/bank-addition-to-existing-supplier', data);
      fetchDataAndSetState();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  //to delete a single item
  const handleDeleteData = async (idToDelete) => {
    try {
      const result = await deleteData('https://ll2hrg36vb.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/bank-addition-to-existing-supplier', idToDelete)
      console.log(result)
      if (result.status === 200) {
        toast.success('Deleted the data successfully!', {
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
    csvLink.download = 'scx_bank_addtion_to_existing_supplier.csv';
    csvLink.click();
    fetchDataAndSetState();
    toast.success('Data imported successfully!', {
      position: toast.POSITION.TOP_CENTER
    });
  };
  // to hadle the import data from db
  const handleImport = async () => {
    try {
      const response = await exportData('https://ll2hrg36vb.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/bank-addition-to-existing-supplier/importexport');
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
          importData('https://ll2hrg36vb.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/bank-addition-to-existing-supplier/importexport', csvData);
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
      const response = await deleteAllData('https://ll2hrg36vb.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/bank-addition-to-existing-supplier/importexport', {});

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
      const result = await callProcedure('https://ll2hrg36vb.execute-api.us-east-1.amazonaws.com/dsp-scx-ref/bank-addition-to-existing-supplier/process-records');
      fetchDataAndSetState();
      toast.success('Updated procedure successfully !', { position: toast.POSITION.TOP_CENTER });
    } catch (error) {
      console.error('Error saving data:', error);
    }
    toast.success('Updated procedure successfully !', { position: toast.POSITION.TOP_CENTER });
    fetchDataAndSetState();
  }

  return (
    <div className="col-12 d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header title="SCX Bank Addition To Existing Suppliers" />
      <div className='button-section  mt-5 d-flex justify-content-end'>
        <button type='button' title='Add Data' className='btn-custom btn btn-custom-add me-1' onClick={handleAddData}>
          <FontAwesomeIcon icon={faPlus} className='icon-custom edit-icon' />
        </button>
        <button type='button' title='Process Records' className='btn-custom btn btn-custom-upload me-1' onClick={handleUpdateProcedure}>
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
                <th scope="col">SCX&nbsp;ID</th>
                <th scope="col">BANK&nbsp;ACCOUNT&nbsp;NAME</th>
                <th scope="col">BANK&nbsp;ACCOUNT&nbsp;NUMBER</th>
                <th scope="col">IBAN</th>
                <th scope="col">BANK&nbsp;CURRENCY&nbsp;CODE</th>
                <th scope="col">BANK&nbsp;COUNTRY&nbsp;CODE</th>
                <th scope="col">BANK&nbsp;ROUTING&nbsp;NUMBER</th>
                <th scope="col">BANK&nbsp;SWIFT&nbsp;CODE</th>
                <th scope="col">BANK&nbsp;NAME</th>
                <th scope="col">BANK&nbsp;BRANCH&nbsp;NAME</th>
                <th scope="col">BANK&nbsp;ADDRESS&nbsp;LINE&nbsp;1</th>
                <th scope="col">BANK&nbsp;ADDRESS&nbsp;LINE&nbsp;2</th>
                <th scope="col">BANK&nbsp;CITYNAME</th>
                <th scope="col">BANK&nbsp;STATECODE</th>
                <th scope="col">BANK&nbsp;POSTALCODE</th>
                <th scope="col">PROCESSING&nbsp;STATUS</th>
                <th scope="col">PARTY&nbsp;EXT&nbsp;ID</th>
                <th scope="col">BANK&nbsp;EXT&nbsp;ID</th>
                <th scope="col">VENDOR&nbsp;SITE&nbsp;ID</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {ScxBankAddToExistSupplierData.map((item) => (
                <tr className='dsp-ellipsis' key={item.id}>
                  <td title={item.scx_id}>{item.scx_id}</td>
                  <td title={item.bank_account_name}>{item.bank_account_name}</td>
                  <td title={item.bank_account_number}>{item.bank_account_number}</td>
                  <td title={item.iban}>{item.iban}</td>
                  <td title={item.bank_currency_code}>{item.bank_currency_code}</td>
                  <td title={item.bank_country_code}>{item.bank_country_code}</td>
                  <td title={item.bank_routing_number}>{item.bank_routing_number}</td>
                  <td title={item.bank_swift_code}>{item.bank_swift_code}</td>
                  <td title={item.bank_name}>{item.bank_name}</td>
                  <td title={item.bank_branch_name}>{item.bank_branch_name}</td>
                  <td title={item.bank_address_line_1}>{item.bank_address_line_1}</td>
                  <td title={item.bank_address_line_2}>{item.bank_address_line_2}</td>
                  <td title={item.bank_cityname}>{item.bank_cityname}</td>
                  <td title={item.bank_statecode}>{item.bank_statecode}</td>
                  <td title={item.bank_postalcode}>{item.bank_postalcode}</td>
                  <td title={item.processing_status}>{item.processing_status}</td>
                  <td title={item.party_ext_id}>{item.party_ext_id}</td>
                  <td title={item.bank_ext_id}>{item.bank_ext_id}</td>
                  <td title={item.vendor_site_id}>{item.vendor_site_id}</td>
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
          <AddDataFormScxBankAddToExistSupplier
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

export default ScxBankAddToExistSupplier;
