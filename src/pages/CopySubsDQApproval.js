import React, { useState, useEffect, useRef } from 'react';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddDataForm from '../component/AddDataForm';
import { Modal, Button, Table} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { faPen, faTrashAlt, faUpload, faDownload, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/CopySubsProject.css';
import { fetchData, saveData, updateData, deleteData, deleteAllData, importData, exportData } from "../component/Api"
import DeleteConfirmation from '../component/DeleteConfirmation';

const CopySubsDQApproval = () => {
    const [subDqApprovalData, setsubDqApprovalData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const fileInputRef = useRef(null);
    const [show, setShow] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [itemNameToDelete, setItemNameToDelete] = useState('');

    //to fetch the data from backend 
    const fetchDataAndSetState = async () => {
        try {
            const result = await fetchData('https://asxucwg1u7.execute-api.us-east-1.amazonaws.com/dev-test-1/dspfetchalldata');
            const actualData = JSON.parse(result.body);
            setsubDqApprovalData(actualData);
        } catch (error) {
            console.log('Error fetching the data');
        }
    }
    

    useEffect(() => {
        fetchDataAndSetState();
    },[]);

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
            await saveData('https://zaoz973vnj.execute-api.us-east-1.amazonaws.com/scx-dsp/dspsavedata', data);
            fetchDataAndSetState();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    //to delete a single item
    const handleDeleteData = async (idToDelete) => {
        try {
            await deleteData('https://k8i5vp9r2c.execute-api.us-east-1.amazonaws.com/dsp-scx/dspupdatedata', idToDelete)
            toast.success('Deleted the data successfully!', {
                position: toast.POSITION.TOP_CENTER
            });
            fetchDataAndSetState();
            
        } catch (error) {
            console.error('Error deleting data:', error.message);
        }
        fetchDataAndSetState();
        toast.success('Deleted the data successfully!', {
            position: toast.POSITION.TOP_CENTER
        });
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
        csvLink.download = 'dsp_data.csv';
        csvLink.click();
        fetchDataAndSetState();
        toast.success('Data imported successfully!', {
            position: toast.POSITION.TOP_CENTER
        });
    };
    //to hadle the import data from db
    const handleImport = async () => {
        try {
            const response = await exportData('https://zkegmoos07.execute-api.us-east-1.amazonaws.com/scx-dsp/dspImportdata');
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
                    importData('https://zkegmoos07.execute-api.us-east-1.amazonaws.com/scx-dsp/dspImportdata', csvData);
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

    //to delete all the data 
    const handleDeleteAll = async () => {
        try {
            const response = await fetch('https://vc3d6uum44.execute-api.us-east-1.amazonaws.com/scx-dev-1/dspdeletealldata', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
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


    return (
        <div className="home-container">
            <div className='header-content'>
                <h4 className="typewriter-text text-center">Copy Subs DQ Approval</h4>
            </div>
            <div className='button-section  mt-5 d-flex justify-content-end'>
                <button type='button' title='Add Data' className='btn-custom btn btn-custom-add me-1' onClick={handleAddData}>
                    <FontAwesomeIcon icon={faPlus} className='icon-custom edit-icon' />
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
                <button type='button' className=' btn-custom btn btn-custom-download me-1' onClick={importDataInCSV}>
                    <FontAwesomeIcon icon={faDownload} className='icon-custom edit-icon' />
                </button>
                <button type='button' className='btn-custom btn btn-custom-delete' onClick={() => {setItemNameToDelete('All items'); setShowDeleteConfirmation(true)}}>
                    <FontAwesomeIcon icon={faTrash} className='icon-custom edit-icon' />
                </button>
                <DeleteConfirmation
                    show={showDeleteConfirmation}
                    onHide={() => setShowDeleteConfirmation(false)}
                    onDelete={handleDeleteAll}
                    itemName={itemNameToDelete}
                />
            </div>
            <div className='table-content mt-3'>
                <table className="table table-striped dsp-custom-table">
                    <thead>
                        <tr>
                            <th scope="col">DATA_SOURCE</th>
                            <th scope="col">SUBSCRIPTION_ID</th>
                            <th scope="col">DQ_REPORT_NAME</th>
                            <th scope="col">APPROVAL_STATUS</th>
                            <th scope="col">COMMENT</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subDqApprovalData.map((item) => (
                            <tr className='dsp-ellipsis' key={item.subscription_id}>
                                <td title={item.data_source}>{item.data_source}</td>
                                <td title={item.subscription_id}>{item.subscription_id}</td>
                                <td className='dq_report_name' title={item.dq_report_name}>{item.dq_report_name}</td>
                                <td title={item.approved_rejected}>{item.approved_rejected}</td>
                                <td title={item.comment}>{item.comment}</td>
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
                <AddDataForm
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
    );
};

export default CopySubsDQApproval;
