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

const sortFriendsByLatestMessage = (friends) => {
    return friends.sort((a, b) => {
        const latestA = a.chatInMessages?.reduce(
            (latest, message) => {
                return latest &&
                    new Date(latest.dateCreated) > new Date(message.dateCreated)
                    ? latest
                    : message;
            },
            null
        );

        const latestB = b.chatInMessages?.reduce(
            (latest, message) => {
                return latest &&
                    new Date(latest.dateCreated) > new Date(message.dateCreated)
                    ? latest
                    : message;
            },
            null
        );

        return (
            new Date(latestB.dateCreated) - new Date(latestA.dateCreated)
        );
    });
};


export { getFriendList, sortFriendsByLatestMessage }