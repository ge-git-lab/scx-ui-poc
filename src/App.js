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

export default App;