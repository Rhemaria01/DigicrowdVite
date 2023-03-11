import React,{useContext,useState} from 'react'
import { ModalContext } from '../context/ModalContext';
import { useStateContext } from '../context';
import MetamaskLogo from '../components/MetamaskLogo';
import {useNavigate, Link} from 'react-router-dom';
import {BsChevronDown} from 'react-icons/bs';
import Logo from '../assets/logo.svg'
import {MdOutlineCircle} from 'react-icons/md';

const Header = () => {
  const OpenModalContext = useContext(ModalContext);
  const { connect, address, disconnect, balance } = useStateContext();
  // console.log(address);
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setOpened(false);
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

    <div className="flex justify-between mt-5 container mx-auto items-center w-full  font-bold flex-row" >
            <Link to="/" className='Link' exact="true" ><img src={Logo} className="h-11 inline" alt='logo' /></Link>


            <ul className={`md:flex   md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 `}>
            <a className='Link ' href='/#explore'><p href='#' className='text-white  font-roboto text-lg cursor-pointer ml-22 mr-6'>Discover</p></a>
            <a   className='Link ' href="/#about-us"> <p className='text-white font-roboto text-lg cursor-pointer mx-6'>About</p></a>
            <button  className='Link ' onClick={(e) => handleCreate(e)}><p className='text-white font-roboto text-lg cursor-pointer mx-6'>Start a Project</p></button>
            {address && <button  className='Link ' onClick={(e) => navigate("/campaigns")}><p className='text-white font-roboto text-lg cursor-pointer mx-6'>View Your Projects</p></button>}
            </ul>

            {address  ?
              <>

            <div className='relative'>
            <div className='flex flex-row items-center outline shadow-lg shadow-slate-400 rounded-lg pl-3 pr-2 outline-4 outline-zinc-50'>
              <MetamaskLogo width='40' height='40' />
              <div className='flex flex-col items-center ml-3'>
                <p className='text-zinc-50 text-lg font-roboto font-bold '>{address.slice(0,6) + "..." + address.slice(-4)}</p>
                <p className='text-zinc-50 text-lg font-roboto font-bold'>  {balance.data && balance.data?.displayValue.slice(0,6) + " " + balance.data?.symbol}  </p>
              </div>
              <button className='text-zinc-50 text-3xl ml-3' onClick={() => setOpened(!opened)}><BsChevronDown /> </button>
            </div>
            <div className={`absolute w-full pt-1  ${!opened && "hidden"}   flex flex-col divide-y`}>
            <button className='text-zinc-50 text-start pl-3 text-lg font-roboto rounded-b-lg   font-bold bg-zinc-900 cursor-pointer py-2' onClick={handleLogout}>Disconnect</button>
            </div>
            </div>
            </>
             :
            <>

            <button onClick={() => connect()}  className='outline outline-white outline-2 text-xl cursor-pointer px-7 py-1 ml-4 text-white rounded-lg'  >
            <span className='flex flex-row items-center'><p className='mr-5 font-roboto'> Connect Wallet</p><MdOutlineCircle className='text-sm font-white shadow-white'/></span></button>
            </>
            }
            

    </div>

    
    </>
  )
}

export default Header