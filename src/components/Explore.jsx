import React,{ useState, useEffect} from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import Loader from './Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
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
      <div className='container mx-auto mt-20' data-aos="fade-up" id="explore">
        <h1 className='text-white font-roboto font-extrabold  md:text-6xl sm:text-4xl text-left mb-20'>Our Recent <em className='text-link extrabold font-roboto'>Campaigns</em></h1>
        {
        isCampaignsLoading ? <div className='flex justify-center h-[30rem]'><Loader /></div> :
        <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={15}
      slidesPerView={3}
      navigation={{ clickable: true}}
      pagination={{ clickable: true }}
      autoplay={{ delay: 1500, disableOnInteraction: false,waitForTransition: false }}
      className='h-[30rem]'
      
      >
       {campaigns.map((campaign, index) => {
          return (
            <SwiperSlide key={index}>
              <ExploreCard  campaign={campaign} index={index} />
            </SwiperSlide>
          )
        })}
        </Swiper>
      }
        
    </div>
  )
}

export default Explore