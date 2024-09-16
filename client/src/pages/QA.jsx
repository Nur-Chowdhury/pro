import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { useDispatch, useSelector } from 'react-redux';
import { setItem } from '../redux/slices/commonSlice';
import { nextIndex, surveyDone } from '../redux/actions/taskAction';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { findUserByIDRoute } from '../utils/ApiRoutes';
import axios from 'axios';
import Loader from '../components/Loader';



export default function QA() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {currentTask} = useSelector((state) => state.task);

  const [ans, setAns] = useState("");

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

  const handleDone = (e) => {
    e.preventDefault();

    if(ans){
        if(currentTask.questions[userInfo.currentIndex].answer === "*"){
            dispatch(surveyDone(userInfo._id, currentTask._id));
            setAns("");
            toast.success("Congrats! You have Successfully Completed the Task.")
            navigate('/survey');
        }else{
            if(ans === currentTask.questions[userInfo.currentIndex].answer){
                dispatch(surveyDone(userInfo._id, currentTask._id));
                setAns("");
                toast.success("Congrats! You have Successfully Completed the Task.")
                navigate('/survey');
            }else{
                toast.warning("Please Give the Correct Answer!");
            }
        }
    }else{
        toast.warning("Please Give the Correct Answer!");
    }
  }

  const handleNext = (e) => {
    e.preventDefault();
    console.log(ans);

    if(ans){
        if(currentTask.questions[userInfo.currentIndex].answer === "*"){
            dispatch(nextIndex(userInfo._id));
            setAns("");
        }else{
            if(ans === currentTask.questions[userInfo.currentIndex].answer){
                dispatch(nextIndex(userInfo._id));
                setAns("");
            }else{
                toast.warning("Please Give the Correct Answer!");
            }
        }
    }else{
        toast.warning("Please Give an Answer!");
    }
  }
  

  useEffect(() => {
    dispatch(setItem(2));
  }, [])

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
          )
          :
          (<div className='w-full px-12 py-8 flex flex-col justify-center items-center'>
            <div className=' w-full text-4xl font-bold flex justify-center items-center text-gray-700'>
                Survey Questions of Day {userInfo?.surveyCount+1} 
            </div>
            <div className=' w-[90%] my-12 bg-blue-600 rounded-lg flex flex-col justify-center items-center shadow-2xl'>
                <div className=' px-4 py-2 text-white text-xl font-medium'>Answer All the Questions</div>
                <div className=' w-full bg-white px-12 py-2 rounded-b-lg text-lg'>
                    <div className=''>{userInfo?.currentIndex+1}/{currentTask?.questions?.length}</div>
                    <div className=' w-full'>
                        {currentTask?.questions[userInfo?.currentIndex]?.question}{` (${currentTask?.questions[userInfo.currentIndex]?.bangla})`}
                        {currentTask?.questions[userInfo?.currentIndex]?.type === 'Gap' ?
                            (<div>
                                <input
                                    name="name" 
                                    id="name" 
                                    value={ans || ''} 
                                    onChange={(e) => {setAns(e.target.value)}}
                                    className=' w-full border-2 rounded-md border-blac my-2'
                                    required
                                />
                            </div>):(<div className=' py-2 flex flex-col gap-1'>
                                {currentTask?.questions[userInfo?.currentIndex]?.options?.map((option, index) => (
                                    <div key={index} className=''>
                                        <input 
                                            type="radio" 
                                            id={`option${index}`} 
                                            name="answer"
                                            value={option} 
                                            checked={ans === option}
                                            onChange={(e) => setAns(e.target.value)}
                                            required
                                        />{" "}
                                        <label htmlFor={`option${index}`}>{option}</label><br/>
                                    </div>
                                ))}
                            </div>)
                        }
                    </div>
                    {
                        userInfo?.currentIndex+1 === currentTask?.questions?.length ? 
                        (
                            <div 
                                className=' px-2 py-1 bg-blue-600 w-[7%] flex justify-center items-center rounded-lg cursor-pointer'
                                onClick={handleDone}
                            >
                                Done
                            </div>
                        ):(
                            <div 
                                className=' px-2 py-1 bg-blue-600 w-[7%] flex justify-center items-center rounded-lg cursor-pointer'
                                onClick={handleNext}
                            >
                                Next
                            </div>
                        )
                    }
                </div>
            </div>
          </div>)}
        </div>
    
      </div>
    </div>
  )
}
