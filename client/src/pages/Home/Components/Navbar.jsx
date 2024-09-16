import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import logo from "../../../assets/logo.png"
import { CgMenuGridO } from 'react-icons/cg';


function Navbar() {

  const [noBg, addBg] = useState('navBar');

  const addBgColor = ()=>{
    if(window.scrollY >=10){
      addBg('navBar navbar_With_Bg');
    }else{
      addBg('navBar');
    }
  }

  window.addEventListener('scroll', addBgColor);

  const [active, setActive] = useState('navBarMenu');

  const showNavBar = ()=>{
    if(active==='navBarMenu'){
      setActive('navBarMenu showNavBar');
    }
    else{
      setActive('navBarMenu');
    }
  }

  const removeNavBar = ()=>{
    setActive('navBarMenu');
  }


  return (
    <div className='nav flexC'>
      <div className={noBg}>
        <div className="logoDiv">
          <img src={logo} className='logo img' />
        </div>

        <div className={active}>
          <ul className='menu flexC' >
            <a href="/"><li onClick={removeNavBar} className='listItem li'>Home</li></a>
            <a href="#about"><li onClick={removeNavBar} className='listItem li'>About</li></a>
            <a href="#features"><li onClick={removeNavBar} className='listItem li'>Features</li></a>
            <li onClick={removeNavBar} className='listItem li'>Pricing</li>
            <a href="#faq"><li onClick={removeNavBar} className='listItem li'>FAQ</li></a>
          </ul>
          <div className="buttons flexC">
            <Link to={'/login'}><button className='btn flexC btnOne' >Login</button></Link>
            <Link to={'/register'}><button className='btn flexC btnTwo' >SignUp</button></Link>
          </div>
        </div>

        <div onClick={showNavBar} className="toggleIcon">
          <CgMenuGridO className='icon' />
        </div>
      </div>
    </div>
  )
}

export default Navbar;