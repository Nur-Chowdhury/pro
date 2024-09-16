import React from 'react';
import image from '../../../assets/hero.png';

function Hero() {
  return (
    <div className="home gridC container">
        <div className="homeImages">
            <img src={image} alt='hero' className='hero img' />
        </div>
        <div className="mainText">
            <h1>Generating income with complete form data</h1>
            <p className='p'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do ut labore et dolore magna aliqua.
            </p>
            <button className='btn .heroBtn'>Get Started</button>
        </div>
    </div>
  )
}

export default Hero;