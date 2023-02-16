import React from 'react'

import HowItWorksImg from "../assets/howItWorks.svg"
const HowItWorks = () => {
  return (
    <>
<div className='bg-neutral-700' id="how-it-works">
        <div className='flex container mx-auto flex-row space-x-10  items-center h-[28rem]'>

          <img src={HowItWorksImg} alt="How It Works?" data-aos="fade-right" className='sm:h-48 md:h-64 w-[25.5rem]' />
          <div className='flex flex-col gap-y-0 ' data-aos="fade-left">

                <p className='text-slate-50  font-roboto  text-right font-extrabold text-[64px]  ' >
                Empowering the Crowd with </p>
                <p className='text-link font-roboto text-right fontExtrabold text-[64px] '> 
                Secure and Transparent Funding
                </p>
                <p className='text-slate-50 font-roboto text-right fontExtrabold text-[64px]  ' >
                through Blockchain. </p>
                
                

          </div>
          </div>
          </div>

    </>
  )
}

export default HowItWorks