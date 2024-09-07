import React from 'react'
import { useSelector } from 'react-redux';
import Pre from '../components/Pre';
import Post from '../components/Post';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';

export default function Survey() {

    const { userInfo } = useSelector((state) => state.user);

  return (
    <div>
        <div className=' w-full flex justify-start min-h-svh'>
            <div className=' hidden md:flex min-h-svh w-[18%]'>
                <Sidebar className= " overflow-auto" />
            </div>
            <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
                <Nav />
                <div className=' mt-12'>
                    {userInfo.subscribed === "none" ? (
                        <div>
                            <Pre />
                        </div>
                    ) : (
                        <div>
                            <Post />
                        </div> 
                    )}
                </div>  
            </div>
        </div>
    </div>
  )
}
