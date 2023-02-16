import React from 'react'
import CountUp from 'react-countup'
const Stats = () => {
  const stats = [
    {
      title: 'Registered Users',
      value: 20,
      suffix: 'K+',
      duration: 0.5
    }, {
      title: 'Active Community Members', 
      value: 100,
      suffix: 'K+',
      duration: 2
    }, {
      title: 'Number of Countries',
      value: 12,
      suffix: '+',
      duration: 0.3
    }, {
      title: 'All Time High',
      value: 46,
      suffix: 'x',
      duration: 1.1
    }
  ]
  return (
    <div className="container flex items-center flex-col mx-auto h-[40.125rem]">
      <h1 className='text-white font-roboto text-center mt-8'>/ CONTRIBUTION /</h1>
      <div className='mt-5 flex justify-center' >
      <p className='text-white font-roboto text-center text-6xl font-extrabold w-2/3'>The platform for <em className='text-link font-roboto font-extrabold'> crowdfunding </em></p>
      </div>
      <div className='flex flex-row justify-center mt-10 gap-x-24' >
        {stats.map((stat, index) => (
          <div className='flex flex-col h-[15rem] items-between justify-center  ' key={index}>

            <CountUp
            className='text-link font-roboto text-center text-8xl font-extrabold'
            duration={stat.duration}
            enableScrollSpy= {true}
            end={stat.value} 
            start={stat.value/2}
            suffix={stat.suffix}
             />
            <p className='text-white font-roboto text-center text-[2rem] font-extrabold'>{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stats