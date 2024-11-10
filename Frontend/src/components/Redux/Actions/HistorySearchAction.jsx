import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addHistory = createAsyncThunk(
    "historysearch/get",
    async ({ FromUser, OtherUser }, thunkAPI) => {
        try {
            const response = await axios.post(
                "http://localhost:5164/api/HistorySearch",
                { FromUser, OtherUser },
                { withCredentials: true}
            );
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

const deleteHistory = createAsyncThunk(
    "historysearch/delete",
    async ( id , thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://localhost:5164/api/HistorySearch/${id}`,
                { withCredentials: true}
            );
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

const updateHistory = createAsyncThunk(
    "historysearch/update",
    async ( id , thunkAPI) => {
        try {
            const response = await axios.put(
                `http://localhost:5164/api/HistorySearch/${id}`,{},
                { withCredentials: true}
            );
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

export { addHistory, deleteHistory, updateHistory };
