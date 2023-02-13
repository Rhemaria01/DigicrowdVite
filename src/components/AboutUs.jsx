import React from 'react'

import Shubham from '../assets/shubham.svg';
import Reenav from '../assets/reenav.svg';
import Atiq from '../assets/atiq.svg';

const AboutUs = () => {
  return (

    <div className='container h-[75vh]' id="about-us">
    <span data-aos="fade-up">
    <h1 className='text-link md:text-5xl sm:text-3xl text-center   mb-10' >About Us</h1>
    <h1 className='text-zinc-50 md:text-3xl sm:text-2xl text-center   mb-10' >Our Team</h1>
    </span>
        <div className='flex flex-wrap justify-center gap-10'>
            <div className='flex flex-col gap-2' data-aos="fade-right">
                <img src={Shubham} alt="shubham" className='sm:h-36 md:h-[17rem]'/>
                <p className='text-zinc-50 md:text-3xl sm:text-2xl text-center'>Shubham Naik</p>
            </div>
            <div className='flex flex-col gap-2' data-aos="fade-up">
                <img src={Reenav} alt="reenav"  className='sm:h-36 md:h-[17rem]'/>
                <p className='text-zinc-50 md:text-3xl sm:text-2xl text-center'>Reenav Hemaria</p>
            </div>
            <div className='flex flex-col gap-2' data-aos="fade-left">
                <img src={Atiq} alt="atiq" className='sm:h-36 md:h-[17rem]'/>
                <p className='text-zinc-50 md:text-3xl sm:text-2xl text-center'>Atiq Shaikh</p>
            </div>
        </div>
    </div>

  )
}

export default AboutUs