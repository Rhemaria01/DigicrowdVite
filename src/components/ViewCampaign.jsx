import React,{useState, useContext} from 'react'
import Loader from './Loader';
import {hexToEth} from '../utils/utils'
import { useLocation } from 'react-router'
import { useStateContext } from '../context';
import { ModalContext } from '../context/ModalContext';
import Modal from './Modal';
import Video from './Video';

const ViewCampaign = ({campaign,id}) => {
    const {address, receiveFunds, connect, balance} = useStateContext();
    const isCampaigner = campaign.owner === address
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const OpenModalContext = useContext(ModalContext);


    const target = hexToEth(campaign.target?._hex);
    const collected = hexToEth(campaign.amountCollected?._hex)
    const validate = () => {
        if(balance.data?.displayValue < amount){
            OpenModalContext.setMessage('Balance is low');
            OpenModalContext.setModalOpen(true);
            return false
        }
        else if(amount < 0.01){
            OpenModalContext.setMessage('Minimum donation is 0.01 ETH');
            OpenModalContext.setModalOpen(true);
            return false
        }
        else return true
    }
    const donate = async (e) => {
        e.preventDefault();

        const valid = validate()
        if(valid){
        if(!address) await connect();
        setLoading(true);
        await receiveFunds(id, amount);
        setLoading(false);
        OpenModalContext.setMessage(<h1 className='text-black font-bold text-xl'>Thank you for your Donation of {amount} ETH</h1>);
        OpenModalContext.setModalOpen(true);
        window.location.reload(false)
    }
      }
      const handleInput = (e) => {
        const {value} = e.target;
        
        if(!isNaN(value)) setAmount(value);
      }
  return (
<>
<div className='container mx-auto'>
    <div className={`flex  flex-row pt-20  justify-start items-start ${OpenModalContext.modalOpen && "blur-md"}`}>
        <div className='flex flex-row flex-wrap gap-x-10  w-2/4 ' data-aos="fade-right">
            {campaign.image.map((img, index) => {

                if(index%2 !== 0){
                    return img.includes('video')?
                    <Video source={campaign.image[index-1]} border={true}  width={80}/> :
                      <img src={campaign.image[index-1]} alt='exploreCard' className=' w-80 border-2 border-link  object-cover mt-5'/> 
                }
            })}
        </div>
            
        <div className='flex flex-col w-2/4' data-aos="fade-left">
            <h3 className="text-white font-bold text-4xl font-roboto">{campaign.title}</h3>
            <h6 className='text-white font-light text-lg mt-2 font-roboto'>Target: {target} Eth</h6>
            <h6 className='text-white font-light text-lg mt-2 font-roboto'>Collected: {collected} Eth</h6>
            
            <p className="text-white mt-5 text-xl">
            {campaign.description} <br/>
              {isCampaigner ? "Your Campaign" : "by "+ campaign.owner  }
            </p>
            <p className='text-gray-500 text-xl font-bold font-roboto mt-5'>Days Left: <em className='text-link text-3xl'>{Math.floor((campaign.deadline - new Date().getTime())/ (1000 * 3600 * 24))} </em></p>
            {!isCampaigner ? <div className='flex flex-col  justify-between w-72 items-center mt-5  rounded-lg'>
            <input type="text" className='w-72 h-11 rounded-lg bg-[#777777] pl-5 text-white outline-none' onChange={e => handleInput(e)} value={amount} placeholder='Enter Amount'/>
            {loading ? <div className='mt-2'>  <Loader /> </div> : <button className='bg-link text-white w-72  mt-2 rounded-lg h-11' onClick={e => donate(e)}>Donate</button>}
            </div> : <></>}
            </div> 
    </div>
    <div className='flex flex-col mb-10' data-aos="fade-right">
        <h1 className='text-white text-5xl font-roboto mt-5 mb-2'>List of Donaters</h1>
        <ul>
            {campaign.donators.length ===0 ? isCampaigner ? <li className='text-white font-roboto text-lg mt-2'> No Donations Yet :( </li> : <li className='text-white font-roboto text-lg mt-2'> Donate and become the first donator of the campaign</li> :
                campaign.donators.map((donator, index )=> {
                    return <li key={index} className='text-white font-roboto text-lg mt-2'>{donator} : {hexToEth(campaign.donations[index]._hex)} Eth</li>
                })
            }

        </ul>
    </div>
        </div>
    {OpenModalContext.modalOpen && <Modal/>}
    </>
  )
}

export default ViewCampaign