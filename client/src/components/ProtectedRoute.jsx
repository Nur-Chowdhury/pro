import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute() {
  const { userID } = useSelector((state) => state.user);
  return userID ? <Outlet /> : <Navigate to='/login' />; 
}