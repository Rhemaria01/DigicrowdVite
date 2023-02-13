import React, { useContext} from 'react';

import { ModalContext } from '../context/ModalContext';
import Header from '../layout/Header';
import heroImage from '../assets/heroImage.svg';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';
import Explore from '../components/Explore';


import Modal from '../components/Modal'
const LandingPage = () => {
  const OpenModalContext = useContext(ModalContext);

  
  return (
    <>
    <div className={`${OpenModalContext.modalOpen && "blur-md"}`}>
    <Header/>
    
        <div className='flex lg:flex-row md:flex-col sm:flex-col h-[55vh] md:items-stretch sm:items-center mt-20 px-10 w-full '>
        <div className='font-[Open_Sans]  space-x-4 w-3/4' data-aos="fade-right">
          <h1 className='leading-normal text-link font-extrabold w-[85%] sm:text-3xl md:text-6xl'>Connecting projects that matter with people who care.</h1>
          <input type="button" value="Know more" className='outline outline-1 mt-10 sm:text-xs md:text-2xl font-bold outline-stale outline-white text-white md:h-18 md:w-48  sm:w-28 sm:h-10 rounded-full ' />
        </div>


          <img src={heroImage} alt='heroImage' data-aos="fade-left" className='sm:h-48  md:h-96'/>

        </div>
    <Explore />

    <HowItWorks />
    <AboutUs />
    </div>
    {OpenModalContext.modalOpen && <Modal/>}
    {/* <div className='fixed top-[50%] right-0'>
    <MetamaskLogo />
    </div> */}
    </>
  )
}

export default LandingPage