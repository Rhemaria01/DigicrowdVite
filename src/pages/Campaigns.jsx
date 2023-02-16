import React, { useEffect } from 'react'
import { useStateContext } from '../context';
import Header from '../layout/Header';
import Back from '../components/Back';
import ExploreCard from '../components/ExploreCard';
import {useNavigate} from 'react-router-dom';
import {BsPlusLg} from 'react-icons/bs';
import Loader from '../components/Loader';

const Campaigns = () => {
  const { address, getCampaigns, contract, status } = useStateContext();

    const navigate = useNavigate();
    const [userCampaigns, setCampaigns] = React.useState([]);
    const [isCampaignsLoading, setIsCampaignsLoading] = React.useState(false);
    const fetchCampaigns = async () => {
    setIsCampaignsLoading(true);
    const res = await getCampaigns();
    const userCampaigns = res.filter(campaign => campaign.owner === address);

    
    setCampaigns(userCampaigns);
    setIsCampaignsLoading(false);
  }
   useEffect(() => {
    if(!address) navigate("/");
    if(status === "loading") setIsCampaignsLoading(true);
    if(status === "success") {setIsCampaignsLoading(false) ; fetchCampaigns()}
  }, [address, contract])
  return (
    <>
        <Back />

        <div className='container mx-auto h-[80vh] flex flex-col justify-evenly'>
        <h1 className='text-link   md:text-6xl sm:text-4xl text-center'>Campaigns</h1>
        <div className='flex flex-row gap-x-20 gap-y-10'  data-aos="fade-up">
        {
            isCampaignsLoading ? <Loader /> : userCampaigns && userCampaigns.map((campaign, index) => {
                return (
                    <ExploreCard key={index} campaign={campaign} />

                )
            })
        }
        <div onClick={() => navigate("/create")} className='flex justify-center h-96  outline-dashed outline-gray-500 cursor-pointer items-center ml-14 min-h-48 w-80'>
                <BsPlusLg className='text-5xl   text-gray-500' />
        </div>
        </div>
        </div>

    </>
  )
}

export default Campaigns