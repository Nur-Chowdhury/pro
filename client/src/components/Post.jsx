import React, { useEffect, useState } from 'react'
import { IoMdAlert } from "react-icons/io";
import { FcSurvey } from "react-icons/fc";
import survey from '../assets/survey.jpg';
import {useDispatch, useSelector} from  'react-redux'
import { getTask } from '../redux/actions/taskAction';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { findUserByIDRoute } from '../utils/ApiRoutes';
import {toast} from 'react-toastify'

axios.defaults.withCredentials = true;

export default function Post() {

  const {currentTask} = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const {userID} = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      const fetchUser = async () => {
          setLoading(true);
          try {
              const response = await axios.get(`${findUserByIDRoute}?id=${userID}`);
              setUserInfo(response.data);
              setLoading(false);
          } catch (error) {
              console.log(error);
              toast.error('Failed to load User');
              setLoading(false);
          }
      };
      fetchUser();
  }, [userID]);

  console.log(currentTask, userInfo.currentSurvey);
  

  useEffect(() => {
    if (currentTask === null && userInfo.currentSurvey) {
      dispatch(getTask(userInfo.currentSurvey));
    }
  }, []);

  return (
    <div className=' w-full flex flex-col justify-center items-center gap-12'>
        <h1 className=' font-bold text-3xl'>Surveys</h1>

        <div className=' w-[95%] bg-blue-700 rounded-xl'>
            <div className=' w-full text-white font-bold text-xl p-2 flex gap-1'>
              <IoMdAlert size={30} />
              Notice Board
            </div>
            <div className=' bg-white w-full p-2 rounded-b-xl'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
              non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
        </div>

        <div className=' w-[95%] bg-blue-700 rounded-xl my-12'>
            <div className=' w-full text-white font-bold text-xl p-2 flex gap-1'>
              <FcSurvey size={30} />
              Survey List
            </div>
            <div className=' bg-white flex justify-center items-center py-8 rounded-b-xl'>
              { userInfo?.currentSurvey ? (
                  <div className='h-[420px] w-[60%] sm:w-[50%] md:w-[40%] lg:w-[25%] shadow-2xl rounded-xl py-1 px-4'>
                    <div className=' flex justify-center items-center h-[55%] pt-4'>
                      <img
                        src={survey}
                        className=' h-full w-full'
                      />
                    </div>
                    <div className=' flex flex-col gap-1 my-2'>
                      <p className=' text-lg font-medium'>Survey#{userInfo.surveyCount+1}</p>
                      <p className=' text-md font-medium opacity-60'>{currentTask?.name}</p>
                      <p className=' text-md font-medium text-[#28C76F]'>Reward: {currentTask?.reward}</p>
                      <p className=' text-md font-medium text-[#28C76F]'>Task Done: {userInfo?.currentIndex}/{currentTask?.questions?.length}</p>
                    </div>
                    <Link to={'/questions'}><div className='flex justify-center items-center px-4 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg hover:text-gray-700
                    hover:bg-transparent hover:border-2 hover:border-blue-600 cursor-pointer transition duration-500'>
                        Start survey
                    </div></Link>
                  </div>
              ):(
                <div>Come Back Tommorrow to do more survey!</div>
              )}
            </div>
            
        </div>

    </div>
  )
}
