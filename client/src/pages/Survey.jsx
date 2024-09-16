import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Pre from '../components/Pre';
import Post from '../components/Post';
import Nav from '../components/Nav';
import Sidebar from '../components/Sidebar';
import { findUserByIDRoute } from '../utils/ApiRoutes';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loader from '../components/Loader';



export default function Survey() {

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
                ):(<div className=' mt-12'>
                    {userInfo.subscribed === "none" ? (
                        <div>
                            <Pre />
                        </div>
                    ) : (
                        <div>
                            <Post />
                        </div> 
                    )}
                </div>)} 
            </div>
        </div>
    </div>
  )
}
