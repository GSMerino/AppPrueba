import React from 'react'
import { motion } from "framer-motion";
import bannerImage from '../assets/auto-nissan.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className='container__Home'>

      <div className='bannerHome'>
        <div className='sectionHomeLeft'>
          <motion.div
            className="content-bannerLeft"
          >
            <div className='d-flex flex-column gap-2'>
              
              <div className='d-flex flex-column'>
                <h1 className='banner-title'>Bienvenido al taller</h1>
                <p className='banner-subtitle'>Tu Auto en Buenas Manos</p>
              </div>

              <div className='d-flex flex-column gap-5'>
                <p className='mb-0 banner-description'>
                  ¿Tu auto ya alcanzó los 10,000 km o cumplió 6 meses desde su último servicio? En nuestro taller, realizamos el mantenimiento periódico oficial que exigen las marcas.
                </p>
                <div className='d-flex justify-content-center align-items-center'>
                  
                  <Link className='banner-btn' to={"/Register"}>
                    Comenzar
                  </Link>
                    
                  
                </div>

              </div>
            </div>
          </motion.div>
        </div>

        <div className='sectionHomeRigth'>

          <motion.div 
            className="content-img"
          >
            <div className='img-banner'>
              <img className='img-cover' src={bannerImage} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


export default Home;