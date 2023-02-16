import React,{useState,useEffect} from 'react'
import Header from '../layout/Header'
import Back from '../components/Back'
import Loader from '../components/Loader'
import { useStateContext } from '../context';
import { ethers } from 'ethers';
import { useParams } from 'react-router'
const Donate = () => {
    const {id} = useParams();
    const {address, contract, getCampaign, receiveFunds, connect, status} = useStateContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const fetchCampaign = async () => {
        setLoading(true);
        const res = await getCampaign(id);
        if(res.owner === address) return window.location.replace(`/campaign/${id}`);
        setData(res);
        setLoading(false);
    }

    useEffect(() => {
      if(status === "loading") setLoading(true);
      if(status === "success") {setLoading(false); fetchCampaign()}

    }, [address, contract])

    const donate = async () => {
      if(!address) await connect();
      setLoading(true);
      await receiveFunds(id, amount);
      setLoading(false);
    }
    const handleInput = (e) => {
      const {value} = e.target;
      
      if(!isNaN(value)) setAmount(value);
    }

  return (
    <>
        <Back />
        <h1 className='text-link   md:text-6xl sm:text-4xl text-center'>Donate</h1>
        <div className='container mx-auto h-[80vh] flex flex-col justify-evenly'>
        {
            loading? <Loader />: <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-link'>Donate to {data?.title}</h1>
                <p className='text-2xl text-link'>Donate to {data?.title} to help them achieve their goal</p>
                <input type="text"  onChange={(e) => handleInput(e) } value={amount} className='outline-none rounded-md p-2 w-[20rem] text-center text-2xl' placeholder='Enter Amount' />
                <button onClick={donate} className='bg-link text-white p-2 rounded-md'>Donate</button>
        </div>
        }
        
            
        </div>
    </>
  )
}

export default Donate