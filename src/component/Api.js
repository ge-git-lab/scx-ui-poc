import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//function to fetch the data from db
export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data;
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err; //Re-throw the error to handle where fetchData is called
    }
};

//fucntion to save the data to db
export const saveData = async (endpoint, newData) => {
    try {
        const response = await axios.post(endpoint, newData);
        return response.data;
        // toast.success('Data added successfully!', { position: toast.POSITION.TOP_CENTER });
    } catch (err) {
        console.error('Error saving data:', err);
        toast.error('Failed to save data', { position: toast.POSITION.TOP_CENTER })
        throw err; 
    }
};

//fucntion to update the data to db
export const updateData = async (endpoint, id, data) => {
    try {
        const response = await axios.put(`${endpoint}/${id}`, data);
        return response.data;
        toast.success('Data updated successfully!', { position: toast.POSITION.TOP_CENTER });
    } catch (err) {
        console.error('Error saving data:', err);
        toast.error('Failed to update data', { position: toast.POSITION.TOP_CENTER })
        throw err; 
    }
};

//fucntion to delete the data from db
export const deleteData = async (endpoint, id, data) => {
    try {
        const result = await axios.delete(`${endpoint}/${id}`, data);
        return result;
    } catch (err) {
        console.error('Error deleting the data:', err);
        throw err;
    }
};

//fucntion to delete all the data from db
export const deleteAllData = async (endpoint, {}) => {
    try {
        const result = await axios.delete(endpoint);
        return result;
        // toast.success('All Data deleted successfully!', { position: toast.POSITION.TOP_CENTER });
    } catch (err) {
        console.error('Error deketing the data:', err);
        toast.error('Failed to delete all data', { position: toast.POSITION.TOP_CENTER })
        throw err;
    }
};

//fucntion to export all the data from db in csv
export const exportData = async (endpoint) => {
    try {
        const response = await axios.get(endpoint, {
            responseType: 'text',
        });
        return response.data;
    } catch (err) {
        console.error('Error exporting the data:', err);
        throw err;
    }
};

//fucntion to import all the data from db in csv
export const importData = async (endpoint, csvData) => {
    try {
        await axios.post(endpoint, csvData, {
        });
        console.log('Data Imported successfully')
    } catch (err) {
        console.error('Error exporting the data:', err);
        throw err;
    }
};

//function to call the procedure
export const callProcedure = async (endpoint) => {
    try {
        const response = await axios.post(endpoint);
        return response.data;
        // toast.success('Data added successfully!', { position: toast.POSITION.TOP_CENTER });
    } catch (err) {
        console.error('Error saving data:', err);
        toast.error('Failed to save data', { position: toast.POSITION.TOP_CENTER })
        throw err; 
    }
};

