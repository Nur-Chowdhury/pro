import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import { toggleMenu } from '../redux/slices/commonSlice';
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { signoutSuccess } from '../redux/slices/user';


export default function ResponsiveMenu() {

    const {showMenu} = useSelector((state) => state.common);
    const {userInfo} = useSelector((state) => state.user);

    const [nav, setNav] = useState(0);

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
                <div className='flex flex-col items-center justify-center'>
                    <h1 className=' text-2xl font-bold'>{userInfo.name}</h1>
                    <h1 className="text-lg font-medium text-slate-500">${userInfo.balance}</h1>
                </div>

                <nav className=" w-full mt-8 flex flex-col justify-start items-start">
                    <ul className=" w-full text-xl">
                        
                        <li onClick={setMenu}>
                            <a href="#" className="mb-3 inline-block">
                                Dashboard
                            </a>
                        </li>

                        <li className=' mb-3'>
                            <div>
                                <div onClick={() => {
                                        nav===1 ? setNav(0): setNav(1)
                                    }} 
                                    className=' flex justify-between'
                                >
                                    Account
                                    <span>
                                        {nav==1 ? (
                                            <FaCaretUp className="transition-all duration-200" />
                                        ):
                                        (
                                            <FaCaretDown className="transition-all duration-200" />
                                        )}
                                    </span>
                                </div>
                                {nav===1 && (
                                    <ul className=" ml-4 mt-2 flex flex-col text-white text-md gap-2">
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                        Profile
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                        Password Change
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                        Pin Change
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                        Verification
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>

                        <li className=' mb-3'>
                            <div>
                                <div onClick={() => {
                                        nav===2 ? setNav(0): setNav(2)
                                    }} 
                                    className=' flex justify-between'
                                >
                                    Coupon Manage
                                    <span>
                                        {nav==2 ? (
                                            <FaCaretUp className="transition-all duration-200" />
                                        ):
                                        (
                                            <FaCaretDown className="transition-all duration-200" />
                                        )}
                                    </span>
                                </div>
                                {nav===2 && (
                                    <ul className=" ml-4 mt-2 flex flex-col text-white text-md gap-2">
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Purchase Coupon
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Coupon List
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Transfer Report
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Received Report
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>

                        <li className=' mb-3'>
                            <div>
                                <div onClick={() => {
                                        nav===3 ? setNav(0): setNav(3)
                                    }} 
                                    className=' flex justify-between'
                                >
                                    Task Market
                                    <span>
                                        {nav===3 ? (
                                            <FaCaretUp className="transition-all duration-200" />
                                        ):
                                        (
                                            <FaCaretDown className="transition-all duration-200" />
                                        )}
                                    </span>
                                </div>
                                {nav===3 && (
                                    <ul className=" ml-4 mt-2 flex flex-col text-white text-md gap-2">
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Purchase Task
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Purchase Report
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Transfer Task
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Offer Task
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>

                        <li className=' mb-3'>
                            <div>
                                <div onClick={() => {
                                        nav===4 ? setNav(0): setNav(4)
                                    }} 
                                    className=' flex justify-between'
                                >
                                    My Team
                                    <span>
                                        {nav===4 ? (
                                            <FaCaretUp className="transition-all duration-200" />
                                        ):
                                        (
                                            <FaCaretDown className="transition-all duration-200" />
                                        )}
                                    </span>
                                </div>
                                {nav===4 && (
                                    <ul className=" ml-4 mt-2 flex flex-col text-white text-md gap-2">
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Referral List
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Team Members
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>

                        <li onClick={setMenu}>
                            <a href="#" className="mb-3 inline-block">
                                Extra Reward
                            </a>
                        </li>

                        <li className=' mb-3'>
                            <div>
                                <div onClick={() => {
                                        nav===5 ? setNav(0): setNav(5)
                                    }} 
                                    className=' flex justify-between'
                                >
                                    Team Bonus
                                    <span>
                                        {nav===5 ? (
                                            <FaCaretUp className="transition-all duration-200" />
                                        ):
                                        (
                                            <FaCaretDown className="transition-all duration-200" />
                                        )}
                                    </span>
                                </div>
                                {nav===5 && (
                                    <ul className=" ml-4 mt-2 flex flex-col text-white text-md gap-2">
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Referral Bonus
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Task Bonus
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Agent Bonus
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Other Bonus
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>

                        <li className=' mb-3'>
                            <div>
                                <div onClick={() => {
                                        nav===6 ? setNav(0): setNav(6)
                                    }} 
                                    className=' flex justify-between'
                                >
                                    Team Bonus
                                    <span>
                                        {nav===6 ? (
                                            <FaCaretUp className="transition-all duration-200" />
                                        ):
                                        (
                                            <FaCaretDown className="transition-all duration-200" />
                                        )}
                                    </span>
                                </div>
                                {nav===6 && (
                                    <ul className=" ml-4 mt-2 flex flex-col text-white text-md gap-2">
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Deposit
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Transfer
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Withdraw
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>

                        <li className=' mb-3'>
                            <div>
                                <div onClick={() => {
                                        nav===7 ? setNav(0): setNav(7)
                                    }} 
                                    className=' flex justify-between'
                                >
                                    Transaction Report
                                    <span>
                                        {nav===7 ? (
                                            <FaCaretUp className="transition-all duration-200" />
                                        ):
                                        (
                                            <FaCaretDown className="transition-all duration-200" />
                                        )}
                                    </span>
                                </div>
                                {nav===7 && (
                                    <ul className=" ml-4 mt-2 flex flex-col text-white text-md gap-2">
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Deposit Report
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Transfer Report
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Receive Report
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Withdraw Report
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>

                        <li className=' mb-3'>
                            <div>
                                <div onClick={() => {
                                        nav===8 ? setNav(0): setNav(8)
                                    }} 
                                    className=' flex justify-between'
                                >
                                    Exchange Report
                                    <span>
                                        {nav===8 ? (
                                            <FaCaretUp className="transition-all duration-200" />
                                        ):
                                        (
                                            <FaCaretDown className="transition-all duration-200" />
                                        )}
                                    </span>
                                </div>
                                {nav===8 && (
                                    <ul className=" ml-4 mt-2 flex flex-col text-white text-md gap-2">
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Purchase In
                                        </li>
                                        <li onClick={setMenu} className="cursor-pointer hover:text-primary">
                                            Purchase Out
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>

    </div>
  )
}
