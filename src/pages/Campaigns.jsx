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
    const [indexes, setIndexes] = React.useState([]);
    const fetchCampaigns = async () => {
    setIsCampaignsLoading(true);
    const res = await getCampaigns();
    const userIndexes = [];
     res.filter((element,index) => element.owner === address ?  userIndexes.push(index) : null) ;
     const userCampaigns = userIndexes.map(index => res[index]);
    setIndexes(userIndexes);
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

        <div className='container mx-auto '>
        <h1 className='text-link   md:text-6xl sm:text-4xl text-center mt-10'>Campaigns</h1>
        <div className='flex flex-row flex-wrap  gap-y-10 mt-40'  data-aos="fade-up">
        {
            isCampaignsLoading ? <Loader /> : userCampaigns && userCampaigns.map((campaign, index) => {
                return (
                    <ExploreCard key={index} campaign={campaign} index={indexes[index]}/>

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