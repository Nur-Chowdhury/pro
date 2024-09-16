import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CiUser } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"
import { register } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as ReactLink, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bd, setBd] = useState(false); // Correctly initializing state
    const [showPassword, setShowPassword] = useState(false);
    const [showtPassword, setShowtPassword] = useState(false);
    const user = useSelector((state) => state.user);
    const { loading, error } = user;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const refID = queryParams.get('ref') || '';

    

    return (
        <div className=' bg-blue-300 w-full px-2 py-4 flex flex-col items-center justify-center overflow-y-scroll'>
            <div className=' bg-white w-[350px] sm:w-[500px] rounded-lg'>
                <div className=' flex flex-col items-center justify-center rounded'>
                    <h1 className=' font-bold text-3xl mt-8'>Register</h1>
                    <p className=' text-gray-600 mt-2 mb-12'>Create Your Account</p>
                </div>
                <div className=' mb-8'>
                    <Formik
                        initialValues={{ refID: '', email: '', password: '', name: '', transactionPassword: ''}}
                        validationSchema={Yup.object({
                            refID: Yup.string(),
                            name: Yup.string().required('A name is required.'),
                            email: Yup.string().email('Invalid email.').required('An email address is required.'),
                            password: Yup.string()
                                .min(8, 'Password is too short - must contain at least 8 characters.')
                                .required('Password is required.'),
                            confirmPassword: Yup.string()
                                .min(8, 'Password is too short - must contain at least 8 characters.')
                                .required('Password is required.')
                                .oneOf([Yup.ref('password'), null], 'Passwords must match.'),
                            transactionPassword: Yup.string()
                                .min(8, 'Password is too short - must contain at least 8 characters.')
                                .required('Password is required.'),
                        })}
                        onSubmit={(values) => {
                            dispatch(register(values.refID, values.name, values.email, values.password, values.transactionPassword));
                            navigate("/login");
                        }}
                    >
                        {formik => {
                            return (
                                <form onSubmit={formik.handleSubmit} className='mx-4'>
                                    {/* refer */}
                                    <div>
                                        <h1 className='text-lg w-full'>Refferal ID:</h1>
                                        <div className='py-1 gap-0 w-full'>
                                            <div className=' flex'>
                                                <CiUser size={45} className='px-1 py-1 border-2 border-gray-400 border-r-0' />
                                                <input
                                                    className={`w-full border-2 ${bd ? 'border-blue-500' : 'border-gray-400'}`}
                                                    type="text"
                                                    placeholder=' Refferal ID'
                                                    {...formik.getFieldProps('refID')}
                                                    value={formik.values.refID || refID}
                                                />
                                            </div>
                                            {formik.touched.refID && formik.errors.refID ? (
                                                <div className='text-red-500'>{formik.errors.refID}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* name */}
                                    <div>
                                        <h1 className='text-lg w-full'>Full Name:</h1>
                                        <div className='py-1 gap-0 w-full'>
                                            <div className=' flex'>
                                                <CiUser size={45} className='px-1 py-1 border-2 border-gray-400 border-r-0' />
                                                <input
                                                    className={`w-full border-2 ${bd ? 'border-blue-500' : 'border-gray-400'}`}
                                                    type="text"
                                                    placeholder=' Your Name...'
                                                    {...formik.getFieldProps('name')} />
                                            </div>
                                            {formik.touched.refID && formik.errors.refID ? (
                                                <div className='text-red-500'>{formik.errors.name}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* email */}
                                    <div>
                                        <h1 className='text-lg w-full'>Email:</h1>
                                        <div className='py-1 gap-0 w-full'>
                                            <div className=' flex'>
                                                <CiUser size={45} className='px-1 py-1 border-2 border-gray-400 border-r-0' />
                                                <input
                                                    className={`w-full border-2 ${bd ? 'border-blue-500' : 'border-gray-400'}`}
                                                    type="email"
                                                    placeholder=' Your Email...'
                                                    {...formik.getFieldProps('email')} />
                                            </div>
                                            {formik.touched.refID && formik.errors.refID ? (
                                                <div className='text-red-500'>{formik.errors.email}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* password */}
                                    <div>
                                        <h1 className='text-lg w-full'>Password:</h1>
                                        <div className='py-1 gap-0 w-full'>
                                            <div className=' flex'>
                                                <div onClick={() => setShowPassword(!showPassword)} className=' cursor-pointer px-1 py-1 border-2 border-gray-400 border-r-0'>
                                                    {showPassword ? 
                                                        <IoEyeOffOutline size={30} className='' /> 
                                                        :
                                                        <IoEyeOutline size={30} className='' />
                                                    }
                                                </div>
                                                <input
                                                    className={`w-full border-2 ${bd ? 'border-blue-500' : 'border-gray-400'}`}
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder=' Password'
                                                    {...formik.getFieldProps('password')}
                                                />
                                            </div>
                                            {formik.touched.password && formik.errors.password ? (
                                                <div className='text-red-500'>{formik.errors.password}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* confirm password */}
                                    <div>
                                        <h1 className='text-lg w-full'>Confirm Password:</h1>
                                        <div className='py-1 gap-0 w-full'>
                                            <div className=' flex'>
                                                <div onClick={() => setShowPassword(!showPassword)} className=' cursor-pointer px-1 py-1 border-2 border-gray-400 border-r-0'>
                                                    {showPassword ? 
                                                        <IoEyeOffOutline size={30} className='' /> 
                                                        :
                                                        <IoEyeOutline size={30} className='' />
                                                    }
                                                </div>
                                                <input
                                                    className={`w-full border-2 ${bd ? 'border-blue-500' : 'border-gray-400'}`}
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder=' Password'
                                                    {...formik.getFieldProps('confirmPassword')}
                                                />
                                            </div>
                                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                                <div className='text-red-500'>{formik.errors.confirmPassword}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    {/* transection password */}
                                    <div>
                                        <h1 className='text-lg w-full'>Transection Password:</h1>
                                        <div className='py-1 gap-0 w-full'>
                                            <div className=' flex'>
                                                <div onClick={() => setShowtPassword(!showtPassword)} className=' cursor-pointer px-1 py-1 border-2 border-gray-400 border-r-0'>
                                                    {showtPassword ? 
                                                        <IoEyeOffOutline size={30} className='' /> 
                                                        :
                                                        <IoEyeOutline size={30} className='' />
                                                    }
                                                </div>
                                                <input
                                                    className={`w-full border-2 ${bd ? 'border-blue-500' : 'border-gray-400'}`}
                                                    type={showtPassword ? 'text' : 'password'}
                                                    placeholder=' Password'
                                                    {...formik.getFieldProps('transactionPassword')}
                                                />
                                            </div>
                                            {formik.touched.transactionPassword && formik.errors.transactionPassword ? (
                                                <div className='text-red-500'>{formik.errors.transactionPassword}</div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <button className=' w-full bg-blue-700 h-10 rounded-md text-white my-4' type='submit'>
                                            {loading ? (
                                                <div>Loading...</div>
                                            ):(
                                                <div>Register</div>
                                            )}
                                    </button>

                                    {error && toast.error(error)}
                                </form>
                                
                            );
                        }}
                    </Formik>
                    <div className=' flex justify-center items-center'>
                        <span className=' flex text-lg gap-1'>
                            Already Registered?
                            <Link to='/login' className=' cursor-pointer font-bold text-blue-600'>
                                Sign IN
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
