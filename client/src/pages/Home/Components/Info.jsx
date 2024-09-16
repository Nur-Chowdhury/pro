import React, {useEffect} from 'react'

import { TbCalendarTime } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineAdsClick } from "react-icons/md";
import { LuLayers } from "react-icons/lu";

import Aos from 'aos'
import 'aos/dist/aos.css'

const Info = () => {

    useEffect(()=>{
        Aos.init({duration: 2000})
    },[])

  return (
    <div id='features' className="info section">
        <div data-aos='fade-up' data-aos-duration='2500' className="infoContainer container">
            <div className="cardsDiv gridC">
                <div className="singleCard gridC">
                    <div className="iconDiv flexC">
                        <TbCalendarTime className='icn' />
                    </div>
                    <span className='cardTitle'>Deadline</span>
                    <p className='p'>
                        We need your help to finish our work on time. We have
                        acquired the ability to work according to your needs
                        and abilities.
                    </p>
                </div>

                <div className="singleCard gridC">
                    <div className="iconDiv flexC colorOne">
                        <HiOutlineLightBulb className='icn' />
                    </div>
                    <span className='cardTitle'>Innovation</span>
                    <p className='p'>
                        We value your innovative thinking and your social
                        connections so we want you to start with a work ethic.
                    </p>
                </div>

                <div className="singleCard gridC">
                    <div className="iconDiv flexC colorTwo">
                        <MdOutlineAdsClick className='icn' />
                    </div>
                    <span className='cardTitle'>Pay Per Submission</span>
                    <p className='p'>
                        The source of income can be counterproductive if you
                        value your work. Every day we try to create additional
                        income opportunities for you.
                    </p>
                </div>

                <div className="singleCard gridC">
                    <div className="iconDiv flexC">
                        <LuLayers className='icn' />
                    </div>
                    <span className='cardTitle'>Content Evaluation</span>
                    <p className='p'>
                        Your job is to look at all our information
                        correctly and then fill out our form. Your small
                        mistake may cause harm to others.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Info