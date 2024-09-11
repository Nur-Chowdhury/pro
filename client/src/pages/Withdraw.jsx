import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import { setAmountw } from '../redux/slices/commonSlice';
import { toast } from 'react-toastify';
import { findUserByIDRoute } from '../utils/ApiRoutes';
import axios from 'axios';


export default function Withdraw() {

    const {amountw} = useSelector((state) => state.common);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userID} = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${findUserByIDRoute}?id=${userID}`);
                setUserInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error('Failed to load User');
                setLoading(false);
            }
        };
        fetchUser();
    }, [userID]);

    const handleClick = () => {
        if(amountw >= 1 && amountw <= 1201){
            if(amountw <= userInfo.balance){
                navigate('/withdraw/bkash');
            }else{
                toast.error("Insufficient Balance!")
            }
        }
        else{
            toast.error("Please input between the Limit")
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
                                dispatch(setAmountw(e.target.value));
                                console.log(amountw);
                            }}
                            required
                        />
                    </div>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>Limit:</span>
                        <span className=' text-lg'>1-1200$</span>
                    </div>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>Charge:</span>
                        <span className=' text-lg'>15%</span>
                    </div>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>Exchange Rate:</span>
                        <span className=' text-lg'>1 DOLLER = 120 BDT</span>
                    </div>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>Payable:</span>
                        <span className=' text-lg'>{amountw - (amountw*.15)}</span>
                    </div>
                    <div className=' w-full flex gap-4 justify-between items-center'>
                        <span className=' text-lg font-medium'>In BDT:</span>
                        <span className=' text-lg'>{(amountw - (amountw*.15)) * 120}</span>
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
