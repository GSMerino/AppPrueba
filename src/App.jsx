import Header from './Components/Header'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import RegisterVehicle from './Pages/RegisterVehicle';
import InspectionVehicle from './Pages/InspectionVehicle';
import InspectionDetail from './Components/InspectionDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <HashRouter>
      <main className='container__app'>
        <Header />
        <div className='d-flex w-100'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterVehicle />} />
            <Route path="/inspection" element={<InspectionVehicle />} />
            <Route path="/inspection/:vehicleId" element={<InspectionDetail />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          style={{top: '4.6rem'}}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

      </main>
    </HashRouter>
  );
}

export default App
