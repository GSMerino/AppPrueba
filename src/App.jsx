import Header from './Components/Header'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import RegisterVehicle from './Pages/RegisterVehicle';
import InspectionVehicle from './Pages/InspectionVehicle';
import InspectionDetail from './Components/InspectionDetail';

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
      </main>
    </HashRouter>
  );
}

export default App
