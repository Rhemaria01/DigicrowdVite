import React from 'react'
import Wallet from '../assets/Wallet.svg'
import Select from '../assets/Select.svg'
import Trust from '../assets/Trust.svg'
const Steps = () => {
    const items = [{
        image: Wallet,
        title: 'Connect Wallet',
        description: "You can easily connect your account in our website",
        aos: "zoom-out-right"
    },
    {
        image: Select,
        title: 'Select Donating Fund',
        description: "You can select our campaign by your choice",
        aos: "zoom-out-up"
    },
    {
        image: Trust,
        title: 'Start Donating',
        description: "After selecting your fund, you can start donating",
        aos: "zoom-out-left"
    }]
  return (
    <div className='bg-neutral-700 mt-20' >
        <div className='flex container mx-auto flex-row space-x-10 justify-between h-[28rem]'>
            {items.map((item, index) => (
                <div className='flex flex-col gap-y-0 justify-center items-center' data-aos={item.aos} key={index}>
                <img src={item.image} alt={item.title} className='h-24 w-24 mb-10' />
                <p className='text-white font-bold font-roboto  text-center leading-9 text-3xl mb-3' >
                {item.title} </p>

                <p className='text-[#878787] text-xl font-normal text-center font-roboto w-3/5' >
                {item.description} </p>

                </div>
            ))}
        </div>
    </div>
  )
}

export default Steps