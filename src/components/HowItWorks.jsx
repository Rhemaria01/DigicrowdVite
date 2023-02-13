import React from 'react'

import HowItWorksImg from "../assets/howItWorks.svg"
const HowItWorks = () => {
  return (
    <>
<div className='container' id="how-it-works">
        <h1 className='text-link text-center mt-28 md:text-6xl sm:text-4xl   mb-20' data-aos="fade-up">How it Works?</h1>
        <div className='flex flex-row w-full'>

          <img src={HowItWorksImg} alt="How It Works?" data-aos="fade-right" className='sm:h-48 md:h-[35rem]' />
          <div className='flex flex-col justify-center' data-aos="fade-left">
        <h1 className='text-link text-start md:text-5xl sm:text-3xl  mb-3' >What is Crowdfunding?</h1>
                <p className='text-slate-50 font-extrabold text-3xl mb-10 w-[90%]' >
                Crowdfunding is the practice of funding a project or 
                venture by raising money from a large number of 
                people, typically via the internet. 
                </p>
        <h1 className='text-link text-start md:text-5xl sm:text-3xl  mb-3'>Why choose Digicrowd?</h1>
                <p className='text-slate-50 font-extrabold text-3xl mb-10 w-[90%]'>
                Find out more about our team and our story. We’ve 
                helped over 175,000 projects raise more than 
                $100 million for great causes. 
                </p>
          </div>
        </div>
          </div>

    </>
  )
}

export default HowItWorks