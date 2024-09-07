import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { useDispatch, useSelector } from 'react-redux';
import { addQuery } from '../redux/actions/queryActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewQuery() {
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userInfo} = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(description);
        const data = dispatch(addQuery(description, userInfo._id));
        if(data){
            setDescription('');
            toast.success("Your Query is being Processed. Please Wait...");
            navigate('/dashboard');
        }
    };

  return (
    <div>
      <div className=' w-full flex justify-start min-h-svh'>
        <div className=' hidden md:flex min-h-svh w-[18%]'>
          <Sidebar className= " overflow-auto" />
        </div>
        <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto'>
          <Nav />
          <div className=' w-full flex justify-center'>
            <div className=' w-[90%] flex flex-col items-center justify-center gap-20 my-8'>
                <span className=' w-full text-center text-2xl font-bold'>Your Query</span>

                <form onSubmit={handleSubmit} className=' w-full flex flex-col gap-8'>
                    <div className=' w-full flex flex-col justify-start gap-2'>
                        <label htmlFor='description' className='text-gray-800 text-xl font-medium'>Description</label>
                        <textarea
                            id='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
                            placeholder='Enter your query'
                            required
                        ></textarea>
                    </div>
                    <button
                        type='submit'
                        className='bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200'>
                        Submit Query
                    </button>
                </form>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  )
}
