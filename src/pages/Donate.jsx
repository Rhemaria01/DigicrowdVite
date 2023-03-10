import React,{useState,useEffect} from 'react'

import Back from '../components/Back'
import Loader from '../components/Loader'
import { useStateContext } from '../context';
import { useContract, useTransferToken } from '@thirdweb-dev/react';

import { useParams } from 'react-router'
import ViewCampaign from '../components/ViewCampaign';
const Donate = () => {
    const {id} = useParams();
    const {contract: erc20Contract} = useContract("0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc","token");
    const {
      mutate: transferTokens,
      isLoading,
      error,
    } = useTransferToken(erc20Contract);
    console.log('contract', erc20Contract);
    const {address, contract, getCampaign,  status, sendTokens} = useStateContext();
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
        <button className='h-98 text-white' onClick={() => sendTokens(erc20Contract,id, 10)}>Donate</button>
        {
            loading ? <div className='container mx-auto h-[80vh] flex flex-col justify-evenly'><Loader /></div>: <ViewCampaign campaign={data} id={id} setChanged={setChanged}/>
        }
        
            
        
    </>
  )
}

export default Donate