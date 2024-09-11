//depricated

import React from 'react'
import bkash from '../assets/bkash.png';
import binance from '../assets/binance.png'
import { Link } from 'react-router-dom';

export default function Withdraw() {
  return (
    <div className=' w-full flex flex-col justify-center items-center gap-12'>
        <h1 className=' font-bold text-3xl'>Withdraw</h1>

        <div className=' flex flex-col md:flex-row w-full justify-center items-center gap-8'>
            <div className=' w-[80%] md:w-[35%] bg-white h-[500px] rounded-lg shadow-lg px-8 py-2 flex flex-col justify-start items-center '>
                <div className=' w-full flex justify-center items-center py-2 border-b-2 border-b-black'>
                    <span className=' text-gray-700 font-bold text-4xl'>BKash</span>
                </div>

                <img
                    src={bkash}
                    alt='bkahs'
                    className=' w-full h-[80%]' 
                />

                <Link className=" w-full flex items-center justify-center" to={"/withdraw"}>
                    <button className=' flex items-center justify-center my-6 w-[75%] h-[40px] rounded-lg border-2 border-blue-500 font-medium 
                        text-lg hover:bg-blue-500 hover:text-white' >
                        Withdraw
                    </button>
                </Link>
            </div>

            <div className=' w-[80%] md:w-[35%] bg-white h-[500px] rounded-lg shadow-lg px-8 py-2 flex flex-col justify-start items-center '>
                <div className=' w-full flex justify-center items-center py-2 border-b-2 border-b-black'>
                    <span className=' text-gray-700 font-bold text-4xl'>Binance</span>
                </div>
                
                <img
                    src={binance}
                    alt='Binance'
                    className=' w-full h-[80%]' 
                />

                <Link className=" w-full flex items-center justify-center"><button className=' flex items-center justify-center my-6 w-[75%] h-[40px] rounded-lg border-2 border-blue-500 font-medium 
                    text-lg hover:bg-blue-500 hover:text-white'>
                    Withdraw
                </button></Link>
            </div>
        </div>

    </div>
  )
}
