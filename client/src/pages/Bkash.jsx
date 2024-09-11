import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Nav from '../components/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addDepositRoute, findUserByIDRoute } from '../utils/ApiRoutes';
import { resetAmount } from '../redux/slices/commonSlice';
import { toast } from 'react-toastify';

export default function Bkash() {

    const {amount} = useSelector((state) => state.common);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(amount);

    const [accountNumber, setAccountNumber] = useState('');
    const [cashOutTime, setCashOutTime] = useState('');

    const {userID} = useSelector((state) => state.user);
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${findUserByIDRoute}?id=${userID}`);
                setUserInfo(response.data);
                console.log(response);
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error('Failed to load User');
                setLoading(false);
            }
        };
        fetchUser();
    }, [userID]);

    const handlePayNow = async () => {
        try {
            const depositData = {
              userID: userInfo._id,
              accountNumber,
              cashOutTime, 
              amount,
              type:"Bkash",
            };
            
            const response = await axios.post(addDepositRoute, depositData);
            dispatch(resetAmount());
            setAccountNumber('');
            setCashOutTime('');
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
                    <h1 className="text-xl font-semibold text-gray-800 mb-8">Confirm Deposit</h1>
                    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                        <div className="text-center text-gray-700 mb-6">
                            <p>
                                You have requested <span className="font-semibold text-green-600">{amount }Doller</span>, Please pay <span className="font-semibold text-green-600">{amount*120}BDT</span> for successful payment
                            </p>
                            <p className="mt-2 font-semibold">Please follow the instruction below</p>
                            <p className="mt-2 text-lg font-bold text-gray-800">Use Cash Out Option to make a deposit</p>
                            <p className="text-2xl font-bold text-green-700 mt-2">Bkash Agent : 01912760029</p>
                            <p className="mt-4 text-sm text-gray-500">° 3rd party payment not allowed</p>
                            <p className="text-sm text-gray-500">° Merchant cash out not allowed</p>
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

                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2" htmlFor="cashOutTime">
                                Cash Out Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="cashOutTime"
                                type="text"
                                value={cashOutTime}
                                onChange={(e) => setCashOutTime(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="Cash Out Time"
                                required
                            />
                        </div>

                        <button
                            onClick={handlePayNow}
                            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
                        >
                            Pay Now
                        </button>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
  )
}
