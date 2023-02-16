import React from 'react'

import Shubham from '../assets/shubham.svg';
import Reenav from '../assets/reenav.svg';
import Atiq from '../assets/atiq.svg';

const AboutUs = () => {
    const team = [
        {
            name: 'Reenav Hemaria',
            image: Reenav,
            role: 'Frontend Developer',
            aos: "fade-right"
        },{
            name: 'Shubham Naik',
            image: Shubham,
            role: 'UI/UX Designer',
            aos: "fade-up"
        },{
            name: 'Atiq Shaikh',
            image: Atiq,
            role: 'Backend Developer',
            aos: "fade-left"
        }
    ]

  return (
<div className='bg-neutral-700' >
    <div className='container mx-auto h-[42.375rem] pt-10'>

    <h1 className='text-white font-roboto text-center text-6xl font-extrabold' >About <em className='text-link font-roboto font-extrabold'>Us</em></h1>

        <div className='flex flex-row flex-wrap justify-between gap-x-10'>
            {team.map((member, index) => (
                <div className='flex flex-col items-center justify-center mt-10' key={index} data-aos={member.aos}>
                <img src={member.image} alt={member.name} className='h-[21.625rem] w-[21.625rem] border-4 border-link rounded-full' />
                <p className='text-white font-roboto text-center text-4xl font-extrabold mt-10'>{member.name}</p>
                <p className='text-[#878787] text-xl font-normal text-center font-roboto mt-2 w-3/5'>{member.role}</p>
                </div>
            ))}

        </div>
    </div>
    </div>

  )
}

export default AboutUs