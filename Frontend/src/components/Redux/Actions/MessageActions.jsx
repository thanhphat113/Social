import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const findMessById = createAsyncThunk(
    "message/findMess",
    async ({ user1, user2 }, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:5164/chatinmess?user1=${user1}&user2=${user2}`,
                { withCredentials: true }
            );
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

const addMess = createAsyncThunk(
    "message/chat",
    async ({ MessagesId, FromUser, Content }, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:5164/api/ChatInMessage`,
                { MessagesId, FromUser, Content },
                { withCredentials: true }
            );
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
);

export { findMessById, addMess };
