import React,{useState,useEffect} from 'react'

import Back from '../components/Back'
import Loader from '../components/Loader'
import { useStateContext } from '../context';

import { useParams } from 'react-router'
import ViewCampaign from '../components/ViewCampaign';
const Donate = () => {
    const {id} = useParams();
    const {address, contract, getCampaign,  status} = useStateContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [changed, setChanged] = useState(false);
    const fetchCampaign = async () => {
        setLoading(true);
        const res = await getCampaign(id);
        setData(res);
        setLoading(false);
    }

    useEffect(() => {
      setChanged(false);
      if(status === "loading") setLoading(true);
      if(status === "success") {setLoading(false); fetchCampaign()}

    }, [address, contract, changed])

    

  return (
    <>
        <Back />
        {
            loading? <div className='container mx-auto h-[80vh] flex flex-col justify-evenly'><Loader /></div>: <ViewCampaign campaign={data} id={id} setChanged={setChanged}/>
        }
        
            
        
    </>
  )
}

export default Donate