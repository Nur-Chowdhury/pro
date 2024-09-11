import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AddTask from './pages/AddTask';
import QA from './pages/QA';
import NewQuery from './pages/NewQuery';
import Queries from './pages/Queries';
import UserList from './pages/UserList';
import Deposit from './pages/Deposit';
import Bkash from './pages/Bkash';
import DepositList from './pages/DepositList';
import Withdraw from './pages/Withdraw';
import WBkash from './pages/WBkash';
import WithdrawList from './pages/WithdrawList';
import UserWithdrawList from './pages/UserWithdrawList';
import UserDepositList from './pages/UserDepositList';
import UserInfo from './pages/UserInfo';
import Survey from './pages/Survey';
import Plans from './pages/Plans';
import Refferal from './pages/Refferal';
import DepositF from './pages/DepositF';
import WithdrawF from './pages/WithdrawF';
import BalanceTransfer from './pages/BalanceTransfer';
import Support from './pages/Support';
import EmailVerify from './pages/EmailVerify';

export default function App() {

  return (
    <Router>
        {/* <Navbar /> */}
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/profile' element={<ProfileScreen />} /> */}
            {/* <Route path='/admin-console' element={<AdminConsoleScreen />} /> */}
            {/* <Route path='/dashboard' element={<Dashboard />} /> */}
            <Route path='/dashboard' element={<UserInfo />} />
            <Route path='/survey' element={<Survey />} />
            <Route path='/questions' element={<QA />} />
            <Route path='/plans' element={<Plans />} />
            <Route path='/myRefferals' element={<Refferal />} />
            <Route path='/deposit' element={<DepositF />} />
            <Route path='/deposit/amount' element={<Deposit />} />
            <Route path='/deposit/bkash' element={<Bkash />} /> 
            <Route path='/withdraw' element={<WithdrawF />} />
            <Route path='/withdraw/amount' element={<Withdraw />} />
            <Route path='/withdraw/bkash' element={<WBkash />} />
            <Route path='/transferBalance' element={<BalanceTransfer />} />
            <Route path='/reports/withdraw' element={<UserWithdrawList />} />
            <Route path='/reports/deposit' element={<UserDepositList />} />
            <Route path='/support' element={<Support />} />
            <Route path='/newQuery' element={<NewQuery />} />

            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/addTask' element={<AddTask />} />
            <Route path='/admin/queries' element={<Queries />} />
            <Route path='/admin/users' element={<UserList />} />
            <Route path='/admin/deposits' element={<DepositList />} />
            <Route path='/admin/withdraws' element={<WithdrawList />} />
            <Route path='/users/verifyUser/:id/:token' element= {<EmailVerify />} />
          </Routes>
        </main>
        {/* <Footer /> */}
    </Router>
  )
}
