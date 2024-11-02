import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import profileReducer from '../Slices/ProfileSlice'
const Store = configureStore({
    reducer: {
        // reducer
        auth: authReducer,
        profile: profileReducer,
    },
});

export default Store;
