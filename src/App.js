import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './component/Sidebar';
import { BrowserRouter as Router } from 'react-router-dom'
import AppRoutes from './component/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleRight, faHome, faFileAlt } from '@fortawesome/free-solid-svg-icons'

function App() {

  
  return (
    <Router>
      <div className="container-fluid">
        <div class='row'>
          <div className="col-3">
            <Sidebar />
          </div>
          <div className="col-9">
            <AppRoutes />
          </div>
        </div>
      </div>
      <ToastContainer autoClose={3000} />
    </Router>
  );
}

export default App;