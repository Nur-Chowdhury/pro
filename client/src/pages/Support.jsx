import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { useDispatch, useSelector } from 'react-redux';
import { GoPlus } from "react-icons/go";
import { Link } from 'react-router-dom';
import { setItem } from '../redux/slices/commonSlice';
import { findUserByIDRoute, getUserQueriesRoute } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader';



export default function Support() {

    const {userID} = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [queries, setQueries] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchQueries = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${getUserQueriesRoute}?page=${currentPage}&id=${userID}`);
                setQueries(response.data.data);
                setTotalPages(response.data.totalPages || 1);
                setLoading(false);
            } catch (error) {
                setLoading(false); 
                toast.error('Failed to load queries');
            }
        };
        fetchQueries();
    }, [currentPage]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setItem(9));
    },[])

    console.log(queries);


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
                ):(<div className=' w-full flex flex-col justify-center items-center gap-12 mt-12'>
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
                                {queries?.length > 0 ? (
                                    queries.map((query, index) => (
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
                                        <td className="py-2 px-4 text-center" colSpan="5">
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
