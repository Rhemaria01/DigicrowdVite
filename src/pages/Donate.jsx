import React,{useState,useEffect} from 'react'
import Header from '../layout/Header'
import Back from '../components/Back'
import Loader from '../components/Loader'
import { useStateContext } from '../context';
import { useParams } from 'react-router'
const Donate = () => {
    const {id} = useParams();
    const {address, contract, getCampaign, receiveFunds} = useStateContext();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const fetchCampaign = async () => {
        setLoading(true);
        const res = await getCampaign(id);
        setData(res);
        setLoading(false);
    }

    useEffect(() => {
       fetchCampaign();
    }, [address, contract])

    const donate = async () => {
      const transactionParameters = {
        nonce: '0x00', // ignored by MetaMask
        to: address, // Required except during contract publications.
        from: ethereum.selectedAddress, // must match user's active address.
        value: (amount*1e8).toString(), // Only required to send ether to the recipient from the initiating external account.
        chainId: 5, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
      };
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      receiveFunds(id);
    }


  return (
    <>
        <Back />
        <Header />
        <h1 className='text-link   md:text-6xl sm:text-4xl text-center'>Donate</h1>
        <div className='container mx-auto h-[80vh] flex flex-col justify-evenly'>
        {
            loading? <Loader />: <div className='flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-link'>Donate to {data?.title}</h1>
                <p className='text-2xl text-link'>Donate to {data?.title} to help them achieve their goal</p>
                <input type="number" onChange={(e) => setAmount(e.target.value) } className='outline-none rounded-md p-2 w-[20rem] text-center text-2xl' placeholder='Enter Amount' />
                <button onClick={donate} className='bg-link text-white p-2 rounded-md'>Donate</button>
        </div>
        }
        
            
        </div>
    </>
  )
}

export default Donate