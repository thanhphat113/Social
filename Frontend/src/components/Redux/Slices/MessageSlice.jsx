import { createSlice } from "@reduxjs/toolkit";
import { getMess } from "../Actions/MessageActions";

const MessageSlice = createSlice({
    name: "message",
    initialState: {
        currentUserId: null,
        currentMessage: [],
        messageId: null,
        isLoad: false,
        isError: false,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUserId = action.payload;
        },
        setTopic: (state, action) => {
            state.currentMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMess.fulfilled, (state, action) => {
            state.currentMessage = action.payload;
        });
    },
});

export const { setCurrentUser, setTopic } = MessageSlice.actions;
export default MessageSlice.reducer;
