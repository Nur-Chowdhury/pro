import React from 'react'
import  './Home.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Deals from './Components/Deals'
import Features from './Components/Features'
import Commitments from './Components/Commitments'
import Info from './Components/Info'
import StrategyO from './Components/StrategyO'
import StrategyT from './Components/StrategyT'
import Traffic from './Components/Traffic'
import FAQ from './Components/FAQ'
import Footer from './Components/Footer'

export default function Home() {
  return (
    <div className=' p-0 m-0 box-border font-spartan'>
        <Navbar />
        <Hero />
        <Deals />
        <Features />
        <Commitments />
        <Info />
        <hr className='divider' />
        <StrategyO />
        <StrategyT />
        <Traffic />
        <hr className='divider' />
        <FAQ />
        <Footer />
    </div>
  )
}
