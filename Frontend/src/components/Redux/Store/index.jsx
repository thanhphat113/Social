import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";

const Store = configureStore({
    reducer: {
        // reducer
        auth: authReducer,
    },
});

export default Store;
