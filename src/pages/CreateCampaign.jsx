import React,{useState, useContext, useCallback} from 'react'

import { ModalContext } from '../context/ModalContext';
import { useNavigate } from 'react-router';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import {useDropzone} from 'react-dropzone'

import Create from "../assets/create.svg";
import Arrow1 from "../assets/Arrow/vector.svg";
import Arrow2 from "../assets/Arrow/vector-1.svg";
import Arrow3 from "../assets/Arrow/vector-2.svg";

import Mic1 from "../assets/Mic/vector-2.svg";
import Mic2 from "../assets/Mic/vector-1.svg";
import Mic3 from "../assets/Mic/vector-3.svg";


import Back from '../components/Back';
import Loader from '../components/Loader';
import Modal from '../components/Modal'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Rocket.css";
const CreateCampaign = () => {

    const OpenModalContext = useContext(ModalContext);
    const [loading, setLoading] = useState(false);
    const { createCampaign, uploadImage, address,} = useStateContext();
    
    const navigate = useNavigate();
    const [form, setForm] = useState({
      name: '',
      title: '',
      description: '',
      target: '',
      deadline: addDays(new Date(),1),
      image: []
    });

    const handleFormFieldChange = (fieldName, e) => {

      if(fieldName === 'deadline'){
        setForm({
          ...form,[fieldName]: e});
      }

      else{
        setForm({
          ...form,[fieldName]: e.target.value});
      }
    }



    const handleSubmit = (fieldName,e) => {
      setForm({
        ...form,[fieldName]: e.target.files[0]});
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
          const files =  await Promise.all(form.image.map(async (file) => {
            const url = await uploadImage(file.file);
            return [url[0],file.type];
          }));
          console.log('files',files.flat());
          
          
          await createCampaign({...form,image: files.flat(), target: ethers.utils.parseUnits(form.target,18)._hex});
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


    const onDrop = useCallback(acceptedFiles => {

      // Do something with the files
      console.log(acceptedFiles);
      OpenModalContext.setMessage(<div className='flex flex-col text-center justify-center'>
      <p className='font-sans text-2xl  '>
      Are you sure you want to upload these files?
    </p>
    <p className='font-sans text-2xl '>
      This will be shown on your campaign page.
    </p>
    <div className='flex flex-row gap-x-10 justify-center'>
    <button className='bg-[#f31d1d] text-white font-sans text-2xl rounded-md px-4 py-2 mt-4 w-1/3' onClick={() => OpenModalContext.setModalOpen(false)}>Cancel</button>
    <button className='bg-[#01af1e] text-white font-sans text-2xl rounded-md px-4 py-2 mt-4 w-1/3' onClick={() => handleImage(acceptedFiles)}>Yes</button>
    </div>
    </div>)
    OpenModalContext.setModalOpen(true);
    }, [])

    const handleImage = (files) => {
      const temp = [...form.image];
      files.forEach((file) => {
        temp.push({
          file: file,
          preview: URL.createObjectURL(file),
          type: file.type,
        });
      })
      setForm({
        ...form,image: [...temp]
      });
      OpenModalContext.setModalOpen(false);
    }
  
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
  return (
    <>
    <div className= {`container mx-auto flex flex-col   font-sans ${OpenModalContext.modalOpen && "blur-md"}`}>
    <Back />


    <div className='mt-10 min-h-[57.625rem] bg-neutral-700 rounded-3xl  grid grid-cols-5  gap-x-1 gap-y-7'>
    <div className='bg-[#81cb07e6] w-[30.25rem] h-[54.788rem] flex flex-col  col-span-2 place-self-center rounded-3xl'>
    <h1 className='text-[#4BA23C] absolute mt-10 ml-10 text-5xl w-1/5 font-extrabold'>Create </h1>
    <h1 className='text-[#4BA23C] absolute mt-20 ml-10 text-5xl w-1/5 font-extrabold'>Campaign </h1>
    <div className="absolute">
      <img src={Create} alt="create" className='w-[30.25rem] h-[54.788rem] rounded-3xl'/>
      <img src={Arrow1} alt="arrow" className='arrow absolute left-[80.67%] right-[17.06%] top-[37.37%] bottom-[50.13%]'/>
      <img src={Arrow2} alt="arrow" className='arrow absolute left-[80.67%] right-[17.06%] top-[39.00%] bottom-[50.13%]'/>
      <img src={Arrow3} alt="arrow" className='arrow absolute left-[71.67%] right-[17.06%] top-[37.86%] bottom-[50.13%]'/>
      <img src={Mic1} alt="mic" className='mic1 absolute left-[80.67%] right-[17.06%] top-[51.87%] h-[60.91px] bottom-[50.13%]'/>
      <img src={Mic2} alt="mic" className='mic absolute left-[65.67%] right-[17.06%] top-[52.50%] w-[75.7px] h-[60.91px] bottom-[50.13%]'/>
      {/* <img src={Mic3} alt="mic" className='mic1 absolute left-[67.67%] right-[17.06%] top-[54.36%] h-[4.32px] w-[17.05px] bottom-[50.13%]'/> */}
      </div>
    </div>
    <div className='col-span-3 flex flex-col justify-center items-start'>
    <span className='col-span-2'>
    <h1 className='font-roboto text-white  text-4xl'>Your <em className='text-link font-roboto'> Campaign Wizard</em></h1>
    <p className='text-[#878787] text-xl font-normal text-left font-roboto w-4/5'>Start your journey of creating amazing campaigns with just these simple steps</p>
    </span>
            <span data-aos="fade-right" className='w-[48.25rem] flex flex-col mt-10 gap-y-4'>
            <label htmlFor="owner"  className='text-white font-roboto  text-xl'>Campaign Name</label>
            <input type="text" placeholder="My new campaign" id='owner' className='h-10 pl-2 text-[#878787] bg-[#1E1E1E] rounded-lg outline-none' value={form.name} onChange={(e) => handleFormFieldChange('name', e)} />
            </span>
            <div className='flex flex-row w-full justify-start gap-x-36' >
            <span  data-aos="fade-left" className='w-64 mb-10 flex flex-col mt-5 gap-y-1'>
            <label htmlFor="amount" className='text-white font-roboto  text-xl'>Amount</label>
            <input type="text" placeholder="Amount" id="amount" className='h-10 pl-2 text-[#878787] bg-[#1E1E1E] rounded-lg outline-none' value={form.target} onChange={(e) => handleFormFieldChange('target', e)} />
            </span>
            <span data-aos="fade-right" className='w-64 mb-10 mt-5  flex flex-col gap-y-1 '>
            <label htmlFor="date" className='text-white font-roboto  text-xl'>End Date</label>
            
            <DatePicker
      selected={form.deadline}
      showIcon

      onChange={(e) => handleFormFieldChange('deadline', e)}
      minDate={addDays(new Date(),1)}
      maxDate={addMonths(new Date(), 6)}
      showDisabledMonthNavigation
      className=' h-10 pl-2 outline-none text-[#878787] bg-[#1E1E1E] rounded-lg'
    />

            </span>
            </div>
            <span data-aos="fade-right" className='w-[48.25rem] flex flex-col gap-y-4'>
            <label htmlFor="description" className='text-white font-roboto  text-xl'>About your campaign</label>
            <textarea placeholder="Give a description about your campaign" id="description" className='h-36 pl-2 text-[#878787] bg-[#1E1E1E] rounded-lg outline-none' value={form.description} onChange={(e) => handleFormFieldChange('description', e)} />
            </span>

            
            <span data-aos="fade-left" className='flex flex-col gap-y-4 mt-5'>
            <label htmlFor="dropzone" className='text-white font-roboto  text-xl'>Upload Image/Video </label>
            
    <div {...getRootProps()}>
      <input {...getInputProps()} accept="image/*,video/*"/>
      {
        isDragActive ?
        <span data-aos="fade-right" className='w-[48.25rem] flex flex-col gap-y-4'>
            <div id="dropzone" className='h-36 flex justify-center items-center text-[#878787] bg-[#1E1E1E] rounded-lg  outline-dashed'>
            <p className='text-[#878787] font-roboto text-xl'>Drop the files here ...</p>
            </div>
            </span>
 :
 <span data-aos="fade-right" className='w-[48.25rem] flex flex-col gap-y-4'>
            <div id="dropzone" className='h-36 flex justify-center items-center  bg-[#1E1E1E] rounded-lg outline-none'>
            <p className='text-[#878787] font-roboto text-xl'>Drag 'n' Drop your images or videos here, or click here</p>
            </div>
            </span>
      }
    </div>
            </span>
            <div className='flex flex-row gap-x-10'>
            {
              form.image.length > 0 && form.image.map((file, index) => {
                return(
                  <div key={index} className='flex flex-col gap-y-1'>
{                  file.type.includes("image") ? <img src={file.preview} alt="image" className='h-56 w-56 object-scale-down mt-2'/> :
                file.type.includes("video") ? <video controls  src={file.preview} alt="video" className='h-56 w-56 mt-2'/> : <div></div>}
                  </div>
                )
              })
            }
            </div>

            {loading? <Loader /> : 
              <button  onClick={e=>submitCampaign(e)} className={` bg-link text-zinc-50 col-span-2   place-self-center rounded-lg text-xl py-3 h-12 w-1/2 `}>Create</button>}
            </div>
    </div>
    </div>
    {OpenModalContext.modalOpen && <Modal/>}
            </>
  )
}

export default CreateCampaign