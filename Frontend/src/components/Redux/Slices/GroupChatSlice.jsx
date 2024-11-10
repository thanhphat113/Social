import { createSlice } from "@reduxjs/toolkit";
import { SetUser } from "../Actions/UserAction";

const GroupChat = createSlice({
    name: "groupchat",
    initialState: {
        group: [],
        isLoading: false,
        isError: false,
    },
    reducers: {},
	extraReducers:(builder) => {
		builder
			.addCase(SetUser.fulfilled, (state, action) =>{
				const infor = action.payload
				state.group = infor?.groupchat;
			})
	}
});

export default GroupChat.reducer

