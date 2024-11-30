import { createSlice } from "@reduxjs/toolkit";
import { SetUser, deleteRequests, acceptRequests, updateIsRead } from "../Actions/UserAction";
import { addHistory, deleteHistory, updateHistory } from "../Actions/HistorySearchAction";

const UserSlice = createSlice({
    name: "user",
    initialState: {
    information: null,
		requests: [],
		profilePicture: null,
		postrequests: [],
		post: [],
    },
    reducers: {
		findFriend:( (state, action) => {
			state.friends = action.payload
		})
	},
	extraReducers:(builder) => {
		builder
			.addCase(SetUser.fulfilled,(state,action) => {
				const infor = action.payload
				state.information = infor?.information || null
				state.requests = infor?.requests || []
				state.profilePicture = infor?.media || null
				state.postrequests = infor?.postrequests || []
				state.friends = infor?.friends || []
				state.post = infor?.post || []
			})
			.addCase(SetUser.rejected,(state) => {
				state.information = null
				state.requests = []
				state.postrequests = []
			})
			.addCase(acceptRequests.fulfilled,(state,action) => {
				state.requests = action.payload
			})
			.addCase(deleteRequests.fulfilled,(state,action) => {
				state.requests = action.payload
			})
			.addCase(addHistory.fulfilled,(state,action) => {
				state.historysearch = action.payload
			})
			.addCase(deleteHistory.fulfilled,(state,action) => {
				state.historysearch = action.payload
			})
			.addCase(updateHistory.fulfilled,(state,action) => {
				state.historysearch = action.payload
			})
			.addCase(updateIsRead.fulfilled,(state,action) => {
				state.postrequests.map((post) =>
          post.id === action.payload.id ? { ...post, isRead: true } : post)
			})
	}
});

export const { findFriend } = UserSlice.actions
export default UserSlice.reducer
