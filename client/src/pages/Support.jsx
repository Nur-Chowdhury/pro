import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { useDispatch, useSelector } from 'react-redux';
import { GoPlus } from "react-icons/go";
import { Link } from 'react-router-dom';
import { setItem } from '../redux/slices/commonSlice';

export default function Support() {

    const {userInfo} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setItem(9));
    },[])


  return (
    <div>
        <div className=' w-full flex justify-start min-h-svh'>
            <div className=' hidden md:flex min-h-svh w-[18%]'>
                <Sidebar className= " overflow-auto" />
            </div>
            <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
                <Nav /> 
                <div className=' w-full flex flex-col justify-center items-center gap-12 mt-12'>
                    <div className=' w-[90%] flex justify-between items-center'>
                        <span className=' font-medium text-2xl text-gray-700'>Queries</span>
                        <Link to={'/newQuery'}>
                            <div className=' flex px-2 py-1 bg-green-400 rounded text-white cursor-pointer font-medium'>
                                <GoPlus size={30}/>
                                <span className=' text-lg'>New Query</span>
                            </div>
                        </Link>
                    </div>
                    <div className="w-[90%] overflow-x-auto rounded shadow-md">
                        <table className="min-w-full bg-white">
                            <thead>
                                <tr>
                                    <th className=" w-[12%] py-2 px-4 bg-purple-500 text-white text-center">Token No.</th>
                                    <th className=" w-[32%] py-2 px-4 bg-purple-500 text-white text-center">Query</th>
                                    <th className=" w-[12%] py-2 px-4 bg-purple-500 text-white text-center">Status</th>
                                    <th className=" w-[32%] py-2 px-4 bg-purple-500 text-white text-center">Reply</th>
                                    <th className=" w-[12%] py-2 px-4 bg-purple-500 text-white text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userInfo?.queries?.length > 0 ? (
                                    userInfo.queries.map((query, index) => (
                                        <tr key={index} className="border-b">
                                            <td className=" w-[12%] py-2 px-4">{query.token}</td>
                                            <td className=" w-[32%] py-2 px-4">{query.query}</td>
                                            <td className=" w-[12%] py-2 px-4">{query.status}</td>
                                            <td className=" w-[32%] py-2 px-4">{query.reply ? query.reply: "Please Wait..."}</td>
                                            <td className=" w-[12%] py-2 px-4">Actions</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="py-2 px-4 text-center" colSpan="6">
                                            No data found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
