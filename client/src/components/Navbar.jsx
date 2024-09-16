import React, { useState } from 'react'
import { FaCaretDown } from "react-icons/fa";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../redux/slices/commonSlice';
import ResponsiveMenu from './ResponsiveMenu';

export default function Navbar() {

  const {showMenu} = useSelector((state) => state.common);
  const dispatch = useDispatch();


  const setMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <>
      <header
            data-aos="fade"
            data-aos-duration="300"
            className="relative z-[999] border-b-[1px]  border-primary/50 text-white shadow-lg"
        >
          <nav className="container flex h-[70px] items-center justify-between py-2 gap-8 ">
              <div className="text-2xl text-white md:text-3xl ">
                <a href="/home" className="">LOGO</a>
              </div>
              <div className="hidden xl:block">
                <ul className="flex items-center gap-10">
                  <li className="group relative cursor-pointer">
                    <a
                      href="/dashboard"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li className="cursor pointer group">
                    <a
                      href="/account"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      Account{" "}
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden rounded-b-xl p-4 bg-gray-900 text-black group-hover:block  ">
                      <div className=" flex flex-col justify-center items-center ">
                        <ul className="mt-3 flex flex-col text-white text-lg gap-2">
                          <li className="cursor-pointer hover:text-primary">
                            Profile
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Password<br />Change
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Pin<br />Change
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Verification
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="cursor pointer group">
                    <a
                      href="/account"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      Coupon Manage{" "}
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden rounded-b-xl p-4 bg-gray-900 text-black group-hover:block  ">
                      <div className=" flex flex-col justify-center items-center ">
                        <ul className="mt-3 flex flex-col text-white text-lg gap-2">
                          <li className="cursor-pointer hover:text-primary">
                            Purchase<br />Coupon
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Coupon<br />List
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Transfer<br />Report
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Received<br />Report
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="cursor pointer group">
                    <a
                      href="/account"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      Task Market{" "}
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden rounded-b-xl p-4 bg-gray-900 text-black group-hover:block  ">
                      <div className=" flex flex-col justify-center items-center ">
                        <ul className="mt-3 flex flex-col text-white text-lg gap-2">
                          <li className="cursor-pointer hover:text-primary">
                            Purchase<br />Task
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Purchase<br />Report
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Transfer<br />Task
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Offer<br />Task
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="cursor pointer group">
                    <a
                      href="/account"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      My Team{" "}
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden rounded-b-xl p-4 bg-gray-900 text-black group-hover:block  ">
                      <div className=" flex flex-col justify-center items-center ">
                        <ul className="mt-3 flex flex-col text-white text-lg gap-2">
                          <li className="cursor-pointer hover:text-primary">
                            Referral<br />List 
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Team<br />Members
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="cursor pointer group">
                    <a
                      href="/account"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      Extra Reward
                    </a>
                  </li>
                  <li className="cursor pointer group">
                    <a
                      href="/account"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      Team Bonus{" "}
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden rounded-b-xl p-4 bg-gray-900 text-black group-hover:block  ">
                      <div className=" flex flex-col justify-center items-center ">
                        <ul className="mt-3 flex flex-col text-white text-lg gap-2">
                          <li className="cursor-pointer hover:text-primary">
                            Referral<br />Bonus
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Task<br />Bonus
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Agent<br />Bonus
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Other<br />Bonus
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="cursor pointer group">
                    <a
                      href="/account"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      Transaction{" "}
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden rounded-b-xl p-4 bg-gray-900 text-black group-hover:block  ">
                      <div className=" flex flex-col justify-center items-center ">
                        <ul className="mt-3 flex flex-col text-white text-lg gap-2">
                          <li className="cursor-pointer hover:text-primary">
                            Deposit
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Transfer
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Withdraw
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="cursor pointer group">
                    <a
                      href="/account"
                      className="flex h-[72px] items-center gap-[2px]"
                    >
                      Exchange Report{" "}
                      <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                      </span>
                    </a>
                    <div className="absolute z-[9999] hidden rounded-b-xl p-4 bg-gray-900 text-black group-hover:block  ">
                      <div className=" flex flex-col justify-center items-center ">
                        <ul className="mt-3 flex flex-col text-white text-lg gap-2">
                          <li className="cursor-pointer hover:text-primary">
                            Purchase In
                          </li>
                          <li className="cursor-pointer hover:text-primary">
                            Purchase Out
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>



                  {/* <li className="cursor pointer">
                    <a href="/#contact">About us</a>
                  </li>
                  <div className="flex items-center gap-4">
                    <li>
                      <BiPhoneCall className="h-[40px] w-[40px] rounded-md bg-primary p-2 text-2xl text-white hover:bg-primary/90" />
                    </li>
                    <li>
                      <div>
                        <p className="text-sm">Call us on</p>
                        <p className="text-lg">
                          {" "}
                          <a href="tel:+880xxxxxxxxxx">+880 XXXXXXXXXX</a>
                        </p>
                      </div>
                    </li>
                  </div> */}
                  
                </ul>
              </div> 

              <div className="flex items-center gap-4 xl:hidden ">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={setMenu}
                    className=" cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={setMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
          </nav>
      </header>
      <ResponsiveMenu />
    </>
  )
}
