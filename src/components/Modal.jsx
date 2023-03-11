import React,{useContext} from 'react'
import { ModalContext } from '../context/ModalContext';
const Modal = () => {
    const OpenModalContext = useContext(ModalContext);

  return (
    <div className={`absolute z-50 top-[17rem] right-[45rem] ${!OpenModalContext.modalOpen && "blur-0"}`}>
        <div className='bg-white  w-96 h-96 rounded-2xl flex flex-col items-center justify-center '>
            <p className='font-bold text-black text-center text-2xl ml-2 w-80'>{OpenModalContext.message}</p>
            <button onClick={()=>OpenModalContext.setModalOpen(false)} className='bg-link  text-white font-bold text-2xl px-4 py-2 rounded-full mt-10'>X</button>
        </div>
    </div>
  )
}

export default Modal