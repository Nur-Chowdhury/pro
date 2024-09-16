import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
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
import RefferalLog from './pages/RefferalLog';
import Home from './pages/Home/Home';
import Binance from './pages/Binance';
import DepositBinance from './pages/DepositBinance';
import WithdrawBinance from './pages/WithdrawBinance';
import Wbinance from './pages/Wbinance';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Unauthorized from './pages/Unauthorized';

export default function App() {

  return (
    <Router>
      <Routes>
        {/* public */}
        <Route path='/' element={<Home />}></Route>

        <Route element={<PublicRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/users/verifyUser/:id/:token' element= {<EmailVerify />} />
        </Route>

        {/* protected */}
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<UserInfo />} />
          <Route path='/survey' element={<Survey />} />
          <Route path='/questions' element={<QA />} />
          <Route path='/plans' element={<Plans />} />
          <Route path='/myRefferals' element={<Refferal />} />
          <Route path='/deposit' element={<DepositF />} />
          <Route path='/deposit/amount/bkash' element={<Deposit />} />
          <Route path='/deposit/amount/binance' element={<DepositBinance />} />
          <Route path='/deposit/bkash' element={<Bkash />} />
          <Route path='/deposit/binance' element={<Binance />} />
          <Route path='/withdraw' element={<WithdrawF />} />
          <Route path='/withdraw/amount/bkash' element={<Withdraw />} />
          <Route path='/withdraw/amount/binance' element={<WithdrawBinance />} />
          <Route path='/withdraw/bkash' element={<WBkash />} />
          <Route path='/withdraw/binance' element={<Wbinance />} />
          <Route path='/transferBalance' element={<BalanceTransfer />} />
          <Route path='/reports/withdraw' element={<UserWithdrawList />} />
          <Route path='/reports/deposit' element={<UserDepositList />} />
          <Route path='/reports/refferal_log' element={<RefferalLog />} />
          <Route path='/support' element={<Support />} />
          <Route path='/newQuery' element={<NewQuery />} />
          <Route path='/unauthorized' element={<Unauthorized />}/>
        </Route>

        {/* private */}
        <Route element={<PrivateRoute />}>
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/addTask' element={<AddTask />} />
          <Route path='/admin/queries' element={<Queries />} />
          <Route path='/admin/users' element={<UserList />} />
          <Route path='/admin/deposits' element={<DepositList />} />
          <Route path='/admin/withdraws' element={<WithdrawList />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  )
}
