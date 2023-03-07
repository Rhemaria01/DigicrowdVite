import React,{useRef,useState} from 'react'
import {BsFillPlayFill} from 'react-icons/bs'

const Video = ({source,border, width=64}) => {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false);
  return (
    <div className='relative'>
    <video  src={source} ref={videoRef} loop={true} controls={playing} onPause={() => setPlaying(false)}  alt="video" className={`aspect-video w-${width}  mt-2 ${border && "border-2 border-link"}`}/>
    
    <button 
    onClick={()=>{videoRef.current.play(); setPlaying(true)}} 
    className={`absolute top-[35%]  transform  -translate-y-1/2 w-full h-full  ${playing && "hidden"}`}> 
    <BsFillPlayFill className='text-5xl absolute left-1/2  -translate-x-1/2   text-white'/>
    </button>


    </div>
  )
}

export default Video