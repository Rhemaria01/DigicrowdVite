import React,{useContext,useState} from 'react'
import { ModalContext } from '../context/ModalContext';
import { useStateContext } from '../context';
import {useNavigate, Link} from 'react-router-dom';
import Logo from '../assets/logo.png'

import SearchGlass from '../assets/search-glass.png'
import {FaPlus} from "react-icons/fa"
import {ethers} from 'ethers'
import MetamaskLogo from '../components/MetamaskLogo';

const Header = () => {
  const OpenModalContext = useContext(ModalContext);
  const { connect, address, disconnect, balance } = useStateContext();
  // console.log(address);
  
  const navigate = useNavigate();
  const handleLogout = () => {
    disconnect();
    navigate('/');
  }
  
  const handleCreate = (e) => {
    e.preventDefault();
    if(address){
      navigate('/create');
    }
    else{
      OpenModalContext.setMessage('Please connect to metamask to create a campaign');
      OpenModalContext.setModalOpen(true);
    }
  }
 

  return (
    <>

    <div className="flex justify-between  items-center w-full font-['Open_Sans'] font-bold flex-row">
            <Link to="/" className='Link' exact="true" ><img src={Logo} className="h-28 inline" alt='logo' /></Link>


            <ul className={`md:flex   md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 `}>
            <a className='Link ' href='/#explore'><p href='#' className='text-link text-2xl cursor-pointer ml-22 mr-6'>Explore</p></a>
            <a  className='Link ' href="/#how-it-works"><p className='text-link text-2xl cursor-pointer mx-6'>How it Works?</p></a>
            <a   className='Link ' href="/#about-us"> <p className='text-link text-2xl cursor-pointer mx-6'>About us</p></a>
            </ul>

            {address  ?
            <div className='flex flex-row items-center'>
            <span className='flex flex-row items-center gap-x-4'>
            <p className='text-zinc-50 text-2xl font-bold'>  {balance.data && balance.data?.displayValue.slice(0,5) + " " + balance.data?.symbol}  </p>
            </span>
            <button className='text-zinc-50 ml-10 bg-link font-sans text-lg font-extrabold px-7 py-2 rounded-full' onClick={handleLogout}>Log Out</button>
            </div>
             :
            <>

            <button onClick={() => connect()}  className='outline outline-zinc-50 text-xl   cursor-pointer px-7 py-1 ml-4 text-zinc-50 rounded-full'  >
            <span className='flex flex-row items-center'><p className='mr-5'> Login With Metamask </p><MetamaskLogo height={45} width={45}/></span></button>
            </>
            }
            

    </div>
    <form className='w-full'>
      <div className="flex items-center  mb-3">
        <img src={SearchGlass} className="relative left-[4rem]  h-9" alt='search-glass' />
        <input type="text" className="w-[80%] rounded-full h-12 pl-20 outline-none text-[#777777]" placeholder="Search Project" />
        {
          address ?
        <button onClick={() => navigate("/campaigns")} className='text-zinc-50 ml-10 bg-link font-sans text-lg font-extrabold px-4 py-2 rounded-full'><span className='flex flex-row gap-5  items-center'>View Your Campaigns</span></button>
          
          :<button onClick={e => handleCreate(e)} className='text-zinc-50 ml-10 bg-link font-sans text-lg font-extrabold px-4 py-2 rounded-full'><span className='flex flex-row gap-5  items-center'><FaPlus className='h-5'/>Create Campaign</span></button>
        }
      </div>
    </form>
    
    </>
  )
}

export default Header