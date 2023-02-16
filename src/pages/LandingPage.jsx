import React, { useContext} from 'react';

import { ModalContext } from '../context/ModalContext';

import heroImage from '../assets/heroImage.svg';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';
import Explore from '../components/Explore';

import rocket from '../assets/rocket/Vector.png';
import rocket1 from '../assets/rocket/Vector-1.png';
import rocket2 from '../assets/rocket/Vector-2.png';
import rocket3 from '../assets/rocket/Vector-3.png';
import rocket4 from '../assets/rocket/Vector-4.png';
import rocket5 from '../assets/rocket/Vector-5.png';
import { TypeAnimation } from 'react-type-animation';
import Modal from '../components/Modal'
import "../styles/Rocket.css" 
const LandingPage = () => {
  const OpenModalContext = useContext(ModalContext);

  
  return (
    <>
    <div className={`${OpenModalContext.modalOpen && "blur-md"} `}>

    
        <div className='flex lg:flex-row md:flex-col sm:flex-col h-[29.813rem] container mx-auto sm:items-center mt-28 w-[100%] '>
        <div className=' w-[54.125rem]  space-x-4' data-aos="fade-right">
          <p className='leading-normal font-roboto text-white font-extrabold  text-[65px]'>Revolutionizing Crowdfunding 
          for a Decentralized Future with
          
        <TypeAnimation
          sequence={[
            " Blockchain",
            1000,
            " Digicrowd",
            1000
          ]}
          wrapper="em"
          cursor={true}
          repeat = {Infinity}
          
         className='text-link font-roboto'
         /></p>
          <input type="button" value="Know more" className='outline outline-1 mt-10 sm:text-xs md:text-2xl font-bold outline-stale outline-white text-white md:h-18 md:w-48  sm:w-28 sm:h-10 rounded-full ' />
        </div>


          <div className='h-[29.813rem] w-[40rem]'>
            
            <div className='absolute'>
          <img src={heroImage} alt='heroImage' className='h-[29.813rem] w-[40rem]'/>


              <img src={rocket} alt='rocket'  className='smoke absolute left-[42.99%] right-[54%] top-[46.99%] bottom-[41.28%]'/>
              <img src={rocket1} alt='rocket'   className='smoke absolute left-[51.78%] right-[54%] top-[46.99%] bottom-[41.28%]'/>
              <img src={rocket2} alt='rocket'   className='smoke absolute left-[35.35%] right-[45.04%] top-[55.35%] bottom-[32.28%]'/>
              <img src={rocket3} alt='rocket'   className='smoke absolute left-[44.46%] right-[46.72%] top-[32.79%] bottom-[44.9%];'/>
              <img src={rocket4} alt='rocket'   className='smoke absolute left-[46.01%] right-[48.27%] top-[53.95%] bottom: [43.61%]'/>
              <img src={rocket5} alt='rocket'  className='smoke absolute left-[46.98%] right-[49.13%] top-[40.06%] bottom-[54.78%]'/>

              

            </div>

          </div>
        </div>
    <HowItWorks />
    <Explore />

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