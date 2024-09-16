import React, {useEffect} from 'react'

import { MdOutlineDesignServices } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { RiPresentationLine } from "react-icons/ri";

import Aos from 'aos'
import 'aos/dist/aos.css'

function Features() {

    useEffect(()=>{
        Aos.init({duration: 2000})
    },[])

  return (
    <div id='about' className="features section">
        <div data-aos='fade-up' data-aos-duration='2500' className="container featuresContainer">
            <div className="cardsDiv gridC">
                <div className="singleCard gridC">
                    <div className="iconDiv flexC">
                        <IoMdAnalytics className='icn' />
                    </div>
                    <span className='cardTitle'>Digital Marketing</span>
                    <p className='p'>
                        If you want, you can discuss about us with your
                        friends, work with us here and help each other.
                    </p>
                </div>

                <div className="singleCard special gridC shadow-xl">
                    <div className="iconDiv flexC colorOne">
                        <MdOutlineDesignServices className='icn' />
                    </div>
                    <span className='cardTitle'>Self Services</span>
                    <p className='p'>
                        You can do your work at any time of the day at your
                        convenience. When you are busy, you can work with the
                        help of someone you know.
                    </p>
                </div>

                <div className="singleCard gridC">
                    <div className="iconDiv flexC colorTwo">
                        <RiPresentationLine className='icn' />
                    </div>
                    <span className='cardTitle'>Business Concept</span>
                    <p className='p'>
                        If you want, you can buy a task from us according
                        to your ability and you can do a lot more work alone
                        or together with your friends.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features