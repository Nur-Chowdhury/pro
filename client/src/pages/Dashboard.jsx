//depricated

import React from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Body from '../components/Body'

export default function Dashboard() {
  return (
    <div>
        <div className=' w-full flex justify-start min-h-svh'>
            <div className=' hidden md:flex min-h-svh w-[18%]'>
                <Sidebar className= " overflow-auto" />
            </div>
            <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
                <Nav />
                <Body /> 
            </div>
        </div>
    </div>
  )
}
