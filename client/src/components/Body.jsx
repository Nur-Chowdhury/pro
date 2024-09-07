//depricated

import React, { useEffect, useState } from 'react'
import {PacmanLoader} from 'react-spinners'
import { FaUserLarge } from "react-icons/fa6";
import UserInfo from './UserInfo';
import { useSelector } from 'react-redux';
import Plans from './Plans';
import BalanceTransfer from './BalanceTransfer';
import Support from './Support';
import Survey from './survey';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import Refferal from './Refferal';

export default function Body() {

    const {item} = useSelector((state) => state.common)
    const [bdy, setBdy] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    },[]);

  return (
    loading ? (
        <div className=' mt-12 flex justify-center items-center'>
            <PacmanLoader
                color={"rgb(59, 130, 246)"}
                loading={loading}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader" 
            />
        </div>
    ):(
        <div className=' mt-8 overflow-auto'>
            {item===8 && (<BalanceTransfer />)}
            {item===9 && (<Support />)} 
        </div>
    )
  )
}
