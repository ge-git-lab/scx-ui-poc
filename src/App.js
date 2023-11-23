import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './components/Routes';

function App() {
  return (
    <Router>
    <div className="container-fluid">
      <div className="sidebar">
        <Sidebar />
        </div>
        <div className="content">
            <AppRoutes />
        </div>
    </div>
    </Router>
  );
}

// fetch the data for the project
const API_ENDPOINT = 'https://asxucwg1u7.execute-api.us-east-1.amazonaws.com/dev-test-1/dspfetchalldata';

export const fetchData = async () => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


export default App;