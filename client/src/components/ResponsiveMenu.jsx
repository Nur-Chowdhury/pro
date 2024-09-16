import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaPowerOff, FaUserCircle } from "react-icons/fa";
import { setItem, toggleMenu } from '../redux/slices/commonSlice';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/slices/user';


export default function ResponsiveMenu() {

    const {showMenu, item} = useSelector((state) => state.common);

    const [up, setUp] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setMenu = () => {
        dispatch(toggleMenu());
    };

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
      className={`${showMenu ? "left-0" : "-left-[100%]"}
      fixed bottom-0 top-0 z-20 flex h-full w-[75%] flex-col overflow-y-auto justify-between bg-slate-950 px-8 pb-6 pt-24
    text-white transition-all duration-200 md:hidden`}
    >
        <div className="card">
            <div className="flex flex-col items-center justify-center gap-3">
                <FaUserCircle size={50} />

                <nav className=" w-full mt-8 flex flex-col justify-start items-start">
                    <ul className=" w-full text-xl">
                        <li onClick={()=> {
                            dispatch(setItem(1));
                            setMenu();
                        }} >
                            <Link to="/dashboard"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===1 ? "bg-slate-200/40":""}`}
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li onClick={()=> {
                            dispatch(setItem(2));
                            setMenu();
                        }} >
                            <Link to="/survey" 
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===2 ? "bg-slate-200/40":""}`}
                            >
                                Start Survey
                            </Link>
                        </li>

                        <li onClick={()=> {
                            dispatch(setItem(3));
                            setMenu();
                        }} >
                            <Link to="/plans"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===3 ? "bg-slate-200/40":""}`}
                            >
                                Plan
                            </Link>
                        </li>

                        <li onClick={()=> {
                            dispatch(setItem(5));
                            setMenu();
                        }} >
                            <Link to="/myRefferals"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===5 ? "bg-slate-200/40":""}`}
                            >
                                My Refferals
                            </Link>
                        </li>

                        <li onClick={()=> {
                            dispatch(setItem(6));
                            setMenu();
                        }} >
                            <Link to="/deposit"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===6 ? "bg-slate-200/40":""}`}
                            >
                                Deposit
                            </Link>
                        </li>

                        <li onClick={()=> {
                            dispatch(setItem(7));
                            setMenu();
                        }} >
                            <Link to="/withdraw"
                                className={` w-[95%] mb-3 inline-block hover:bg-slate-200/40 px-2 py-2 rounded-r-3xl ${item===7 ? "bg-slate-200/40":""}`}
                            >
                                Withdraw
                            </Link>
                        </li> 

                        <li onClick={()=> {
                            dispatch(setItem(8));
                            setMenu();
                        }} >
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
                                <li onClick={()=> {
                                    dispatch(setItem(10));
                                    setMenu();
                                }} >
                                    <Link
                                        to="/reports/deposit"
                                        className={`w-[95%] inline-block hover:bg-slate-200/40 rounded-r-3xl ${
                                            item === 10 ? 'bg-slate-200/40' : ''
                                        }`}
                                    >
                                        Deposit Log
                                    </Link>
                                </li>
                                <li onClick={()=> {
                                    dispatch(setItem(11));
                                    setMenu();
                                }} >
                                    <Link
                                        to="/reports/withdraw"
                                        className={`w-[95%] inline-block hover:bg-slate-200/40 rounded-r-3xl ${
                                            item === 11 ? 'bg-slate-200/40' : ''
                                        }`}
                                    >
                                        Withdraw Log
                                    </Link>
                                </li>
                                <li onClick={()=> {
                                    dispatch(setItem(12));
                                    setMenu();
                                }} >
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

                        <li onClick={()=> {
                            dispatch(setItem(9));
                            setMenu();
                        }} >
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
