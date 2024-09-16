import React from 'react'

import logo from '../../../assets/logo.png';
import { RiCopyrightLine } from 'react-icons/ri';


const Footer = () => {
  return (
    <div className="footer">
        <div className="sectionContainer container gridC">
            <div className="foot1 gridC">
                <img src={logo} alt='logo' className='footerlogo img' />
                <p className='footerdes'>
                    Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor 
                    incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className="footMenu gridC">
                <div className="foot">
                <ul >
                    <li className='fh listItem li'>Company</li>
                    <li className='listItem li'>About Us</li>
                    <li className='listItem li'>Careers</li>
                    <li className='listItem li'>Press & Media</li>
                    <li className='listItem li'>Contact Us</li>
                </ul>
                </div>
                <div className="foot">
                <ul >
                    <li className='fh listItem li'>Discover</li>
                    <li className='listItem li'>Our Blog</li>
                    <li className='listItem li'>Advertising</li>
                    <li className='listItem li'>Plans & Pricing</li>
                    <li className='listItem li'>Testimonials</li>
                </ul>
                </div>
                <div className="foot">
                <ul >
                    <li className='fh listItem li'>Legal</li>
                    <li className='listItem li'>Terms of Use</li>
                    <li className='listItem li'>Privacy Policy</li>
                    <li className='listItem li'>Cookie Policy</li>
                    <li className='listItem li'>Site Map</li>
                </ul>
                </div>
                <div className="foot">
                <ul >
                    <li className='fh listItem li'>Support</li>
                    <li className='listItem li'>FAQs</li>
                    <li className='listItem li'>Editor Help</li>
                    <li className='listItem li'>Community</li>
                    <li className='listItem li'>Live Chatting</li>
                </ul>
                </div>
            </div>
        </div>
        <hr className='divider' />
        <div className="foot6 flexC">
            <div className="copyright">
                <RiCopyrightLine className='icn' />2024 Lorem.All Rights Reserved.
            </div>
            <div className="social">
                <ul className='social-ul flexC'>
                    <li className='sl li'>Facebook</li>
                    <li className='sl li'>Twitter</li>
                    <li className='sl li'>LinkedIn</li>
                    <li className='sl5 li'>Dribble</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer