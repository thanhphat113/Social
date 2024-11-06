import { createSlice } from "@reduxjs/toolkit";
import { findMessById, addMess} from "../Actions/MessageActions";


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
	},
	extraReducers:(builder) => {
		builder
			.addCase(findMessById.fulfilled,(state,action) => {
				state.messageId = action.payload[0].messagesId
				state.message = action.payload.map(({messagesId,...list}) => list)
				state.isLoad = false
				state.isError= false
			})
			.addCase(findMessById.pending,(state) => {
				state.message = []
				state.isLoad = true
				state.isError= false
			})
			.addCase(findMessById.rejected,(state) => {
				state.message = []
				state.isLoad = false
				state.isError= true
			})
			.addCase(addMess.fulfilled,(state,action) => {
				state.isLoad = false
				state.isError= false
			})
			.addCase(addMess.pending,(state) => {
				state.message = []
				state.isLoad = true
				state.isError= false
			})
			.addCase(addMess.rejected,(state) => {
				state.message = []
				state.isLoad = false
				state.isError= true
			})

	}
});

export const { setCurrentUser } = MessageSlice.actions
export default MessageSlice.reducer
