import {combineReducers, configureStore} from '@reduxjs/toolkit';
import user from './slices/user';
import common from './slices/commonSlice'
import task from './slices/taskSlice'

const reducer = combineReducers({
    user,
    common,
    task,
});

export default configureStore({
    reducer,
});