import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Nav from '../components/Nav';
import axios from 'axios';
import { addWithdrawRoute, findUserByIDRoute } from '../utils/ApiRoutes';
import { resetAmountw } from '../redux/slices/commonSlice';
import { toast } from 'react-toastify';

export default function WBkash() {

    const {amountw} = useSelector((state) => state.common);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [accountNumber, setAccountNumber] = useState('');

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

    const handleWithdraw = async () => {
        try {
            const withdrawData = {
              userID: userInfo._id,
              accountNumber,
              amount: amountw,
              type:"Bkash",
            };

            console.log(withdrawData);
            
            const response = await axios.post(addWithdrawRoute, withdrawData);
            dispatch(resetAmountw());
            setAccountNumber('');
            toast.success("Your Request is being Processed.")
            navigate('/dashboard');
        } catch (error) {
            toast.error(error);
        }
    };

  return (
    <div>
        <div className=' w-full flex justify-start min-h-svh'>
            <div className=' hidden md:flex min-h-svh w-[18%]'>
                <Sidebar className= " overflow-auto" />
            </div>
            <div className=' w-full md:w-[82%] bg-slate-200 overflow-auto '>
                <Nav />
                <div className="flex flex-col justify-center items-center mt-6">
                    <h1 className="text-xl font-semibold text-gray-800 mb-8">Confirm Withdraw</h1>
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                        <div className="text-center text-gray-700 mb-6">
                            <p>
                                Your Withdrawal request of <span className="font-semibold text-green-600">{amountw} Doller</span> is being processed!
                            </p>
                            <p className="mt-2 font-semibold">Please follow the instruction below</p>
                            <p className="mt-2 text-lg font-bold text-gray-800">Give us your Bkash Account No.</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="accountNumber">
                                Your Account Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="accountNumber"
                                type="text"
                                value={accountNumber}
                                onChange={(e) => setAccountNumber(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Your Account Number"
                                required
                            />
                        </div>

                        <button
                            onClick={handleWithdraw}
                            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
                        >
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
  )
}
