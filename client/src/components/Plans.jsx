//depricated

import React, { useState } from 'react'
import { SiTicktick } from "react-icons/si";
import { FaQuestionCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { subscribe } from '../redux/actions/userActions';
import { toast } from 'react-toastify';

export default function Plans() {


    const {userInfo} = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const handleClick = (type) => {
        console.log(userInfo);
        if(type<=userInfo.balance){  
            const value = type===50 ? "silver" : "gold";
            const id = userInfo._id;
            dispatch(subscribe(value, id, type));
        }
        else{
            toast.error('Insufficient Balance')
        }
    }

  return (
    <div className=' w-full flex flex-col justify-center items-center gap-12'>
        <h1 className=' font-bold text-3xl'>Plans</h1>

        <div className=' flex flex-col md:flex-row w-full justify-center items-center gap-8'>
            <div className=' w-[80%] md:w-[35%] bg-white h-[500px] rounded-lg shadow-lg p-8 flex flex-col justify-start items-center '>
                <div className=' flex justify-center items-center my-4'>
                    <span className=' text-gray-700 font-bold text-4xl'>Silver</span>
                </div>
                <div className=' flex justify-center items-center my-4'>
                    <span className=' font-bold text-5xl'>$50</span>
                </div>
                <div className=' w-full bg-gray-500 h-[1px] my-4'></div>

                <div className=' w-full flex flex-col gap-4'>
                    <div className=' w-full flex gap-0 items-center'>
                        <div className=' w-[10%] text-green-600'>
                            <SiTicktick size={22} />
                        </div>
                        <div className=' w-[80%]'>
                            <span className=' text-lg text-gray-700'>Per Survey Income: $ 0.76</span>
                        </div>
                        <div className=' w-[10%] text-blue-500'>
                            <FaQuestionCircle size={25} className=' cursor-pointer'/>
                        </div>
                    </div>

                    <div className=' w-full flex gap-0 items-center'>
                        <div className=' w-[10%] text-green-600'>
                            <SiTicktick size={22} />
                        </div>
                        <div className=' w-[80%]'>
                            <span className=' text-lg text-gray-700'>Plan Commission Level 1: 5.00 %</span>
                        </div>
                        <div className=' w-[10%] text-blue-500'>
                            <FaQuestionCircle size={25} className=' cursor-pointer'/>
                        </div>
                    </div>

                    <div className=' w-full flex gap-0 items-center'>
                        <div className=' w-[10%] text-green-600'>
                            <SiTicktick size={22} />
                        </div>
                        <div className=' w-[80%]'>
                            <span className=' text-lg text-gray-700'>Survey Commission Level 1: 20.00 %</span>
                        </div>
                        <div className=' w-[10%] text-blue-500'>
                            <FaQuestionCircle size={25} className=' cursor-pointer'/>
                        </div>
                    </div>

                    <div className=' w-full flex gap-0 items-center'>
                        <div className=' w-[10%] text-green-600'>
                            <SiTicktick size={22} />
                        </div>
                        <div className=' w-[80%]'>
                            <span className=' text-lg text-gray-700'>Survey Commission Level 2: 10.00 %</span>
                        </div>
                        <div className=' w-[10%] text-blue-500'>
                            <FaQuestionCircle size={25} className=' cursor-pointer'/>
                        </div>
                    </div>
                </div>

                <button className=' flex items-center justify-center my-6 w-[75%] h-[40px] rounded-lg border-2 border-blue-500 font-medium 
                text-lg hover:bg-blue-500 hover:text-white' 
                disabled={userInfo.subscribed!=="none"}
                onClick={()=> handleClick(50)}>
                    {userInfo.subscribed==="none" ? "Subscribe" : "Subscribed" }
                </button>
            </div>

            <div className=' w-[80%] md:w-[35%] bg-white h-[500px] rounded-lg shadow-lg p-8 flex flex-col justify-start items-center '>
                <div className=' flex justify-center items-center my-4'>
                    <span className=' text-gray-700 font-bold text-4xl'>Gold</span>
                </div>
                <div className=' flex justify-center items-center my-4 gap-2'>
                <del className=' font-medium text-xl text-gray-500'>$100</del>
                    <span className=' font-bold text-5xl'>$75</span>
                </div>
                <div className=' w-full bg-gray-500 h-[1px] my-4'></div>

                <div className=' w-full flex flex-col gap-4'>
                    <div className=' w-full flex gap-0 items-center'>
                        <div className=' w-[10%] text-green-600'>
                            <SiTicktick size={22} />
                        </div>
                        <div className=' w-[80%]'>
                            <span className=' text-lg text-gray-700'>Per Survey Income: € 1.7</span>
                        </div>
                        <div className=' w-[10%] text-blue-500'>
                            <FaQuestionCircle size={25} className=' cursor-pointer'/>
                        </div>
                    </div>

                    <div className=' w-full flex gap-0 items-center'>
                        <div className=' w-[10%] text-green-600'>
                            <SiTicktick size={22} />
                        </div>
                        <div className=' w-[80%]'>
                            <span className=' text-lg text-gray-700'>Plan Commission Level 1: 5.00 %</span>
                        </div>
                        <div className=' w-[10%] text-blue-500'>
                            <FaQuestionCircle size={25} className=' cursor-pointer'/>
                        </div>
                    </div>

                    <div className=' w-full flex gap-0 items-center'>
                        <div className=' w-[10%] text-green-600'>
                            <SiTicktick size={22} />
                        </div>
                        <div className=' w-[80%]'>
                            <span className=' text-lg text-gray-700'>Survey Commission Level 1: 20.00 %</span>
                        </div>
                        <div className=' w-[10%] text-blue-500'>
                            <FaQuestionCircle size={25} className=' cursor-pointer'/>
                        </div>
                    </div>

                    <div className=' w-full flex gap-0 items-center'>
                        <div className=' w-[10%] text-green-600'>
                            <SiTicktick size={22} />
                        </div>
                        <div className=' w-[80%]'>
                            <span className=' text-lg text-gray-700'>Survey Commission Level 2: 10.00 %</span>
                        </div>
                        <div className=' w-[10%] text-blue-500'>
                            <FaQuestionCircle size={25} className=' cursor-pointer'/>
                        </div>
                    </div>
                </div>

                <button className=' flex items-center justify-center my-6 w-[75%] h-[40px] rounded-lg border-2 border-blue-500 font-medium 
                    text-lg hover:bg-blue-500 hover:text-white' 
                    disabled={userInfo.subscribed==="gold"}
                    onClick={()=> handleClick(75)}
                >
                    {userInfo.subscribed==="gold" ? "Subscribed" : "Subscribe" }
                </button>
            </div>
        </div>

    </div>
  )
}
