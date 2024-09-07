import React, { useEffect } from 'react'
import bkash from '../assets/bkash.png';
import binance from '../assets/binance.png'
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { useDispatch } from 'react-redux';
import { setItem } from '../redux/slices/commonSlice';

export default function WithdrawF() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setItem(7));
    }, [])

  return (
    <div>
        <div className=' w-full flex justify-start min-h-svh'>
            <div className=' hidden md:flex min-h-svh w-[18%]'>
                <Sidebar className= " overflow-auto" />
            </div>
            <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
                <Nav />
                <div className=' w-full flex flex-col justify-center items-center gap-12 mt-12'>
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

                            <Link className=" w-full flex items-center justify-center" to={"/withdraw/amount"}>
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
            </div>
      
        </div>
    </div>
  )
}
