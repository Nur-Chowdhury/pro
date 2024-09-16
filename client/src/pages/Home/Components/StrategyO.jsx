import React, {useEffect} from 'react'

import four from "../../../assets/four.png";

import Aos from 'aos'
import 'aos/dist/aos.css'

 function StrategyO() {

    useEffect(()=>{
        Aos.init({duration: 2000})
    },[])

  return (
    <div className="strategyO container section">
        <div className="sectionContainer gridC">
            <div className="textDiv gridC">
                <div className="txDiv">
                    <h2 className='h2'>Ready to Grow Your Business?</h2>
                    <p className='para p'>
                        Lorem ipsum dolor sit amet, consectetu adipiscing 
                        elit, eiusmod temporincididunt ut labore et dolore magn
                        aliqua quis.
                    </p>
                </div>
                <div className="textT gridC">
                    <div data-aos='fade-up' data-aos-duration='2500' className="imgDiv">
                        <img src={four} alt="four" className='img' />
                    </div>
                    <div data-aos='fade-down' data-aos-duration='2500' className="gridC">
                        <span>DIGITAL STRATEGY</span>
                        <h2 className='h2'>First page rankings. First name basis</h2>
                        <p className='p'>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt
                            ut labore et dolore magna aliqua
                            quis nostrud exercitation.
                        </p>
                        <p className='p'>
                            Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit, sed do eiusmod tempor
                            incididunt ut labore et dolore magna
                            aliqua quis nostrud exercitation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StrategyO;