import { createSlice } from "@reduxjs/toolkit";
import { SetUser, deleteRequests, acceptRequests } from "../Actions/UserAction";

const UserSlice = createSlice({
    name: "user",
    initialState: {
        information: null,
		friends: [],
		requests: [],
		postrequests: []
    },
    reducer: {},
	extraReducers:(builder) => {
		builder
			.addCase(SetUser.fulfilled,(state,action) => {
				const infor = action.payload
				state.information = infor?.information || null
				state.friends = infor?.friends || []
				state.requests = infor?.requests || []
				state.postrequests = infor?.postrequests || []
				console.log(infor)
			})
			.addCase(SetUser.rejected,(state) => {
				state.information = null
				state.friends = []
				state.requests = []
				state.postrequests = []
			})
			.addCase(acceptRequests.fulfilled,(state,action) => {
				state.requests = action.payload
			})
			.addCase(deleteRequests.fulfilled,(state,action) => {
				state.requests = action.payload
			})
	}
});

export default UserSlice.reducer
