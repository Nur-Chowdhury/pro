import React, {useEffect} from 'react'

import shake from "../../../assets/two.jpg"

import Aos from 'aos'
import 'aos/dist/aos.css'

 function Deals() {

    useEffect(()=>{
        Aos.init({duration: 2000})
    },[])

  return (
    <div className="deals container section">
        <div className="sectionContainer gridC">
            <div data-aos='fade-up' data-aos-duration='2500' className="textDiv gridC">
                <h2 className='h2'>WORKING DEALS</h2>
                <p className='p'>
                    Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna
                    aliqua quis nostrud exercitation.
                </p>
                <ul className='list'>
                    <li className="listItem li">
                        Our Contract Valid For Next Six Month.
                    </li>
                    <li className="listItem li">
                        We Have To Provide 500 milions task Between 
                        20 September 2024.           
                    </li>
                </ul>
            </div>

            <div data-aos='fade-down' data-aos-duration='2500' className="imgDiv">
                <img src={shake} alt="hand shake image" className='img'/>
            </div>

            <button className='btn btnDeal'>Learn More</button>
        </div>
    </div>
  )
}

export default Deals;