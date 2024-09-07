import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux';
import {TextInput} from "flowbite-react"
import axios from 'axios';
import { userLogin } from '../redux/slices/user';
import { transferBalanceRoute } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';
import { setItem } from '../redux/slices/commonSlice';


export default function BalanceTransfer() {

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const {userInfo} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            if(userInfo.balance >= formData.amount){
                const config = {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                };
                const response = await axios.post(transferBalanceRoute, {
                    senderId: userInfo?._id,
                    email: formData.email,
                    amount: parseFloat(formData.amount),
                }, config);
                dispatch(userLogin(response.data));
                localStorage.setItem('userInfo', JSON.stringify(response.data));
                toast.success("Balance Transfered Successfully!");
                setFormData({});
            }else{
                toast.error("Insufficient Balance!");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        dispatch(setItem(8));
    },[])

  return (
    <div>
        <div className=' w-full flex justify-start min-h-svh'>
            <div className=' hidden md:flex min-h-svh w-[18%]'>
                <Sidebar className= " overflow-auto" />
            </div>
            <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
                <Nav /> 
                <div className=' w-full flex flex-col justify-center items-center gap-8 mt-12'>
                    <h1 className=' font-bold text-3xl'>Balance Transfer</h1>

                    <div className=' w-[90%] bg-white rounded-lg shadow-lg py-4 flex flex-col justify-start items-center gap-12'>
                        <div className=' w-[95%] bg-red-200 text-center rounded text-lg font-medium'>Balance Transfer Charge is 0.5 EUR</div>

                        <form onSubmit={handleSubmit} className=' w-[95%] flex flex-col gap-8'>
                            <div className=' w-full flex flex-col justify-start gap-1'>
                                <span className=' font-bold text-2xl'>Email To Send Amount *</span>
                                <TextInput
                                    type='email'
                                    id='email'
                                    placeholder='Email'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className=' w-full flex flex-col justify-start gap-1'>
                                <span className=' font-bold text-2xl'>Transfer Amount *</span>
                                <TextInput
                                    type='number'
                                    id='amount'
                                    placeholder='Amount'
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className=' w-full flex justify-center items-center pb-8'>
                                <button type='submit' className=' rounded-lg border-2 border-blue-500 w-full hover:bg-blue-500 hover:text-white text-lg font-medium'>
                                    Transfer
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}
