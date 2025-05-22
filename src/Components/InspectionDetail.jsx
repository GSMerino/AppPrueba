import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { getVehicleById } from "../Services/api";
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InspectionDetail = () => {    

    const location = useLocation();
    const id = location.pathname.split("/").pop(); 
    const [isInspectionCompleted, setIsInspectionCompleted] = useState(false);
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fechaFormateada = new Date(vehicle?.createdAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    });

    const { 

        register,
        handleSubmit, 
        setValue, 
        watch, formState: { errors } 
    } = useForm({
            defaultValues: {
            frontLeftPressure: 32,
            frontRightPressure: 30,
            rearLeftPressure: 33,
            rearRightPressure: 31,
        },
    });


    useEffect(() => {
        const loadVehicle = async () => {
            try {
                const data = await getVehicleById(id); 
                setVehicle(data);
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadVehicle();
    }, [id]);


    const onSubmit = (data) => {
        if (vehicle.brand === "Nissan" || vehicle.brand === "Mazda") {
            if (!data.lightsFront || !data.lightsRear) {
                alert("Completa la inspección de luces antes de finalizar.");
                return;
            }
        }

        // if ((vehicle.brand === "Mazda" || vehicle.brand === "Hyundai") && (!data.lightsFront || !data.lightsRear || data.batteryLevel === '')) {
        //     alert("Completa la inspección de luces y batería antes de finalizar.");
        //     return;
        // }

        const vehicles = JSON.parse(localStorage.getItem("vehicleRegistrations")) || [];

        const updatedVehicles = vehicles.map(v => {
            if (v.id === vehicle.id) {
                return {
                    ...v, 
                    inspectionData: data,
                    status: "finalizado"
                };
            }
            return v;
        });

        localStorage.setItem("vehicleRegistrations", JSON.stringify(updatedVehicles));

        toast.success('¡Inspección finalizada!', {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
        setIsInspectionCompleted(true);
    };


    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!vehicle) return <p>Vehículo no encontrado</p>;

    

    return(
        <section className="container mt-4 d-flex flex-column gap-5">

            <motion.div
                className="contentDetailVehicle"
            >
                <div className="d-flex align-items-center gap-5">
                    <div className="d-flex flex-column ">
                        <Link className='btn-regresar d-flex align-items-center gap-2' to={"/inspection"}>
                            <FaArrowLeft />
                            Regresar
                        </Link>
                    </div>

                    <div className="d-flex flex-column">
                        <h2 className='titleMisPendientes'>Vehiculo: {vehicle?.brand} {vehicle?.modelVehicle}</h2>
                        <p className="mb-0 subtitleVehicle">
                            Fecha de creacion: {fechaFormateada}
                        </p>
                    </div>
                </div>



            </motion.div>            

            <motion.div
                // variants={fadeIn("right", 0.3)}
                // initial="hidden"
                // whileInView={"show"}
                // viewport={{ once: false, amount: 0.7 }}
                className="containerInspection"
            >
                <div className="containerInspectionLeft">

                    <div className="containerInspection--title">
                        <h4>Detalle de inspección</h4>
                    </div>

                    <div className="d-flex flex-column gap-5">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="d-flex flex-column gap-2">
                                    <span className="font-bold">Cliente</span>
                                    <span>{vehicle?.clientName}</span>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div className="d-flex flex-column gap-2">
                                    <span className="font-bold">Telefono </span>
                                    <span>{vehicle?.phone}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex flex-column gap-2">
                                    <span className="font-bold">VIN</span>
                                    <span>{vehicle?.vin}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="d-flex flex-column gap-2">
                                    <span className="font-bold">Placas</span>
                                    <span>{vehicle?.carPlate}</span>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="d-flex flex-column gap-2">
                                    <span className="font-bold">Año</span>
                                    <span>{vehicle?.modelYear}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="d-flex flex-column gap-2">
                                    <span className="font-bold">Servicio</span>
                                    <span>{vehicle?.service}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {vehicle && (vehicle.brand === "Nissan" || vehicle.brand === "Mazda") && (
                            <div className="d-flex flex-column gap-2 w-100 justify-content-evenly">
                                <div className="titleInspection">
                                    <h5>Inspección de luces</h5>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="d-flex flex-column gap-2 font-bold">
                                            Estado de luces frontales: 
                                            <select 
                                                className={`form-controlStatus ${errors.lightsFront ? 'is-invalid' : ''}`}
                                                {...register("lightsFront", {
                                                    required: {value: true, message: "Selecciona una opción"}
                                                })}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                <option value="buenE">Buen Estado</option>
                                                <option value="cambioR">Cambio recomendado</option>
                                                <option value="reqC">Requiere Cambio</option>
                                            </select>
                                            {errors.lightsFront && (
                                                <p className='text-danger mb-0'>{errors.lightsFront.message}</p>
                                            )}
                                        </label>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="d-flex flex-column gap-2 font-bold">
                                            Estado de luces posteriores:
                                            <select 
                                                
                                                className={`form-controlStatus ${errors.lightsRear ? 'is-invalid' : ''}`}
                                                {...register("lightsRear", {
                                                    required: {value: true, message: "Selecciona una opción"}
                                                })}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                <option value="buenE">Buen Estado</option>
                                                <option value="cambioR">Cambio recomendado</option>
                                                <option value="reqC">Requiere Cambio</option>
                                            </select>
                                            {errors.lightsRear && (
                                                <p className='text-danger mb-0'>{errors.lightsRear.message}</p>
                                            )}
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}



                        {/*Monitoreo de presion en llantas  */}
                        {vehicle && (vehicle.brand === "Hyundai") && (
                            <div className="contentPresion">
                                <h5 className="subtitle">Monitoreo de Presión en Llantas</h5>

                                <div>
                                    <div className="tire-layout">
                                        {["Delantera Izquierda", "Delantera Derecha", "Trasera Izquierda", "Trasera Derecha"].map((tire) => (
                                            <div className="tire-item" key={tire}>
                                                <span>{tire.replace(/([A-Z])/g, " $1")}</span>
                                                <input 
                                                    type="range" 
                                                    min="20" 
                                                    max="50" 
                                                    step="1" 
                                                    {...register(`${tire}Pressure`)} 
                                                    value={watch(`${tire}Pressure`)}
                                                    onChange={(e) => setValue(`${tire}Pressure`, e.target.value)}
                                                />
                                                <span 
                                                    className={`tire-pressure-status ${
                                                        watch(`${tire}Pressure`) > 35 ? "ok" :
                                                        watch(`${tire}Pressure`) >= 30 ? "warning" : "danger"
                                                    }`}
                                                >
                                                    {watch(`${tire}Pressure`)} PSI
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                            </div>
                        )}


                        {/* Nivel de carga de la bateria */}
                        <div className="contentNivelCarga mt-5">
                            {vehicle && (vehicle.brand === "Mazda" || vehicle.brand === "Hyundai") && (
                                <div className="contentNivelCarga">
                                    <h5 className="subtitle">Nivel de Carga de la Batería</h5>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        step="1" 
                                        value={watch("batteryLevel") || 50} 
                                        className="slider-battery"
                                        {...register("batteryLevel", { required: true })}
                                        onChange={(e) => setValue("batteryLevel", e.target.value)}
                                    />
                                    <span>{watch("batteryLevel") || 50}%</span>
                                </div>
                            )}
                        </div>
                    
                        <div className="row mt-5">
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn-saveInspection bg-success" disabled={isInspectionCompleted}>
                                    Finalizar inspección
                                </button>
                            </div>
                        </div>

                    </form>
                    

                
                </div>
                <div className="containerInspectionRigth">
                    <div className="conainerImgVehicle">
                        <div className="contentDetailImg">
                            <img className="img-Vehicle" src={vehicle?.image} alt="img-Vehicle"/>
                        </div>
                    </div>
                </div>
            </motion.div>

        </section>

    );
};

export default InspectionDetail;