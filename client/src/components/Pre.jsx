import React from 'react'
import { IoMdAlert } from "react-icons/io";
import { FcSurvey } from "react-icons/fc";

export default function Pre() {
  return (
    <div className=' w-full flex flex-col justify-center items-center gap-12'>
        <h1 className=' font-bold text-3xl'>Surveys</h1>

        <div className=' w-[95%] bg-blue-700 rounded-xl'>
            <div className=' w-full text-white font-bold text-xl p-2 flex gap-1'>
              <IoMdAlert size={30} />
              Notice Board
            </div>
            <div className=' bg-white w-full p-2 rounded-b-xl'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>

        <div className=' w-[95%] bg-blue-700 rounded-xl mt-12'>
            <div className=' w-full text-white font-bold text-xl p-2 flex gap-1'>
              <FcSurvey size={30} />
              Survey List
            </div>
            <div className=' bg-white w-full p-2 rounded-b-xl text-red-700 flex items-center justify-center text-xl'>
              You must subscribe to a plan to participate in Surveys!
            </div> 
        </div>

    </div>
  )
}
