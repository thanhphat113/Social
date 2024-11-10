import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getFriendList = createAsyncThunk(
	"friend/get",
	async ({ id }, thunkAPI) => {
        try {
            const response = await axios.post(
                "http://localhost:5164/api/Relationship",
                { id },
                { withCredentials: true }
            );
            return response.data;
        } catch {
            return thunkAPI.rejectWithValue(null);
        }
    }
) 

export { getFriendList }