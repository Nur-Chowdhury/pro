import React, {useState} from 'react'

import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';


const StrategicC = () => { 

  const[countOn, setCounterOn] = useState(false);

  return (
      <div className="strategicC container">
        <div className="cardDiv gridC">
            <span className='cardTitle'>New Customers</span>
            <ScrollTrigger onEnter={()=>setCounterOn(true)}>
              <h2 className='stHead h2'>+
                {countOn &&
                  <CountUp start={0} end={784} duration={3} className='stCnt' />
                }
              </h2>
            </ ScrollTrigger>
            <span className='pb'><span className='per'>4.6%</span> vs last 7 days</span>
            
            <hr className='divider' />
            
            <ul>
              <li className='listItem li'>
                Orci varius natoque penatibus et magnis dis parturient
                montes.
              </li>
              <li className='listItem li'>
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra.
              </li>
            </ul>
            <div className="blubtn">
              <h2 className='h2'>98.245</h2>
              <span className='blu'>Lorem ipsum dolor sit</span>
            </div>
        </div>
      </div>
  )
}

export default StrategicC