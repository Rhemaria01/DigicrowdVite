import React from 'react'

import Logo from '../assets/logo.png'
import phone from '../assets/phone.png'
import mail from '../assets/email.png'
import location from '../assets/location.png'
import facebook from '../assets/facebook.svg'
import twitter from '../assets/twitter.svg'
import linkedin from '../assets/linkedin.svg'
import instagram from '../assets/instagram.svg'

const Footer = () => {
  return (
    <div className='bg-[#1C1C1C] font-sans min-h-[50vh] mt-10 pt-5'>
        <div  className='container ml-20 grid grid-cols-5 grid-rows-2' >

        <div className='footer-image col-span-2 '>
            <img src={Logo} className="h-20" alt='logo' />
            <p className='w-2/3 leading-6 text-justify ml-7 text-slate-50 font-[400] text-sm'>
                DigiCrowd is a platform that connects projects that matter with people who care. We are a team of passionate individuals who believe in the power of technology to make a difference in the world.
            </p>
        </div>
        <div className='col-span-3 flex flex-row gap-x-28'>
            <div className='flex flex-col gap-y-8'>
                <h3 className='text-slate-50 font-bold text-lg'>Pages</h3>
                <a href='#explore'  className='Link'><p className='text-slate-50 font-thin text-sm'>Explore</p></a>
                <a href='#how-it-works'  className='Link'><p className='text-slate-50 font-thin text-sm'>How it Works?</p></a>
                <a  href='#about-us' className='Link'><p className='text-slate-50 font-thin text-sm'>About Us</p></a>
            </div>
            <div className='flex flex-col gap-y-10'>
                <h3 className='text-slate-50 font-bold text-lg'>Services</h3>
                <p className='text-slate-50 font-thin text-sm'>Fundraising</p>
                <p className='text-slate-50 font-thin text-sm'>Crowdfunding</p>
            </div>
            <div className='flex flex-col gap-y-10 '>
                <h3 className='text-slate-50 font-bold text-lg'>Contact</h3>
                <span className='text-slate-50 font-thin text-sm flex gap-x-2 items-center'>
                <img src={phone} className="contact-icon" alt="phone"/>(406) 555-0120</span>
                <span className='text-slate-50 font-thin text-sm flex gap-x-2 items-center'>
                <img src={mail} className="contact-icon" alt="mail"/>
                digicrowdteam@gmail.com</span>
                <span className='text-slate-50 font-thin text-sm flex gap-x-2 items-center'>
                <img src={location} className="contact-icon" alt="location"/>
                2972 Westheimer Rd. Santa </span>
            </div>
        </div>
            <div className='col-span-4 place-self-end '>
            <div className='flex '>
            <img src={facebook} alt="facebook" className='socials'/>
            <img src={twitter}  alt="twitter" className='socials'/>
            <img src={linkedin}  alt="linkedin" className='socials'/>
            <img src={instagram}  alt="instagram" className='socials'/>
            </div>
            </div>
        </div>
    </div>    
  )
}

export default Footer