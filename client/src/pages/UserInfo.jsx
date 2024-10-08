import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import { IoWalletOutline } from "react-icons/io5";
import { PiHandDeposit, PiHandWithdraw, PiSpinnerGapBold, PiMoneyWavy } from "react-icons/pi";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { setItem } from '../redux/slices/commonSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { findUserByIDRoute } from '../utils/ApiRoutes';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';

export default function UserInfo() {

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setItem(1));
    },[])

    const {userID} = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        if(userID){
            const fetchUser = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`${findUserByIDRoute}?id=${userID}`);
                    setUserInfo(response.data.user);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    toast.error('Failed to load User');
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [userID]);
    

  return (
    <div>
        <div className=' w-full flex justify-start min-h-svh'>
            <div className=' hidden md:flex min-h-svh w-[18%]'>
                <Sidebar className= " overflow-auto" />
            </div>
            <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
                <Nav />
                {loading ? (
                    <div className=' mt-12 flex justify-center'>
                        <Loader />
                    </div>
                )
                :(<div className=' w-full flex flex-col justify-center items-center gap-12 mt-12'>
                    <h1 className=' font-bold text-3xl'>Dashboard</h1>
            
                    <div className=' w-full flex flex-col xs:flex-row flex-wrap justify-evenly items-center over'>
                        <div className=' w-[80%] xs:w-[60%] sm:w-[40%] lg:w-[30%] h-[170px] bg-green-500 rounded-lg my-4 transform transition-transform duration-1000 hover:scale-105'>
                            <div className=' flex h-full'>
                                <div className=' w-[50%] flex flex-col justify-end items-start mb-2'>
                                    <div className=' text-gray-300 opacity-45'>
                                        <IoWalletOutline size={60} />
                                    </div>
                                </div>
                                <div className=' w-[50%] h-full flex flex-col justify-center items-center mr-4 text-white text-center '>
                                    <span className=' text-3xl font-bold'>${userInfo?.balance}</span>
                                    <span className=' text-md'>Current Balance</span>
                                </div>
                            </div>
                        </div>

                        <div className=' w-[80%] xs:w-[60%] sm:w-[40%] lg:w-[30%] h-[170px] bg-violet-950 rounded-lg my-4 transform transition-transform duration-1000 hover:scale-105'>
                            <div className=' flex h-full'>
                                <div className=' w-[50%] flex flex-col justify-end items-start mb-2'>
                                    <div className=' text-gray-300 opacity-45'>
                                        <PiHandDeposit size={60} />
                                    </div>
                                </div>
                                <div className=' w-[50%] h-full flex flex-col justify-center items-center mr-4 text-white text-center'>
                                    <span className=' text-3xl font-bold'>${userInfo?.deposit}</span>
                                    <span className=' text-md'>Total Deposit</span>
                                </div>
                            </div>
                        </div>

                        <div className=' w-[80%] xs:w-[60%] sm:w-[40%] lg:w-[30%] h-[170px] bg-green-700 rounded-lg my-4 transform transition-transform duration-1000 hover:scale-105'>
                            <div className=' flex h-full'>
                                <div className=' w-[50%] flex flex-col justify-end items-start mb-2'>
                                    <div className=' text-gray-300 opacity-45'>
                                        <PiHandWithdraw size={60} />
                                    </div>
                                </div>
                                <div className=' w-[50%] h-full flex flex-col justify-center items-center mr-4 text-white gap-1 text-center'>
                                    <span className=' text-3xl font-bold'>${userInfo?.withdraw}</span>
                                    <span className=' text-md'>Total Withdraw</span>
                                    <Link to={'/reports/withdraw'}>
                                        <button className=' bg-white text-green-700 px-2 py-1 text-lg font-medium rounded'>View</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className=' w-[80%] xs:w-[60%] sm:w-[40%] lg:w-[30%] h-[170px] bg-violet-800 rounded-lg my-4 transform transition-transform duration-1000 hover:scale-105'>
                            <div className=' flex h-full'>
                                <div className=' w-[50%] flex flex-col justify-end items-start mb-2'>
                                    <div className=' text-gray-300 opacity-45'>
                                        <PiSpinnerGapBold size={60} />
                                    </div>
                                </div>
                                <div className=' w-[50%] h-full flex flex-col justify-center items-center mr-4 text-white gap-1 text-center'>
                                    <span className=' text-3xl font-bold'>{userInfo?.pending}</span>
                                    <span className=' text-md'>Pending Withdraw</span>
                                    <Link to={'/reports/withdraw?status=P?ending'}>
                                        <button className=' bg-white text-violet-800 px-2 py-1 text-lg font-medium rounded'>View</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className=' w-[80%] xs:w-[60%] sm:w-[40%] lg:w-[30%] h-[170px] bg-green-900 rounded-lg my-4 transform transition-transform duration-1000 hover:scale-105'>
                            <div className=' flex h-full'>
                                <div className=' w-[50%] flex flex-col justify-end items-start mb-2'>
                                    <div className=' text-gray-300 opacity-45'>
                                        <SiTicktick size={60} />
                                    </div>
                                </div>
                                <div className=' w-[50%] h-full flex flex-col justify-center items-center mr-4 text-white gap-1 text-center'>
                                    <span className=' text-3xl font-bold'>{userInfo?.complete}</span>
                                    <span className=' text-md'>Completed Withdraw</span>
                                    <Link to={'/reports/withdraw?status=Accepted'}>
                                        <button className=' bg-white text-green-900 px-2 py-1 text-lg font-medium rounded'>View</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className=' w-[80%] xs:w-[60%] sm:w-[40%] lg:w-[30%] h-[170px] bg-red-500 rounded-lg my-4 transform transition-transform duration-1000 hover:scale-105'>
                            <div className=' flex h-full'>
                                <div className=' w-[50%] flex flex-col justify-end items-start mb-2'>
                                    <div className=' text-gray-300 opacity-45'>
                                        <GiCancel size={60} />
                                    </div>
                                </div>
                                <div className=' w-[50%] h-full flex flex-col justify-center items-center mr-4 text-white gap-1 text-center'>
                                    <span className=' text-3xl font-bold'>{userInfo?.reject}</span>
                                    <span className=' text-md'>Rejected Withdraw</span>
                                    <Link to={'/reports/withdraw?status=Rejected'}>
                                        <button className=' bg-white text-red-500 px-2 py-1 text-lg font-medium rounded'>View</button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className=' w-[80%] xs:w-[60%] sm:w-[40%] lg:w-[30%] h-[170px] bg-cyan-400 rounded-lg my-4 transform transition-transform duration-1000 hover:scale-105'>
                            <div className=' flex h-full'>
                                <div className=' w-[50%] flex flex-col justify-end items-start mb-2'>
                                    <div className=' text-gray-200 opacity-60'>
                                        <PiMoneyWavy size={60} />
                                    </div>
                                </div>
                                <div className=' w-[50%] h-full flex flex-col justify-center items-center mr-4 text-white text-center'>
                                    <span className=' text-3xl font-bold'>${userInfo?.invest}</span>
                                    <span className=' text-md'>Total Invest</span>
                                </div>
                            </div>
                        </div>

                        <div className=' w-[80%] xs:w-[60%] sm:w-[40%] lg:w-[30%] h-[170px] bg-bgcol rounded-lg my-4 transform transition-transform duration-1000 hover:scale-105'>
                            <div className=' flex h-full'>
                                <div className=' w-[50%] flex flex-col justify-end items-start mb-2'>
                                    <div className=' text-gray-300 opacity-45'>
                                        <FaUsers size={60} />
                                    </div>
                                </div>
                                <div className=' w-[50%] h-full flex flex-col justify-center items-center mr-4 text-white text-center'>
                                    <span className=' text-3xl font-bold'>{userInfo?.refers?.length}</span>
                                    <span className=' text-md'>Total Refferal</span>
                                </div>
                            </div>
                        </div>

                        <div className=' w-[80%] xs:w-[60%] sm:w-[40%] lg:w-[30%] h-[170px] bg-cyan-700 rounded-lg my-4 transform transition-transform duration-1000 hover:scale-105'>
                            <div className=' flex h-full'>
                                <div className=' w-[50%] flex flex-col justify-end items-start mb-2'>
                                    <div className=' text-gray-300 opacity-45'>
                                        <GiCancel size={60} />
                                    </div>
                                </div>
                                <div className=' w-[50%] h-full flex flex-col justify-center items-center mr-4 text-white text-center'>
                                    <span className=' text-3xl font-bold'>${userInfo?.refferalIncome}</span>
                                    <span className=' text-md'>Referral Income</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>)}
            </div>
    
        </div>
    </div>
  )
}
