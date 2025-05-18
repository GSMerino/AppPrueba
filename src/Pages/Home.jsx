import React from 'react'
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Home = () => {
  return (
    <section className='container mt-4'>
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
      >
        <div className=' homeContent'>
          <div className='sectionLeft'>
            <h2>Titulo</h2>
          </div>
          <div className='sectionRigth'>
            <h2>Imagen</h2>
          </div>
      </div>
      </motion.div>

    </section>
  )
}


export default Home;