import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux';
import { findUserByIDRoute, getUserWithdrawsRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';


export default function UserWithdrawList() {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [withdraws, setWithdraws] = useState([]);
  
  const {userID} = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get('status');

  useEffect(() => {
    const fetchWithdraws = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`${getUserWithdrawsRoute}?page=${currentPage}&id=${userID}&status=${status || ''}`);
          setWithdraws(response.data.data);
            setTotalPages(response.data.totalPages || 1);
            setLoading(false);
        } catch (error) {
            setLoading(false); 
            toast.error('Failed to load users');
        }
    };
    fetchWithdraws();
}, [currentPage, status]);

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
          ):(<div className='w-full flex flex-col justify-center items-center gap-6 mt-12'>
            <div className='w-[90%] flex justify-between items-center'>
              <span className='font-medium text-2xl text-gray-700'>Withdraw List</span>
              {/* add search option */}
            </div>

            <div className="w-[90%] overflow-x-auto rounded shadow-md">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className=" py-2 px-4 bg-purple-500 text-white text-center">Token No.</th>
                    <th className=" py-2 px-4 bg-purple-500 text-white text-center">Name</th>
                    <th className=" w-[15%] py-2 px-4 bg-purple-500 text-white text-center">Email</th>
                    <th className=" w-[15%] py-2 px-4 bg-purple-500 text-white text-center">Account No.</th>
                    <th className=" py-2 px-4 bg-purple-500 text-white text-center">Amount</th>
                    <th className=" py-2 px-4 bg-purple-500 text-white text-center">Type</th>
                    <th className=" py-2 px-4 bg-purple-500 text-white text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {withdraws?.length > 0 ? (
                    withdraws.map((withdraw, index) => (
                      <tr key={index} className="border-b">
                        <td className=" py-2 px-4 border-r-2 text-center">{withdraw.token || index+1}</td>
                        <td className=" py-2 px-4 border-r-2 text-center">{withdraw.userID.name}</td>
                        <td className="w-[15%] py-2 px-4 border-r-2 text-center">{withdraw.userID.email}</td>
                        <td className="w-[15%] py-2 px-4 border-r-2 text-center">{withdraw.accountNumber}</td>
                        <td className=" py-2 px-4 border-r-2 text-center">{withdraw.amount}</td>
                        <td className=" py-2 px-4 border-r-2 text-center">{withdraw.type}</td>
                        <td className=" py-2 px-4 border-r-2 text-center">{withdraw.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className=' w-full'>
                      <td className=" w-full py-2 px-4 text-center" colSpan="7">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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
          </div>)}
        </div>
    
      </div>
    </div>
  )
}
