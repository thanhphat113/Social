import { createSlice } from "@reduxjs/toolkit";


const MessageSlice = createSlice({
    name: "message",
    initialState: {
        currentUser: null,
		message: [],
		messageId: null,
		isLoad: false,
		isError: false
    },
    reducers: {
		setCurrentUser:( (state,action) => {
			state.currentUser = action.payload
		})
	}
});

export const { setCurrentUser } = MessageSlice.actions
export default MessageSlice.reducer
