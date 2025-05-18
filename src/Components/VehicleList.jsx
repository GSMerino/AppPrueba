import { useState, useEffect } from 'react';
import { getAllVehicles} from '../Services/api';

const ListaVehiculos = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="container mt-4">
      <h3>Vehículos Registrados ({vehicles.length})</h3>
      
      {vehicles.length === 0 ? (
        <p>No hay vehículos registrados</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Marca</th>
                <th>Placa</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.clientName}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.carPlate}</td>
                  <td>
                    <button 
    
                      className="btn btn-sm btn-primary"
                    >
                      Ver detalle
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