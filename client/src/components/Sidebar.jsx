import React, { useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { setItem } from '../redux/slices/commonSlice';
import { FaPowerOff } from "react-icons/fa";
import { signoutSuccess } from '../redux/slices/user';
import { logoutRoute } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';


export default function Sidebar() {

    const {item} = useSelector((state) => state.common);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [up, setUp] = useState(false);

    const handleSignOut = async () => {
        try {
            const res = await fetch(logoutRoute, {
                method: 'POST',
            })
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }else{
                dispatch(signoutSuccess());
                toast.success("Log Out Success!");
                navigate("/login");
            }
        } catch (error) {
            console.log(error.message);
        }
    }



  return (
    <div
      className={` hidden md:flex h-full  min-h-svh w-full flex-col overflow-y-auto justify-between bg-slate-800
    text-white border-r border-white`}
    >
        <div className="card">
            <div className="flex flex-col items-center justify-center gap-3 py-4">
                <div className="text-2xl text-white md:text-3xl ">
                    <a href="/home" className="">LOGO</a>
                </div>

                <nav className=" w-full mt-8 flex flex-col justify-start items-start">
                    <ul className=" w-full text-xl">
                        <li onClick={()=> dispatch(setItem(1))} >
                            <Link to="/dashboard"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===1 ? "bg-slate-200/40":""}`}
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li onClick={()=> dispatch(setItem(2))} >
                            <Link to="/survey" 
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===2 ? "bg-slate-200/40":""}`}
                            >
                                Start Survey
                            </Link>
                        </li>

                        <li onClick={()=> dispatch(setItem(3))} >
                            <Link to="/plans"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===3 ? "bg-slate-200/40":""}`}
                            >
                                Plan
                            </Link>
                        </li>

                        <li onClick={()=> dispatch(setItem(5))} >
                            <Link to="/myRefferals"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===5 ? "bg-slate-200/40":""}`}
                            >
                                My Refferals
                            </Link>
                        </li>

                        <li onClick={()=> dispatch(setItem(6))} >
                            <Link to="/deposit"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===6 ? "bg-slate-200/40":""}`}
                            >
                                Deposit
                            </Link>
                        </li>

                        <li onClick={()=> dispatch(setItem(7))} >
                            <Link to="/withdraw"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===7 ? "bg-slate-200/40":""}`}
                            >
                                Withdraw
                            </Link>
                        </li> 

                        <li onClick={()=> dispatch(setItem(8))} >
                            <Link to="/transferBalance"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===8 ? "bg-slate-200/40":""}`}
                            >
                                Balance Transfer
                            </Link>
                        </li>

                        

                        <li onClick={() => setUp(!up)} className="cursor-pointer">
                            <div
                                className={`w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl`}
                            >
                                <div className="flex justify-between items-center">
                                    Reports/Logs
                                    <span
                                        className={`transition-transform duration-300 ease-in-out ${
                                            up ? 'rotate-180' : ''
                                        }`}
                                    >
                                        <FaCaretDown />
                                    </span>
                                </div>
                            </div>
                        </li>

                        <div
                            className={`ml-12 mb-1 transition-all duration-300 ease-in-out overflow-hidden ${
                            up ? 'max-h-40' : 'max-h-0'
                            }`}
                        >
                            <ul className="list-disc flex flex-col text-white text-md gap-1">
                                <li
                                    onClick={() => dispatch(setItem(10))}
                                    className="cursor-pointer"
                                >
                                    <Link
                                        to="/reports/deposit"
                                        className={`w-[95%] inline-block hover:bg-slate-200/40 rounded-r-3xl ${
                                            item === 10 ? 'bg-slate-200/40' : ''
                                        }`}
                                    >
                                        Deposit Log
                                    </Link>
                                </li>
                                <li
                                    onClick={() => dispatch(setItem(11))}
                                    className="cursor-pointer"
                                >
                                    <Link
                                        to="/reports/withdraw"
                                        className={`w-[95%] inline-block hover:bg-slate-200/40 rounded-r-3xl ${
                                            item === 11 ? 'bg-slate-200/40' : ''
                                        }`}
                                    >
                                        Withdraw Log
                                    </Link>
                                </li>
                                <li
                                    onClick={() => dispatch(setItem(12))}
                                    className="cursor-pointer"
                                >
                                    <Link
                                        to="/reports/refferal_log"
                                        className={`w-[95%] inline-block hover:bg-slate-200/40 rounded-r-3xl ${
                                            item === 12 ? 'bg-slate-200/40' : ''
                                        }`}
                                    >
                                        Referral Log
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <li onClick={()=> dispatch(setItem(9))} >
                            <Link to="/support"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===9 ? "bg-slate-200/40":""}`}
                            >
                                Support
                            </Link>
                        </li>

                        <li
                            onClick={handleSignOut}
                            className={` cursor-pointer w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl`}
                        >
                            <div className=' flex gap-1 text-lg'>
                                Log Out <FaPowerOff className=' pt-1' size={25}/>
                            </div>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    </div>
  )
}
