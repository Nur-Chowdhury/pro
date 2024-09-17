import React, { useEffect, useState } from 'react'
import { banUserRoute, getAllUsersRoute, makeAdminRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import {toast} from 'react-toastify' 
import Loader from '../components/Loader';


export default function UserList() {

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${getAllUsersRoute}?page=${currentPage}`);
        if (data.success) {
          setUsers(data.data);
          setTotalPages(data.totalPages);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleMakeAdmin = async (userId) => {
    try {
      await axios.post(`${makeAdminRoute}/${userId}`);
      setUsers(users.map(user => user._id === userId ? { ...user, admin: true } : user));
      toast.success("User promoted to Admin!");
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to make user admin');
    }
  };

  const handleBanUser = async (userId) => {
    try {
      await axios.post(`${banUserRoute}/${userId}`);
      setUsers(users.map(user => user._id === userId ? { ...user, banned: true } : user));
      toast.success("User Banned Successfully!");
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to Ban User!');
    }
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
          <span className='font-medium text-2xl text-gray-700'>User List</span>

          {/* add search option */}

        </div>
        <div className="w-[90%] overflow-x-auto rounded shadow-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Name</th>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Email</th>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Subscribed Plan</th>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Deposited</th>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Invested</th>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Withdrawed</th>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Reffered</th>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Refferal Income</th>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Survey Done</th>
                <th className="py-2 px-4 bg-purple-500 text-white text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="border-b">
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{user.name}</td>
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{user.email}</td>
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{user.subscribed}</td>
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{user.deposit}</td>
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{user.invest}</td>
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{user.withdraw}</td>
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{user.refers.length}</td>
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{user.refferalIncome}</td>
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{user.surveyCount}</td>
                    <td className="py-2 px-4">
                      {(!user.admin && !user.banned) && (
                        <div className=' flex flex-col justify-center items-center gap-2'>
                          <button 
                            onClick={() => handleMakeAdmin(user._id)} 
                            className="bg-green-500 text-white px-2 py-1 rounded"
                          >
                            Make Admin
                          </button>
                          <button 
                            onClick={() => handleBanUser(user._id)} 
                            className="bg-red-700 text-white px-2 py-1 rounded"
                          >
                            Ban User
                          </button>
                        </div>
                      )}
                      {user.admin && (
                        <div className=' text-center text-green-500 text-xl font-semibold '>Admin</div>
                      )}
                      {user.banned && (
                        <div className=' text-center text-red-500 text-xl font-semibold '>Banned</div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2 px-4 text-center" colSpan="10">
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
