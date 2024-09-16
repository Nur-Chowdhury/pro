import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PublicRoute() {
  const { userID } = useSelector((state) => state.user);
  return userID ? <Navigate to='/dashboard' /> : <Outlet />; 
}