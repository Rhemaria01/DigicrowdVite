import React,{useState, useContext, useEffect} from 'react'
import Loader from './Loader';
import {hexToEth} from '../utils/utils'
import { useContract, useContractRead, useContractWrite } from '@thirdweb-dev/react';
import { useStateContext } from '../context';
import { ModalContext } from '../context/ModalContext';
import Modal from './Modal';
import Video from './Video';

const ViewCampaign = ({campaign,id,setChanged}) => {
    const {address, receiveFunds, connect, balance, sendTokens} = useStateContext();
    const {contract: erc20Contract, status: erc20status} = useContract(campaign.token,"token");
    const {mutateAsync: symbol} = useContractWrite(erc20Contract, "symbol");
    
    
    const isCampaigner = campaign.owner === address
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const OpenModalContext = useContext(ModalContext);


    const target = hexToEth(campaign.target?._hex);
    const collected = hexToEth(campaign.amountCollected?._hex)
    const validate = () => {
        if(erc20status === "success"){
            const userBalance = parseFloat(tokenInfo.res.displayValue )
            if(userBalance < amount){
            OpenModalContext.setMessage('Balance is low');
            OpenModalContext.setModalOpen(true);
            return false
            }
            else if (amount > target - collected){
                OpenModalContext.setMessage(`Maximum donation for this campaign is ${target - collected}`);
                OpenModalContext.setModalOpen(true);
                return false
            }
            else return true


        }
        else{
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
        else if (amount > target - collected){
            OpenModalContext.setMessage(`Maximum donation for this campaign is ${target - collected}`);
            OpenModalContext.setModalOpen(true);
            return false
        }
        else return true
    }
    }
    const [tokenInfo, setTokenInfo] = useState({});
    const [currency, setCurrency] = useState("ETH");
        const donate = async (e) => {
        e.preventDefault();

        const valid = validate()
        if(valid){
        if(!address) await connect();
        setLoading(true);
        erc20status === "success" ? await sendTokens(erc20Contract,campaign.token,id, amount) :
        await receiveFunds(id, amount);
        setLoading(false);
        OpenModalContext.setMessage(<h1 className='text-black font-bold text-xl'>Thank you for your Donation of {amount} {currency}</h1>);
        OpenModalContext.setModalOpen(true);
        setAmount(0);
        setChanged(true);
    }
      }
      const handleInput = (e) => {
        const {value} = e.target;
        
        if(!isNaN(value)) setAmount(value);
      }
        
        useEffect(() => {
            if(erc20status !== "success"){
                setLoading(true);
            }
            else{
                setLoading(false);
                symbol().then(res => {
                    setCurrency(res)
                })
                erc20Contract.balanceOf(address).then(res => {
                    setTokenInfo({
                        res
                    })
                    OpenModalContext.setMessage(`This Campaign only accepts ${res.name}. Make sure you have enough balance in your wallet to donate.`);
                    OpenModalContext.setModalOpen(true);
                })
                
            }
        }, [erc20status])
  return (
<>
<div className='container mx-auto'>
    <div className={`flex  flex-row pt-20  justify-start items-start ${OpenModalContext.modalOpen && "blur-md"}`}>
        <div className='flex flex-row flex-wrap gap-x-10  w-2/4 ' >
            {campaign.image.map((img, index) => {

                if(index%2 !== 0){
                    return img.includes('video')?
                    <Video source={campaign.image[index-1]} border={true}  width={80} key={index-1}/> :
                    <a href={campaign.image[index-1]} target="_blank" key={index-1} ><img src={campaign.image[index-1]} alt='exploreCard' className=' w-80 border-2 border-link  object-cover mt-5'/>  </a>
                }
            })}
        </div>
            
        <div className='flex flex-col w-2/4' >
            <h3 className="text-white font-bold text-4xl font-roboto">{campaign.title}</h3>
            {Object.keys(tokenInfo).length > 0 && <> 
            
            <h6 className='text-link font-light text-md mt-2 font-roboto'>Your Token Balance: {tokenInfo.res.displayValue} {tokenInfo.res.symbol}</h6>
            </>}
            <h6 className='text-white font-light text-lg mt-2 font-roboto'>Target: {target} {currency} </h6>
            <h6 className='text-white font-light text-lg mt-2 font-roboto'>Collected: {collected} {currency}</h6>
            
            <p className="text-white mt-5 text-xl">
            {campaign.description} <br/>
              {isCampaigner ? "Your Campaign" : "by "+ campaign.owner  }
            </p>
            <p className='text-gray-500 text-xl font-bold font-roboto mt-5'>Days Left: <em className='text-link text-3xl'>{Math.floor((campaign.deadline - new Date().getTime())/ (1000 * 3600 * 24))} </em></p>
            {!isCampaigner ? <div className='flex flex-col  justify-between w-72 items-center mt-5  rounded-lg'>
            
            <input type="text" className='w-72 h-11 rounded-lg bg-[#777777] pl-5 text-white outline-none' onChange={e => handleInput(e)} value={amount} placeholder={`Enter Amount in (${currency})`}/>
            {loading ? <div className='mt-2'>  <Loader /> </div> : <button className='bg-link text-white w-72  mt-2 rounded-lg h-11' onClick={e => donate(e)}>Donate</button>}
            </div> : <></>}
            </div> 
    </div>
    <div className={`flex flex-col mb-10 ${OpenModalContext.modalOpen && "blur-md"}`} >
        <h1 className='text-white text-5xl font-roboto mt-5 mb-2'>List of Donaters</h1>
        <ul>
            {campaign.donators.length ===0 ? isCampaigner ? <li className='text-white font-roboto text-lg mt-2'> No Donations Yet :( </li> : <li className='text-white font-roboto text-lg mt-2'> Donate and become the first donator of the campaign</li> :
                campaign.donators.map((donator, index )=> {
                    return <li key={index} className='text-white font-roboto text-lg mt-2'>{donator} : {hexToEth(campaign.donations[index]._hex)} {currency}</li>
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