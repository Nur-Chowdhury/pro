import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { toggleMenu } from '../redux/slices/commonSlice';
import Aos from 'aos'
import 'aos/dist/aos.css'
import ResponsiveMenu from './ResponsiveMenu';
 //Return To Player Tomb Raider King Tower of God


export default function Nav() {

    const {showMenu} = useSelector((state) => state.common);

    const dispatch = useDispatch();


    const setMenu = () => {
        dispatch(toggleMenu());
    };

    useEffect(()=>{
        Aos.init({duration: 2000})
    },[])


    return (
        <>
            <header
                data-aos="fade"
                data-aos-duration="300"
                className="relative z-[998] border-b-[1px]  border-primary/50 bg-blue-500 text-white shadow-lg"
            >
                <nav className=" w-full flex h-[70px] items-center px-4 md:px-0 ">
                    <div className='w-[45%] flex justify-start items-center'>
                        <div className="flex items-center gap-4 md:hidden ">
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
                    </div>
                    <div className=' w-[55%] flex justify-between md:justify-end items-center md:pr-16'>
                        <div className=" md:hidden text-2xl text-white md:text-3xl ">
                            <a href="/dashboard" className="">LOGO</a>
                        </div>
                        <div>
                            hi
                            {/* gotta do it later */}
                        </div>
                    </div>
                </nav>
            </header>
            <ResponsiveMenu />
        </>
    )
}
