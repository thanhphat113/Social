import { createSlice } from "@reduxjs/toolkit";


const MessageSlice = createSlice({
    name: "message",
    initialState: {
        currentUserId: null,
		currentMessage: [],
		messageId: null,
		isLoad: false,
		isError: false
    },
    reducers: {
		setCurrentUser:( (state,action) => {
			state.currentUserId = action.payload
		})
	}
});

export const { setCurrentUser } = MessageSlice.actions
export default MessageSlice.reducer
