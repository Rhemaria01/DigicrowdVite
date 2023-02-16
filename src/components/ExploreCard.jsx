import React from 'react'
import ExploreCardImg from "../assets/exploreCard.svg";
import { hexToEth } from '../utils/utils';
import { Link } from 'react-router-dom';
const ExploreCard = ({campaign, index}) => {
    const collected = hexToEth(campaign.amountCollected?._hex);
    const target = hexToEth(campaign.target?._hex);
  return (
    <Link to={`/donate/${index}`} className='flex justify-center cursor-pointer items-center ml-14 flex-col min-h-48 w-56 bg-slate-200 shadow-md shadow-slate-200/20 rounded-2xl'>
    <div  className='flex justify-center cursor-pointer items-center ml-14 flex-col min-h-48 w-80 bg-slate-200 shadow-md shadow-slate-200/20 rounded-2xl'>
               <img src={campaign.image} alt='exploreCard' className='w-72 h-56 object-cover mt-2'/> 

            <div className='w-72 mt-4'>
                <h3 className="text-slate-900 font-bold text-lg font-roboto">{campaign.title}</h3>
                <p className="text-gray-500 text-sm">
                {campaign.description} 
                </p>
            </div>    
            <div className='w-72 mt-10 flex flex-row justify-between'>
                    <p className='text-black font-bold text-xs font-roboto '>Collected: <em>{collected + " ETH"} </em></p>
                    <p className='text-black font-bold text-xs font-roboto '>Need: <em>{target + " ETH"}</em></p>
            </div>
            <div className='h-5  w-[90%] bg-[#CBCBCB] rounded-lg mt-2 mb-5'>
                <div className={`h-5 rounded-lg bg-[#50FF33] `} style={{width: `${(collected/target)*100}%`}}></div>
            </div>
            <div className='flex flex-row items-center justify-between w-72  pb-5'>
            <p className='text-gray-500 text-xs font-roboto '>Days Left: <em className='text-link text-3xl'>{Math.floor((campaign.deadline - new Date().getTime())/ (1000 * 3600 * 24))} </em></p>
                    
                    

                        <button className='bg-link text-white w-32 rounded-lg h-11'>Donate</button>
            </div>

        </div>
    </Link>

  )
}

export default ExploreCard