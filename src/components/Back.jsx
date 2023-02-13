import React,{} from 'react'
import { useNavigate } from 'react-router'
import {IoChevronBackSharp} from 'react-icons/io5'
const Back = () => {
    const navigate = useNavigate()
  return (
    <div data-aos="fade-right" className='absolute top-12 left-12'>
        <button onClick={() => navigate(-1)}><IoChevronBackSharp className='text-5xl text-zinc-50'/></button>
    </div>
  )
}

export default Back