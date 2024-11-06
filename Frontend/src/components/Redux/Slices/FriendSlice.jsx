import { createSlice } from '@reduxjs/toolkit';
import { getFriendList } from '../Actions/FriendActions';

const FriendSlice = createSlice({
    name: 'friend',
    initialState: {
        friends: [],
		isLoad: false,
		isError: false
    },
    reducers: {},
	extraReducers: (builder) => {
		builder 
			.addCase(getFriendList.fulfilled,(state, action) => {
				state.friends = action.payload	
				state.isLoad = false
				state.isError = false
			})
			.addCase(getFriendList.pending,(state) => {
				state.friends = []
				state.isLoad = true
				state.isError = false
			})
			.addCase(getFriendList.rejected,(state) => {
				state.friends = []	
				state.isLoad = false
				state.isError = true
			})
	}
});

export default FriendSlice.reducer;