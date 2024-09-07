import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setItem } from '../redux/slices/commonSlice';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';

export default function Refferal() {

    const {userInfo} = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [copied, setCopied] = useState(false);
    const link = `/register/?ref=${userInfo ? userInfo.referralId:""}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
    };

    useEffect(() => {
        dispatch(setItem(5));
    }, []);

  return (
    <div>
        <div className=' w-full flex justify-start min-h-svh'>
            <div className=' hidden md:flex min-h-svh w-[18%]'>
                <Sidebar className= " overflow-auto" />
            </div>
            <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
                <Nav />
                <div className=' flex flex-col items-center justify-center gap-20 mt-12'>
                    <div className=" w-[90%] py-4 bg-white rounded shadow-md">
                        <label className="block text-gray-600 text-xl font-medium mb-4 px-4">
                            Referrer Link
                        </label>
                        <div className=' w-full p-[0.1px] bg-gray-400'></div>
                        <div className=" flex items-center m-4">
                            <input
                                type="text"
                                value={link}
                                readOnly
                                className="flex-1 py-2 px-4 border rounded-l-md text-gray-700 bg-gray-100 focus:outline-none rounded"
                            />
                            <button
                                onClick={copyToClipboard}
                                className="py-2 px-4 bg-purple-500 text-white rounded-r-md hover:bg-purple-600 transition-colors duration-300"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>
                    <div className="w-[90%] overflow-x-auto rounded shadow-md">
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr>
                                <th className="py-2 px-4 bg-purple-500 text-white text-center">Sl</th>
                                <th className="py-2 px-4 bg-purple-500 text-white text-center">Name</th>
                                <th className="py-2 px-4 bg-purple-500 text-white text-center">Email</th>
                                <th className="py-2 px-4 bg-purple-500 text-white text-center">Join Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userInfo?.refers.length > 0 ? (
                                userInfo.refers.map((refer, index) => (
                                <tr key={refer.id} className="border-b">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{userInfo?.refers.user}</td>
                                    <td className="py-2 px-4">{userInfo?.refers.email}</td>
                                    <td className="py-2 px-4">{new Date(userInfo.refers.joined).toLocaleDateString()}</td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td className="py-2 px-4 text-center" colSpan="4">
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
