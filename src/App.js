import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './Sidebar';
import Home from './Home';
import Order from './Order'
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
      <BrowserRouter>
      <div className='d-flex'>
        <div className='col-auto'>
          <Sidebar />
        </div>
        <div>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/order' element={<Order />}></Route>
          </Routes>
        </div>
      </div>
      </BrowserRouter>
      
  );
}

export default App;
