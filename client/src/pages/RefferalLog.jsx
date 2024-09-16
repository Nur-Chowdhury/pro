import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { findUserByIDRoute } from '../utils/ApiRoutes';
import Loader from '../components/Loader';


export default function RefferalLog() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    const {userID} = useSelector((state) => state.user);

    useEffect(() => {
        if(userID){
            const fetchUser = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`${findUserByIDRoute}?id=${userID}`);
                    setUserInfo(response.data.user);
                    setLoading(false);
                } catch (error) {
                    console.log(error);
                    toast.error('Failed to load User');
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [userID, currentPage]);

    console.log(userInfo);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

  return (
    <div>
        <div className=' w-full flex justify-start min-h-svh'>
            <div className=' hidden md:flex min-h-svh w-[18%]'>
                <Sidebar className= " overflow-auto" />
            </div>
            <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
                <Nav />
                {loading ? (
                    <div className=' mt-12 flex justify-center'>
                        <Loader />
                    </div>
                ):(<div className=' flex flex-col items-center justify-center gap-20 mt-12'>
                    <h1 className=' font-bold text-3xl'>My Refferal Incomes</h1>

                    <div className="w-[90%] overflow-x-auto rounded shadow-md">
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr>
                                <th className="py-2 px-4 bg-purple-500 text-white text-center">Sl</th>
                                <th className="py-2 px-4 bg-purple-500 text-white text-center">Date</th>
                                <th className="py-2 px-4 bg-purple-500 text-white text-center">Earned</th>
                                <th className="py-2 px-4 bg-purple-500 text-white text-center">From</th>
                                <th className="py-2 px-4 bg-purple-500 text-white text-center">Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userInfo?.refferalIncomeList?.length > 0 ? (
                                userInfo.refferalIncomeList.map((referIncome, index) => (
                                <tr key={referIncome.id} className="border-b">
                                    <td className="py-2 px-4">{index + 1}</td>
                                    <td className="py-2 px-4">{referIncome.earned}</td>
                                    <td className="py-2 px-4">{referIncome.name}</td>
                                    <td className="py-2 px-4">{referIncome.email}</td>
                                    <td className="py-2 px-4">{new Date(referIncome.time).toLocaleDateString()}</td>
                                </tr>
                                ))
                            ) : (
                                <tr>
                                <td className="py-2 px-4 text-center" colSpan="5">
                                    No data found
                                </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>)} 

                {/* Pagination Controls */}
                {totalPages >= 1 && (
                    <div className='flex justify-center mt-4'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`px-4 py-2 mx-1 border rounded-lg ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => handlePageChange(index + 1)}
                                disabled={index + 1 === currentPage}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
