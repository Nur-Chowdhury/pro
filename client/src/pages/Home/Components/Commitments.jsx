import React, {useEffect} from 'react'

import three from "../../../assets/three.jpg";

import Aos from 'aos'
import 'aos/dist/aos.css'

 function Commitments() {

    useEffect(()=>{
        Aos.init({duration: 2000})
    },[])

  return (
    <div className="commitments container section">
        <div data-aos='fade-up' data-aos-duration='2500' className="sectionContainer gridC">
            <div className="textDiv gridC">
                <h4 className='h4'>QUICK AND SECURE</h4>
                <h2 className='h2'>Committed to top quality and results</h2>
                <ul className='list'>
                    <li className="listItem li">
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna
                        aliqua quis nostrud exercitation.
                    </li>
                    <li className="listItem li">
                        Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna
                        aliqua quis nostrud exercitation.
                    </li>
                </ul>
            </div>

            <div data-aos='fade-down' data-aos-duration='2500' className="imgDiv">
                <img src={three} alt="three" className='img' />
            </div>
        </div>
    </div>
  )
}

export default Commitments;