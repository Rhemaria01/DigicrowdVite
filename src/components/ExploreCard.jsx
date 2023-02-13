import React from 'react'
import ExploreCardImg from "../assets/exploreCard.svg";

const ExploreCard = () => {
  return (
    <div className='flex justify-center items-center ml-14 flex-col w-80 bg-slate-200 shadow-md shadow-slate-200/20 rounded-2xl'>
               <img src={ExploreCardImg} alt='exploreCard' className='w-72 mt-2'/> 

            <div className='w-72 mt-4 font-sans'>
                <h3 className="text-slate-900">Company Name</h3>
                <p className="text-gray-500 text-[11px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing 
                elit, sed do eiusmod tempor incididunt ut labore et 
                dolore magna aliqua. 
                </p>
            </div>    
            <div className='w-72 mt-10 text-gray-500 text-xs font-sans flex flex-row justify-between'>
                    <p>Collected: <em className='text-slate-900'>99$</em></p>
                    <p>Need: <em className='text-slate-900'>500$</em></p>
            </div>
            <div className='h-5  w-[90%] bg-[#CBCBCB] rounded-lg mt-2 mb-5'>
                <div className={`h-5 rounded-lg bg-[#50FF33] `} style={{width: `${(99/500)*100}%`}}></div>
            </div>
            {/* <div className='flex flex-row items-center justify-between w-72 mt-8 pb-5'>
                    <div className="flex flex-row  justify-evenly">
                        <img src={Heart} alt="Like" className='h-10 outline outline-1 w-10 mr-3 outline-[#777777] rounded-lg p-3  text-center'/>
                        <img src={Share} alt="Share" className='h-10 outline outline-1 w-10 outline-[#777777]  rounded-lg p-3 text-center'/>
                    </div>
                    

                        <button className='bg-orange-500 text-white w-32 rounded-lg h-11'>Fundraising</button>
            </div> */}

        </div>

  )
}

export default ExploreCard