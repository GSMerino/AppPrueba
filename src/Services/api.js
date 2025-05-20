

const STORAGE_KEY = 'vehicleRegistrations';

// Inicializar si no existe
if (!localStorage.getItem(STORAGE_KEY)) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Crear un nuevo vehiculo
export const createVehicle = async (vehicleData) => {
  await delay(300);
  const vehicles = JSON.parse(localStorage.getItem(STORAGE_KEY)); // Cambiado a 'vehicles'
  const newVehicle = { 
    id: Date.now(), 
    ...vehicleData, // Usamos el parámetro que recibimos
    createdAt: new Date().toISOString() 
  };
  vehicles.push(newVehicle);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles)); // Guardamos 'vehicles'
  return newVehicle; 
};

// Obtener todos los vehiculo
export const getAllVehicles = async () => {
  await delay(300); // Simula un retardo
  return JSON.parse(localStorage.getItem(STORAGE_KEY));
};





// Obtener un vehiculo por ID
// export const getVehicleById = async (id) => {
//   await delay(200);
//   const users = JSON.parse(localStorage.getItem(STORAGE_KEY));
//   return users.find(user => user.id === id);
// };






