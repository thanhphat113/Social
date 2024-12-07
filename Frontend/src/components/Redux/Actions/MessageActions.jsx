import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getMess = createAsyncThunk(
    "message/main",
    async (AnotherUser, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:5164/api/Message`,
                { params: { id: AnotherUser }, withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

const addMess = createAsyncThunk(
    "message/chat",
    async ({ MessagesId, FromUser, Content, Otheruser }, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:5164/api/ChatInMessage`,
                { MessagesId, FromUser, Content, Otheruser },
                { withCredentials: true }
            );
            return { friendId: Otheruser, message: response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

const addMessWithMedia = createAsyncThunk(
    "message/chatwithmedia",
    async ({ MessageId, file, fileType, friendId }, thunkAPI) => {
        try {
            const formData = new FormData();

            formData.append("MessageId", MessageId);
            formData.append("File", file);
            formData.append("FileType", fileType);
            formData.append("Otheruser", friendId);

            const response = await axios.post(
                `http://localhost:5164/api/ChatInMessage/chat-with-file`,
                formData,
                {
                    withCredentials: true,
                }
            );
            return { friendId: friendId, message: response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

const recallMess = createAsyncThunk(
    "message/recall",
    async ({ id, Otheruser }, thunkAPI) => {
        console.log("đây là: " + id);
        try {
            const response = await axios.put(
                `http://localhost:5164/api/ChatInMessage/recall`,
                {
                    ChatId: id, 
                    OtherId: Otheruser
                },
                {withCredentials: true}
            );

            return { isRecall: response.data, friendId: Otheruser, chatId: id };
        } catch (error) {
            console.log("lôiix");
            return thunkAPI.rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

const deleteMess = createAsyncThunk(
    "message/delete",
    async ({ id, Otheruser }, thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://localhost:5164/api/ChatInMessage`,
                {
                    params: { id: id, OtherId: Otheruser },
                    withCredentials: true,
                }
            );

            return { isDelete: response.data, friendId: Otheruser, chatId: id };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response ? error.response.data : error.message
            );
        }
    }
);

const readMess = createAsyncThunk("message/read", async (id, thunkAPI) => {
    try {
        const response = await axios.put(
            `http://localhost:5164/api/ChatInMessage/${id}`,
            {},
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response ? error.response.data : error.message
        );
    }
});

export { addMessWithMedia, getMess, addMess, readMess, recallMess, deleteMess };
