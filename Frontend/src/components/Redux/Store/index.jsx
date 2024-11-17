
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import UserReducer from "../Slices/UserSlice";
import FriendReducer from "../Slices/FriendSlice"
import MessageReducer from "../Slices/MessageSlice"
import ProfileReducer from "../Slices/ProfileSlice"
import GroupChatReducer from "../Slices/GroupChatSlice"


const Store = configureStore({
    reducer: {
        auth: authReducer,
        user: UserReducer,
        friends: FriendReducer,
        message: MessageReducer,
        profile: ProfileReducer,
        groupchat: GroupChatReducer
    },
});

export default Store;

