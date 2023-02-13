import React,{useState, useContext} from 'react'
import { UserContext } from '../context/UserContext';
import { ModalContext } from '../context/ModalContext';
import { useNavigate } from 'react-router';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import Logo from '../assets/logo.png'
import Back from '../components/Back';
import MetamaskLogo from '../components/MetamaskLogo';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import Modal from '../components/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateCampaign = () => {
    const context = useContext(UserContext);
    const OpenModalContext = useContext(ModalContext);
    const [loading, setLoading] = useState(false);
    const { createCampaign, uploadImage, connect, address, balance, disconnect } = useStateContext();
    const navigate = useNavigate();
    const [form, setForm] = useState({
      name: '',
      title: '',
      description: '',
      target: '',
      deadline: addDays(new Date(),1),
      image: '',
    });
    const [fileType, setFileType] = useState('');
    const handleFormFieldChange = (fieldName, e) => {

      if(fieldName === 'deadline'){
        setForm({
          ...form,[fieldName]: e});
      }
      else if(fieldName === 'image'){
        setFileType('')

        OpenModalContext.setMessage(<div className='flex flex-col text-center justify-center'>
          <p className='font-sans text-2xl  '>
          Are you sure you want to upload this file?
        </p>
        <p className='font-sans text-2xl '>
          This will be shown on your campaign page.
        </p>
        <div className='flex flex-row gap-x-10 justify-center'>
        <button className='bg-[#f31d1d] text-white font-sans text-2xl rounded-md px-4 py-2 mt-4 w-1/3' onClick={() => handleCancel()}>Cancel</button>
        <button className='bg-[#01af1e] text-white font-sans text-2xl rounded-md px-4 py-2 mt-4 w-1/3' onClick={() => handleSubmit(fieldName,e)}>Yes</button>
        </div>
        </div>);
        OpenModalContext.setModalOpen(true);

          
      }
      else{
        setForm({
          ...form,[fieldName]: e.target.value});
      }
    }
    const handleCancel = () => {
      setForm({
        ...form,image: ''});
      OpenModalContext.setModalOpen(false);
    }
    const handleSubmit = (fieldName,e) => {
      setForm({
        ...form,[fieldName]: e.target.files[0]});
        setFileType(e.target.files[0].type);
      OpenModalContext.setModalOpen(false);
    }
    const validateForm = async (form) => {
      if(form.name === '' || form.title === '' || form.description === '' || form.target === '' || form.deadline === '' || form.image === ''){
        OpenModalContext.setMessage(<div className='flex flex-col text-center justify-center'>
          <p className='font-sans text-2xl  '>
          Please fill out all the fields.
        </p>
        </div>);
        OpenModalContext.setModalOpen(true);
        return false;
      }
      else if(form.target < 0){
        OpenModalContext.setMessage(<div className='flex flex-col text-center justify-center'>
          <p className='font-sans text-2xl  '>
          Target amount cannot be negative.
        </p>
        </div>);
        OpenModalContext.setModalOpen(true);
        return false;
      }
      else if(isNaN(form.target)){
        OpenModalContext.setMessage(<div className='flex flex-col text-center justify-center'>
          <p className='font-sans text-2xl  '>
          Target amount must be a number.
        </p>
        </div>);
        OpenModalContext.setModalOpen(true);
        return false;
      }
      else if(form.deadline < new Date()){
        OpenModalContext.setMessage(<div className='flex flex-col text-center justify-center'>
          <p className='font-sans text-2xl  '>
          Deadline cannot be in the past.
        </p>
        </div>);
        OpenModalContext.setModalOpen(true);
        return false;
      }

      else{
        return true;
      }
    }

    const submitCampaign = async (e) => {
      e.preventDefault();
        if(!address){
          OpenModalContext.setMessage(<div className='flex flex-col text-center justify-center'>
            <p className='font-sans text-2xl  '>
            You need to connect your wallet to create a campaign.
          </p>
          <p className='font-sans text-2xl '>
            Click on the Metamask logo to connect.
          </p>
          </div>);
          OpenModalContext.setModalOpen(true);
          return;
        }
        const valid = await validateForm(form);
        if(valid){
          setLoading(true);
        const data = await uploadImage(form.image);       
          await createCampaign({...form,image: data[0], target: ethers.utils.parseUnits(form.target,18)._hex});
          setLoading(false);
          navigate('/campaigns');
        }

        


      
    }
    const auto_grow = (element) => {
      element.target.style.height = 115 + "px";
      element.target.style.height = (element.target.scrollHeight) + "px";
  }
  
  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
  
    return date;
  }
  function addDays(date, days) {
    date.setDate(date.getDate() + days);
  
    return date;
  }
  const handleLogout = () => {
    disconnect();
    navigate('/');
  }
  
  return (
    <>
    <div className= {`container flex flex-col  items-center justify-center font-sans ${OpenModalContext.modalOpen && "blur-md"}`}>
    <Back />
    <div className="absolute top-[40%] right-[45%]">
    <MetamaskLogo width={150} height={150}/>
    </div>
    <div className='flex flex-row items-center justify-center '>
    <img src={Logo} alt="logo" data-aos="fade-down" onClick={() => navigate} className='h-36' />
    {address   ?
            <div className='flex flex-row items-center'>
            <span className='flex flex-row items-center gap-x-4'>
            {/* <MetamaskLogo width={45} height={45}/> */}
            <p className='text-zinc-50 text-2xl font-bold'>{balance.data && balance.data?.displayValue.slice(0,5) + " " + balance.data?.symbol} </p>
            </span>
            <button className='text-zinc-50 ml-10 bg-link font-sans text-lg font-extrabold px-7 py-2 rounded-full' onClick={handleLogout}>Log Out</button>
            </div>
             :
             <button onClick={() => connect()}  className='outline outline-zinc-50 text-xl   cursor-pointer px-7 py-1 ml-4 text-zinc-50 rounded-full'  >
            <span className='flex flex-row items-center'><p className='mr-5'> Login With Metamask </p><MetamaskLogo height={45} width={45}/></span></button>
            }
    </div>
    <div data-aos="fade-right" className='flex flex-row mt-10 justify-start'>
    <span className='text-link text-4xl'>Welcome</span>
    </div>
    <div className=' mt-10 w-[75vw] mb-48  grid grid-cols-2 place-items-center gap-y-7 gap-x-10'>
            <span data-aos="fade-right" className='w-3/4 flex flex-col gap-y-1'>
            <label htmlFor="owner"  className='text-link text-xl'>Name</label>
            <input type="text" placeholder="Owner" id='owner' className='h-10 pl-2 outline-none' value={form.name} onChange={(e) => handleFormFieldChange('name', e)} />
            </span>
            <span data-aos="fade-left" className='w-3/4 flex flex-col gap-y-1'>
            <label htmlFor="title" className='text-link text-xl'>Title</label>
            <input type="text" placeholder="Title" id="title" className='h-10 pl-2 outline-none' value={form.title} onChange={(e) => handleFormFieldChange('title', e)} />
            </span>
            <span data-aos="fade-right" className='w-3/4 flex self-start   flex-col gap-y-1'>
            <label htmlFor="description" className='text-link text-xl'>Description</label>
            <textarea placeholder="Description" id="description" className='h-28 pl-2 outline-none' onInput={(element) => auto_grow(element)} value={form.description} onChange={(e) => handleFormFieldChange('description', e)} />
            </span>
            <div className='justify-self-center self-start w-3/4 '>
            <span  data-aos="fade-left" className='mb-10 flex flex-col gap-y-1'>
            <label htmlFor="amount" className='text-link text-xl'>Target</label>
            <input type="text" placeholder="Amount" id="amount" className='h-10 pl-2 outline-none' value={form.target} onChange={(e) => handleFormFieldChange('target', e)} />
            </span>
            
            <span data-aos="fade-left" className='flex flex-col gap-y-1'>
            <label htmlFor="image" className='text-link text-xl'>Upload Image/Video</label>
            <input type="file"
            onChange={(e) => handleFormFieldChange('image', e)}
            accept="image/*,video/*"
             className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-gray-50 file:text-gray-800
      hover:file:bg-gray-100
      outline-none
    "/>
            </span>

            {
              fileType === "" ? <div></div> : 
              fileType.includes("image") ? <img src={URL.createObjectURL(form.image)} alt="image" className='h-48 w-full mt-2'/> : 
              fileType.includes("video") ? <video controls  src={URL.createObjectURL(form.image)} alt="video" className='h-48 mt-2'/> : <div></div>
            }
            <span data-aos="fade-right" className='mb-10  flex flex-col gap-y-1 mt-2'>
            <label htmlFor="date" className='text-link text-xl'>End Date</label>
            
            <DatePicker
      selected={form.deadline}
      showIcon
      
      onChange={(e) => handleFormFieldChange('deadline', e)}
      minDate={addDays(new Date(),1)}
      maxDate={addMonths(new Date(), 6)}
      showDisabledMonthNavigation
      className=' h-10 pl-2 outline-none'
    />

            </span>
            </div>
            {loading? <AiOutlineLoading3Quarters className='animate-spin h-10 w-10 col-span-2   place-self-center  text-white'/>:
              <button  onClick={e=>submitCampaign(e)} className={` bg-link text-zinc-50 col-span-2   place-self-center rounded-lg text-xl py-3 h-12 w-1/2 `}>Create</button>}
    </div>
    </div>
    {OpenModalContext.modalOpen && <Modal/>}
            </>
  )
}

export default CreateCampaign