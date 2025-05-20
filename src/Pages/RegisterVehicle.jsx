import { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { createVehicle} from '../Services/api';
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const RegisterVehicle = () => { 
  const maxCommentLength = 80;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  
  const onSubmit = async (data) => {
    console.log("Datos válidos:", data);
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    
    try{
      const VehicleData = {
        clientName: data.clientName.trim(),
        phone: data.phone,
        brand: data.brand,
        vin: data.vin,
        modelYear: data.modelYear,
        modelVehicle: data.modelVehicle,
        carPlate: data.carPlate.toUpperCase(),
        service: data.service.substring(0, maxCommentLength)
      }

      const response = await createVehicle(VehicleData);
    
    
    console.log("Vehículo creado:", response);
    setSubmitSuccess(true);
    reset();
    
    }catch (error) {
      console.log("Error al registrar", error);
      setSubmitError(error.message || "Ocurrió un error");
    }finally {
      setIsSubmitting(false);
    }
        
  };


  return (

    <section className="container mt-4 p-0"  >


      <div className='w-100 d-flex flex-column gap-4'>

        <motion.div
          variants={fadeIn("right", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <div className='d-flex flex-column'>
            <h2 className='m-0 titleRegister'>Registro de Vehículo</h2>
          </div>
        </motion.div>

        
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >

          <form onSubmit={handleSubmit(onSubmit)} className="containerForm__Vehicle p-0" >

          <div className='row'>
            <div className='col-md-4'>
              <label className='d-flex flex-column gap-2 font-bold'>
                Nombre del cliente: 
                <input 
                  type="text"
                  placeholder="Ingresa el nombre"
                  className={`form-control ${errors.clientName ? 'is-invalid' : ''}`}
                  {...register("clientName", {
                    required: {value: true, message: "El campo es requerido"},
                    setValueAs: (value) => typeof value === 'string' ? value.trim() : value
                  })} 
                />
                {errors.clientName && (
                  <p className='text-danger mb-0'>{errors.clientName.message}</p>
                )}
              </label>
            </div>
            <div className='col-md-4'>
              <div className='d-flex flex-column gap-2 font-bold'>
                <label>Marca:</label>
                <select name="marca" defaultValue="" className='form-control' {...register("brand")}>
                  <option value="">Seleccione una marca</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Mazda">Mazda</option>
                </select>
              </div>

            </div>
            <div className='col-md-4'>
              <label className='d-flex flex-column gap-2 font-bold'>
                Telefono Cliente: 
                <input 
                  type='tel' 
                  placeholder='Ej: 0123456789' 
                  maxLength={10}
                  className='form-control' 
                  {...register("phone", {
                    required: {value: false, message: "El campo es requerido"},
                    pattern: {
                      value: /^[0-9]{10}$/, // Ajusta según el formato que necesites
                      message: "Debe tener 10 dígitos numéricos"
                    },
                   
                  })}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, '');
                    e.target.value = numericValue;
                    setValue("phone", numericValue, { shouldValidate: true });
                  
                  }}

                /> 
              </label>
            </div>
          </div>
          
          <div className='row'>
            <div className='col-md-4'>
              <div className='d-flex flex-column gap-2'>
                <label className='d-flex flex-column gap-2 font-bold'>
                  VIN: 
                  <input 
                    type="text"
                    placeholder='Ingresa el VIN'
                    className='form-control'
                    maxLength={17}
                    {...register("vin", {
                      
                    
                    
                    
                    })}

                  />
                
                </label>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='d-flex flex-column gap-2'>
                <label className='d-flex flex-column gap-2 font-bold'>
                  Año del modelo:
                  <input type='date' placeholder='Ingresa el Año' className='form-control' />
                </label>
              </div>
            </div>
            <div className='col-md-3'>
              <label className='d-flex flex-column gap-2 font-bold'>
                Modelo:
                <input 
                  type='text' 
                  placeholder='Ingresa el modelo del auto'
                  className='form-control'
                  {...register("modelVehicle")}

                />

              </label>
            </div>
            <div className='col-md-2'>
              <label className="d-flex flex-column gap-2 font-bold">
                Placa: 
                <input 
                  type='text'
                  placeholder='Ej: ABC123'
                  className='form-control' 
                  maxLength={7}
                  {...register("carPlate", {
                    required: {value: true, message: "Ingresa un numero de telefono"}
                  })}

                />
              </label>
            </div>
          </div>
          
          <div className='row'>
            <div className='col-md-4'>
              <label className='d-flex flex-column gap-2 font-bold'>
                Servicio a realizar:
                <textarea 
                  className='form-control'
                  placeholder='Agregar comentario'
                  rows={3}
                  {...register("service", {
                    maxLength: maxCommentLength
                  })}

                
                />
              </label>
            </div>

            <div className='col-md-4'>
              <div className='gap-4 contentImage'>
                <p className='mb-0'>Subir imagen</p>

              </div>
            </div>


          </div>

          <div className='row'>
            <div className='d-flex justify-content-center'>
              <button type='submit' className='btn-addVehicle'>
                Registrar
              </button>
            </div>

            
          
          </div>


      


        

          </form>

        </motion.div>



      </div>

      





    </section>
  )
}

export default RegisterVehicle;