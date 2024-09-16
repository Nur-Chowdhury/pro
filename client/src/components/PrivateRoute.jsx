import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { findUserByIDRoute } from '../utils/ApiRoutes';
import Loader from './Loader';

export default function PrivateRoute() {
    const { userID } = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userID) {
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`${findUserByIDRoute}?id=${userID}`);
                    setUserInfo(response.data.user);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [userID]);

    if (loading) {
        return (
            <div className=' mt-12 flex justify-center'>
                <Loader />
            </div>
        )
    }

    return userInfo?.admin ? <Outlet /> : <Navigate to='/unauthorized' />;
}
