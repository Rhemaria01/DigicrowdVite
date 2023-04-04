import React,{ useState, useEffect} from 'react';
import Loader from './Loader';
import { useStateContext } from '../context';
// import erc20 from "../ercEBI.json"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import ExploreCard from "./ExploreCard";

const Explore = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isCampaignsLoading, setIsCampaignsLoading] = useState(false);
  const { address, contract, getCampaigns, status } = useStateContext();

  const fetchCampaigns = async () => {

    setIsCampaignsLoading(true);
    const res = await getCampaigns();
    setCampaigns(res);
    setIsCampaignsLoading(false);
  }

  useEffect(() => {

    if(status === "loading") setIsCampaignsLoading(true);
    if(status === "success") {setIsCampaignsLoading(false) ; fetchCampaigns()}
    

  }, [address, contract, status])

  return (
      <div className='container mx-auto mt-20'  id="explore">
        <h1 className='text-white font-roboto font-extrabold  md:text-6xl sm:text-4xl text-left mb-20' data-aos="fade-up">Our Recent <em className='text-link extrabold font-roboto'>Campaigns</em></h1>
        {
        isCampaignsLoading ? <div className='flex justify-center h-[30rem]'><Loader /></div> :
        <div className='flex flex-row' >

       {  campaigns.slice(0).reverse().map((campaign, index) => {
              if(index>3) return 
              else return <ExploreCard key={campaigns.length-1-index}  campaign={campaign} index={campaigns.length-1-index} />
        })

        }
      </div>
      }
        
    </div>
  )
}

export default Explore