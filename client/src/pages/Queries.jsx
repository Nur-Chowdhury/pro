import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReplyRoute, findUserByIDRoute, getAllQueriesRoute } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';


export default function Queries() {
  const [queries, setQueries] = useState([]);
  const [reply, setReply] = useState(-1);
  const [description, setDescription] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const {userID} = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

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
    }, [userID]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${getAllQueriesRoute}?page=${currentPage}`);
        setQueries(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        toast.error('Failed to load queries');
      }
    };
    fetchQueries();
  }, [currentPage]); 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post(addReplyRoute, {
        queryId: id,
        reply: description,
        adminId: userInfo._id,
      });
      setQueries(queries.map((q) => (q._id === id ? response.data.data : q)));
      setDescription("");
      toast.success("Replied!");
      setReply(-1);
    } catch (error) {
      toast.error('Failed to add reply');
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
      <div className='flex items-center justify-center py-8 text-3xl font-extrabold text-white bg-blue-500'>
        Admin Panel
      </div>
      <div className='w-full flex flex-col justify-center items-center gap-6 mt-12'>
        <div className='w-[90%] flex justify-between items-center'>
          <span className='font-medium text-2xl text-gray-700'>Queries</span>
        </div>
        <div className="w-[90%] overflow-x-auto rounded shadow-md">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="w-[10%] py-2 px-4 bg-purple-500 text-white text-center">Token No.</th>
                <th className="w-[14%] py-2 px-4 bg-purple-500 text-white text-center">User</th>
                <th className="w-[38%] py-2 px-4 bg-purple-500 text-white text-center">Query</th>
                <th className="py-2 px-4 bg-purple-500 text-white text-center">Reply</th>
              </tr>
            </thead>
            <tbody>
              {queries?.length > 0 ? (
                queries.map((query, index) => (
                  <tr key={index} className="border-b">
                    <td className="w-[10%] py-2 px-4 border-r-2 text-center">{query.token}</td>
                    <td className="w-[14%] py-2 px-4 border-r-2 text-center">{query.userID.email}</td>
                    <td className="w-[38%] py-2 px-4 border-r-2 text-center">{query.query}</td>
                    <td className="py-2 px-4 flex justify-center items-center">
                      {query.reply ? (
                        <div className='w-full flex flex-col'>
                          <span className='text-lg text-center'>{query.reply}</span>
                          <span className='text-sm text-left text-gray-500 font-medium'>Replied by: {` ${query.admin.name}`}</span>
                        </div>
                      ) : (
                        reply === index ? (
                          <form onSubmit={(e) => handleSubmit(e, query._id)} className='w-full flex flex-col gap-2'>
                            <div className='w-full flex flex-col justify-start gap-2'>
                              <textarea
                                id='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                                placeholder='Enter your reply'
                                required
                              ></textarea>
                            </div>
                            <div className='flex justify-between'>
                              <button
                                type='submit'
                                className='w-[70px] bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200'
                              >
                                Send
                              </button>
                              <button
                                onClick={() => setReply(-1)}
                                className='w-[70px] bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200'
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <div
                            className='w-[70px] py-1 bg-green-500 rounded text-center text-white font-medium cursor-pointer'
                            onClick={() => setReply(index)}
                          >
                            Reply
                          </div>
                        )
                      )}
                    </td>
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
  );
}
