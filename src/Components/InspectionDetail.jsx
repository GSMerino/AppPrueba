import { motion } from "framer-motion";
import { fadeIn } from "../variants";


const InspectionDetail = () => {    
    return(
        <section className="container mt-4 d-flex flex-column gap-5">

            <motion.div
                className="contentDetailVehicle"
            >
                
                <h2 className='titleMisPendientes'>Detalle del vehiculo</h2>
                <p className="mb-0">
                    Fecha de creacion: 
                </p>
            </motion.div>            

            <motion.div
                variants={fadeIn("right", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
                className=""
            >
                <h2>body</h2>
            </motion.div>

        </section>

    );
};

export default InspectionDetail;