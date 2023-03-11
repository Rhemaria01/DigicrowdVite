import React,{useEffect, useState} from 'react'
import { useContract } from '@thirdweb-dev/react';

import { hexToEth } from '../utils/utils';
import { Link } from 'react-router-dom';
import Video from './Video';
import { useStateContext } from '../context';

const ExploreCard = ({campaign, index}) => {
  const { address } = useStateContext();
  const {contract: erc20Contract, status: erc20status} = useContract(campaign.token,"token");

    const collected = hexToEth(campaign.amountCollected?._hex);
    const days = Math.floor((campaign.deadline - new Date().getTime())/ (1000 * 3600 * 24));
    const isOwner = address === campaign.owner;
    const [tokenInfo, setTokenInfo] = useState({});
    const target = hexToEth(campaign.target?._hex);
    const hasVideo = campaign.image.map((img) => img.includes('video')).includes(true);
    const videoIndex = campaign.image.map((img) => img.includes('video')).indexOf(true);
    // console.log('videoIndex', videoIndex);
    const video = campaign.image[videoIndex-1];
    useEffect(() => {
      if(erc20status === "success"){
          erc20Contract.balanceOf(address).then(res => {
              setTokenInfo({
                  res
              })
          })
      }
  }, [erc20status])
  return (
    days >= 0 &&
    
    <div data-aos="zoom-in" className='flex justify-center cursor-pointer items-center ml-14 flex-col min-h-48 w-80 bg-slate-200 shadow-md shadow-slate-200/20 rounded-2xl'>
    {hasVideo? <Video source={video} border={false}/>: <img src={campaign.image[0]} alt='exploreCard' className='h-36 w-64  object-cover mt-5'/> }
               

            <div className='w-72 mt-4'>
                <h3 className="text-slate-900 font-bold text-lg font-roboto">{campaign.title}</h3>
                <p className="text-gray-500 text-sm text-justify truncate">
                {campaign.description} 
                </p>
            </div>    
            <div className='w-72 mt-10 flex flex-row justify-between'>
                    <p className='text-black font-bold text-xs font-roboto '>Collected: <em>{collected} {Object.keys(tokenInfo).length > 0  ? tokenInfo.res.symbol :   "ETH"} </em></p>
                    <p className='text-black font-bold text-xs font-roboto '>Need: <em>{target} {Object.keys(tokenInfo).length > 0  ? tokenInfo.res.symbol :  "ETH"}</em></p>
            </div>
            <div className='h-5  w-[90%] bg-[#CBCBCB] rounded-lg mt-2 mb-5'>
                <div className={`h-5 rounded-lg bg-[#50FF33] `} style={{width: `${(collected/target)*100}%`}}></div>
            </div>
            <div className='flex flex-row items-center justify-between w-72  pb-5'>
            <p className='text-gray-500 text-xs font-roboto '>Days Left: <em className='text-link text-3xl'>{Math.floor((campaign.deadline - new Date().getTime())/ (1000 * 3600 * 24))} </em></p>
                    
                    

            <Link to={`/donate/${index}`} ><button className='bg-link text-white font-roboto w-32 rounded-lg h-11'>{isOwner? "View":"Donate"}</button></Link>
            </div>

        </div>
    

  )
}

export default ExploreCard