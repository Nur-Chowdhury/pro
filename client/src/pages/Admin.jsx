import React from 'react'
import { Link } from 'react-router-dom'

export default function Admin() {
  return (
    <div>
      <div className=' flex items-center justify-center py-8 text-3xl font-extrabold text-white bg-blue-500'>
            Admin Panel
      </div>
      <div className=' flex justify-center mt-4 text-xl font-bold'>
        Welcome to Admin Panel!
      </div>
      <div className=' mb-20 flex justify-center text-red-700 text-xl'>
        <span className=' font-bold'>Warning: </span>
        Changes made here will affect the whole system. Therefore operate cautiously!
      </div>
      <div className=' px-24 w-full flex flex-wrap justify-evenly items-center over'>
        <Link to={'/admin/addTask'}>
            <div className=' flex items-center justify-center px-4 py-2 bg-blue-600 cursor-pointer rounded-lg text-xl
             font-semibold text-white transform transition-transform duration-1000 hover:scale-105'>
                Add Task
            </div>
        </Link>
        <Link to={'/admin/queries'}>
            <div className=' flex items-center justify-center px-4 py-2 bg-blue-600 cursor-pointer rounded-lg text-xl
             font-semibold text-white transform transition-transform duration-1000 hover:scale-105'>
                Queries
            </div>
        </Link>
        <Link to={'/admin/users'}>
            <div className=' flex items-center justify-center px-4 py-2 bg-blue-600 cursor-pointer rounded-lg text-xl
             font-semibold text-white transform transition-transform duration-1000 hover:scale-105'>
                User List
            </div>
        </Link>
        <Link to={'/admin/deposits'}>
            <div className=' flex items-center justify-center px-4 py-2 bg-blue-600 cursor-pointer rounded-lg text-xl
             font-semibold text-white transform transition-transform duration-1000 hover:scale-105'>
                Deposit List
            </div>
        </Link>
        <Link to={'/admin/withdraws'}>
            <div className=' flex items-center justify-center px-4 py-2 bg-blue-600 cursor-pointer rounded-lg text-xl
             font-semibold text-white transform transition-transform duration-1000 hover:scale-105'>
                Withdraw List
            </div>
        </Link>
      </div>
    </div>
  )
}
