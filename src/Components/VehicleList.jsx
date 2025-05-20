import { useState, useEffect } from 'react';
import { getAllVehicles} from '../Services/api';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const ListaVehiculos = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar vehículos al iniciar
  const loadVehicles = async () => {
    try {
      const data = await getAllVehicles();
      setVehicles(data);
    } catch (error) {
      console.error("Error cargando vehículos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);



  if (loading) return <div>Cargando...</div>;

  return (
    <div className="container mt-4 d-flex flex-column gap-50">

      <motion.div
        variants={fadeIn("right", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      >
        <div className='contentDetailVehicle'>
          <h2 className='titleMisPendientes'>Mis pendientes</h2>
          <span>Vehículos Registrados ({vehicles.length})</span>
        </div>
      </motion.div>


      
      {vehicles.length === 0 ? (  
        <p>No hay vehículos registrados</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                
                <th>Cliente</th>
                <th>Marca</th>
                <th>Placa</th>
                <th>Acciones</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  
                  <td>{vehicle.clientName}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.carPlate}</td>
                  <td>
                    <button 
                      onClick={() => navigate(`/inspection/${vehicle.id}`)}
                      className="btn btn-sm btn-primary"
                    >
                      Inspeccionar
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListaVehiculos;