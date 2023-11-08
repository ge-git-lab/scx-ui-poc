import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './Sidebar'
import Home from './Home'

function App() {
  return (
    <div className='container-fluid bg-secondary min-vh-100'>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to Supplier connect !</h2>
        <p>This is our first demo page for the project.</p>
        <p className="special-para">The above logo we have taken from the react page just for the reference and testing purpose.</p>
      </header> */}
      <div className='row'>
        <div className='col-2 bg-white vh-100'>
          <Sidebar></Sidebar>
        </div>
        <div className='col-auto'>
          <Home />
        </div>
      </div>
    </div>
  );
}

export default App;
