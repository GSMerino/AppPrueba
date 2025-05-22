import { useState, useRef  } from 'react'; 
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { createVehicle} from '../Services/api';
import { motion } from "framer-motion";
import { fadeIn } from "../Variants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterVehicle = () => { 
  //estados para imagen
  const [imageBase64, setImageBase64] = useState('');
  const maxCommentLength = 70;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
         console.log(reader.result);
        setImageBase64(reader.result); // Aquí se guarda la imagen como base64
      };
      reader.readAsDataURL(file);
    }

  };

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
        service: data.service.substring(0, maxCommentLength),
        image: imageBase64
      }

      const response = await createVehicle(VehicleData);
    
    
      console.log("Vehículo creado:", response);
      
      toast.success('¡Vehículo registrado correctamente!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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


      <div className='w-100 d-flex flex-column gap-4 mb-5'>

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
                <select  defaultValue="" 
                  className={`form-control ${errors.brand ? 'is-invalid' : ''}`}
                  {...register("brand",{
                    required: {value: true, message: "El campo es requerido"},
                    
                  })}
                
                >
                  <option value="">Seleccione una marca</option>
                  <option value="Nissan">Nissan</option>
                  <option value="Hyundai">Hyundai</option>
                  <option value="Mazda">Mazda</option>
                </select>
                {errors.brand &&(
                  <p className='mb-0 text-danger'>{errors.brand.message}</p>
                )}

              </div>

            </div>
            <div className='col-md-4'>
              <label className='d-flex flex-column gap-2 font-bold'>
                Telefono Cliente: 
                <input 
                  type='tel' 
                  placeholder='Ej: 0123456789' 
                  maxLength={10}
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  {...register("phone", {
                    required: {value: true, message: "El campo es requerido"},
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Debe tener 10 dígitos numéricos"
                    },
                   
                  })}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, '');
                    e.target.value = numericValue;
                    setValue("phone", numericValue, { shouldValidate: true });
                  
                  }}
                /> 
                {errors.phone && (
                  <p className='text-danger mb-0'>{errors.phone.message}</p>
                )}
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
                    className={`form-control ${errors.vin ? 'is-invalid' : ''}`}
                    maxLength={17}
                    {...register("vin", {
                      required: {value: true, message: "El campo es requerido"},  
                    
                    
                    
                    })}

                  />
                  {errors.vin && (
                    <p className='text-danger mb-0'>{errors.vin.message}</p>
                  )}
                
                </label>
              </div>
            </div>
            <div className='col-md-3'>
              <div className='d-flex flex-column gap-2'>
                <label className='d-flex flex-column gap-2 font-bold'>
                  Año del modelo:
                  <input type='date' 
                    placeholder='Ingresa el Año' 
                    className={`form-control ${errors.modelYear ? 'is-invalid' : ''}`}
                    {...register("modelYear", {
                      required: {value: true, message: "El campo es requerido"}
                    })}
                  />
                  {errors.modelYear && (
                    <p className='mb-0 text-danger'>{errors.modelYear.message}</p>
                  
                  )}
                
                </label>
              </div>
            </div>
            <div className='col-md-3'>
              <label className='d-flex flex-column gap-2 font-bold'>
                Modelo:
                <input 
                  type='text' 
                  placeholder='Ingresa el modelo del auto'
                  className={`form-control ${errors.modelVehicle ? 'is-invalid' : ''}`}
                  {...register("modelVehicle", {
                    required: {value: true, message: "El campo es requerido"},
                  })}

                />
                {errors.modelVehicle && (
                  <p className='text-danger mb-0'>{errors.modelVehicle.message}</p>
                )}

              </label>
            </div>
            <div className='col-md-2'>
              <label className="d-flex flex-column gap-2 font-bold">
                Placa: 
                <input 
                  type='text'
                  placeholder='Ej: ABC123'
                  className={`form-control ${errors.carPlate ? 'is-invalid' : ''}`}
                  maxLength={7}
                  {...register("carPlate", {
                    required: {value: true, message: "El campo es requerido"}
                  })}
                />
                {errors.carPlate && (
                  <p className='text-danger mb-0'>{errors.carPlate.message}</p>
                )}

              </label>
            </div>
          </div>
          
          <div className='row'>
            <div className='col-md-4'>
              <label className='d-flex flex-column gap-2 font-bold'>
                Servicio a realizar:
                <textarea 
                  className={`form-control ${errors.service ? 'is-invalid' : ''}`}
                  placeholder='Agregar comentario'
                  rows={3}
                  {...register("service", {
                    required: {value: true, message: "El campo es requerido"},
                    maxLength: maxCommentLength
                  })}
                />
                {errors.service && (
                  <p className='mb-0 text-danger'>{errors.service.message}</p>
                )}

              </label>
            </div>

            <div className='col-md-5'>
              <div className='gap-4 contentImage'>
                <div className='d-flex gap-4 contentInput'>

                  <input 
                    type='file' 
                    accept="image/*"
                    className='d-none'
                    id="vehicleImageInput"
                    onChange={handleImageChange}
                  />

                  <label htmlFor="vehicleImageInput" className="btn btn-outline-secondary">
                    📸 Seleccionar Imagen
                  </label>

                </div>
                {imageBase64 && (
                  <div className="contentImgSelected">
                    <img 
                      src={imageBase64} 
                      alt="Vista previa"
                      className='img-coverSelected' 
                    />
                  </div>
                )}
                                
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