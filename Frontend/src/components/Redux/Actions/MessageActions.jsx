import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const addMess = createAsyncThunk(
    "message/chat",
    async ({ MessagesId, FromUser, Content, Otheruser }, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:5164/api/ChatInMessage`,
                { MessagesId, FromUser, Content, Otheruser },
                { withCredentials: true }
            );
            return {friendId: Otheruser, message: response.data};
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const deleteMess = createAsyncThunk(
    "message/delete",
    async ({ id, Otheruser } , thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://localhost:5164/api/ChatInMessage/${id}`,
                { withCredentials: true }
            );

            return { isDelete: response.data, friendId: Otheruser, chatId: id};
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

const readMess = createAsyncThunk(
    "message/read",
    async ( id , thunkAPI) => {
        console.log(id)
        try {
            const response = await axios.put(
                `http://localhost:5164/api/ChatInMessage/${id}`,
                { },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export { addMess, readMess, deleteMess };
