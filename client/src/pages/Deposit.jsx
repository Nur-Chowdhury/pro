import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { setAmount } from '../redux/slices/commonSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Deposit() {

    const {amount} = useSelector((state) => state.common);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        if(amount >49){
            navigate('/deposit/bkash'); 
        }
        else{
            toast.error("Amount Must be Greater or Equal to 50!");
        }
    }

  return (
    <div>
      <div className=' w-full flex justify-start min-h-svh'>
        <div className=' hidden md:flex min-h-svh w-[18%]'>
          <Sidebar className= " overflow-auto" />
        </div>
        <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
          <Nav />
          <div className=' m-8'>
            <span className=' text-2xl font-medium text-gray-800'>Payment Preview</span>
            <div className='  w-[50%] md:w-[90%] mt-8 mx-20 flex flex-col justify-center items-center gap-4'>
                <div className='flex flex-col justify-center items-center bg-white py-4 px-12 rounded-lg gap-4'>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>Amount:</span>
                        <input
                            className={`w-full rounded-lg`}
                            type="number"
                            placeholder='Amount'
                            onChange={(e) => { 
                                dispatch(setAmount(e.target.value));
                            }}
                            required
                        />
                    </div>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>Charge:</span>
                        <span className=' text-lg'>0 DOLLER</span>
                    </div>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>Exchange Rate:</span>
                        <span className=' text-lg'>1 DOLLER = 120 BDT</span>
                    </div>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>Payable:</span>
                        <span className=' text-lg'>{amount}</span>
                    </div>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>In BDT:</span>
                        <span className=' text-lg'>{amount*120}</span>
                    </div>
                    <div
                        onClick={handleClick} 
                        className=' w-full bg-green-500 rounded-lg cursor-pointer flex justify-center items-center p-1 text-lg font-semibold text-white'
                    >
                        Confirm
                    </div>
                </div>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  )
}
