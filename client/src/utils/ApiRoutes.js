export const host = import.meta.env.MODE === "development" ? "http://localhost:5174" : "https://pro-ih0w.onrender.com";
export const registerRoute = `${host}/api/users/register`;
export const loginRoute = `${host}/api/users/login`;
export const logoutRoute = `${host}/api/users/logout`;
export const subscribeRoute = `${host}/api/users/subscribe`;
export const addTaskRoute = `${host}/api/admins/addTask`;
export const fetchTaskRoute = `${host}/api/users/fetchTask`;
export const getTaskByIdRoute = `${host}/api/users/getTaskById`;
export const nextIndexRoute = `${host}/api/users/nextIndex`;
export const surveyDoneRoute = `${host}/api/users/surveyDone`;
export const transferBalanceRoute = `${host}/api/users/transferBalance`;
export const addQueryRoute = `${host}/api/query/addQuery`;
export const getAllQueriesRoute = `${host}/api/admins/getAllQueries`;
export const addReplyRoute = `${host}/api/admins/addReply`;
export const getAllUsersRoute = `${host}/api/admins/getAllUsers`; 
export const getAllDepositsRoute = `${host}/api/admins/getAllDeposits`;
export const getUserDepositsRoute = `${host}/api/deposit/getUserDeposits`;
export const acceptDepositRoute = `${host}/api/admins/acceptDeposit`;
export const rejectDepositRoute = `${host}/api/admins/rejectDeposit`;
export const addDepositRoute = `${host}/api/deposit/add`;
export const addWithdrawRoute = `${host}/api/withdraw/add`;
export const getAllWithdrawsRoute = `${host}/api/admins/getAllWithdraws`;
export const getUserWithdrawsRoute = `${host}/api/withdraw/getUserWithdraws`;
export const getUserQueriesRoute = `${host}/api/query/getUserQueries`;
export const acceptWithdrawRoute = `${host}/api/admins/acceptWithdraw`;
export const rejectWithdrawRoute = `${host}/api/admins/rejectWithdraw`;
export const banUserRoute = `${host}/api/admins/banUser`;
export const makeAdminRoute = `${host}/api/admins/makeAdmin`;
export const findUserByIDRoute = `${host}/api/users/findUserByID`;
export const emailVerifyRoute = `${host}/api/users/verifyUser`;

// export const avatarRoute = `${host}/api/auth/avatar`;
// export const allUserRoute = `${host}/api/auth/allusers`;
// export const sendMessageRoute = `${host}/api/messages/addmsg`;
// export const getAllMessagesRoute = `${host}/api/messages/getmsg`;