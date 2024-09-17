import React, { useEffect, useState } from 'react'
import { acceptWithdrawRoute, getAllWithdrawsRoute, rejectWithdrawRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';



export default function WithdrawList() {

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [withdraws, setWithdraws] = useState([]);
    const [wit, setWit] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWithdraws = async () => {
          setLoading(true);
            try {
                const response = await axios.get(`${getAllWithdrawsRoute}?page=${currentPage}`);
                setWithdraws(response.data.data);
                setTotalPages(response.data.totalPages || 1);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error('Failed to load users');
            }
        };
        fetchWithdraws();
    }, [currentPage, wit]);
    

    const handleAccept = async (withdrawID) => {
        try {
            const response = await axios.post(acceptWithdrawRoute, {withdrawID});
            toast.success("Accepted Succesfully!");
            setWit(response.data.data);
        } catch (error) {
            toast.error('Failed');
        }
    };

    const handleReject = async (withdrawID) => {
        try {
            const response = await axios.post(rejectWithdrawRoute, {withdrawID});
            toast.success("Rejected Succesfully!");
            setWit(response.data.data);
        } catch (error) {
          toast.error('Failed');
        }
    };

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    if(loading){
      return(
        <div className=' mt-12 flex justify-center'>
          <Loader />
        </div>
      )
    }

  return (
    <div>
        <div className=' flex items-center justify-center py-8 text-3xl font-extrabold text-white bg-blue-500'>
            Admin Panel
        </div>
        <div className='w-full flex flex-col justify-center items-center gap-6 mt-12'>
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
                  <th className=" py-2 px-4 bg-purple-500 text-white text-center">Actions</th>
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
                      <td className="py-2 px-4 flex flex-col gap-2 justify-center items-center">
                        <button className={` px-2 py-1 text-white font-medium bg-green-500 rounded 
                          ${(withdraw.status === "Pending") ? " cursor-pointer": " cursor-not-allowed opacity-80"}`}
                          onClick={() => handleAccept(withdraw._id)}
                          disabled = {!(withdraw.status === "Pending")}
                        >
                          Accept
                        </button>
                        <button className={` px-2 py-1 text-white font-medium bg-red-500 rounded 
                          ${(withdraw.status === "Pending") ? " cursor-pointer": " cursor-not-allowed opacity-80"}`}
                          onClick={() => handleReject(withdraw._id)}
                          disabled = {!(withdraw.status === "Pending")}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className=' w-full'>
                    <td className=" w-full py-2 px-4 text-center" colSpan="8">
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
        </div>
    </div>
  )
}
