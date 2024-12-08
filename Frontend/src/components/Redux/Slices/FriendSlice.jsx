import { createSlice } from "@reduxjs/toolkit";
import { acceptRequests, SetUser } from "../Actions/UserAction";
import {
    recallMess,
    deleteMess,
    addMessWithMedia,
} from "../Actions/MessageActions";
import { addMess, readMess } from "../Actions/MessageActions";
import { sortFriendsByLatestMessage } from "../Actions/FriendActions";

const FriendSlice = createSlice({
    name: "friends",
    initialState: {
        allFriends: [],
        isLoad: false,
        isError: false,
    },
    reducers: {
        receiveMess: (state, action) => {
            const index = state.allFriends.findIndex(
                (i) => i.userId === action.payload.fromUser
            );

            const isExist = state.allFriends[index].chatInMessages.some(
                (i) => i.chatId === action.payload.chatId
            );

            if (!isExist) {
                if (index !== -1) {
                    state.allFriends[index].chatInMessages.push(action.payload);
                }

                state.allFriends = sortFriendsByLatestMessage(state.allFriends);
            }
        },
        receiveUpdateChat: (state, action) => {
            const { friendId, chatId, type } = action.payload;
            console.log(friendId, chatId, type);
            const index = state.allFriends.findIndex(
                (i) => i.userId === friendId
            );

            const indexChat = state.allFriends[index].chatInMessages.findIndex(
                (i) => i.chatId === chatId
            );

            if (type === "recall") {
                console.log(state.allFriends[index].chatInMessages[indexChat]);
                state.allFriends[index].chatInMessages[
                    indexChat
                ].isRecall = true;
                console.log(state.allFriends[index].chatInMessages[indexChat]);
            } else {
                const chat = state.allFriends[index].chatInMessages.filter(
                    (e) => e.chatId !== chatId
                );
                state.allFriends[index].chatInMessages = chat;
            }
            state.allFriends = sortFriendsByLatestMessage(state.allFriends);
        },
        staticMess: (state, action) => {
            const value = action.payload;
            console.log(value);
            const index = state.allFriends.findIndex(
                (i) => i.userId === value.id
            );

            const isExist = state.allFriends[index].chatInMessages.some(
                (i) => i.chatId === value.chat.chatId
            );

            if (!isExist) {
                if (index !== -1) {
                    state.allFriends[index].chatInMessages.push(value.chat);
                }

                state.allFriends = sortFriendsByLatestMessage(state.allFriends);
            }
        },
        updateOnline: (state, action) => {
            const value = action.payload;
            const index = state.allFriends.findIndex(
                (e) => e.userId === value.userId
            );
            if (index !== -1) {
                state.allFriends[index].isOnline = value.isOnline;
            }
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(SetUser.fulfilled, (state, action) => {
                const infor = action.payload;
                // console.log(infor.friends)
                state.allFriends = sortFriendsByLatestMessage(infor?.friends) || []
                state.isLoad = false;
                state.isError = false;
            })
            .addCase(acceptRequests.fulfilled, (state, action) => {
                const result = action.payload;
                const newList = [...state.allFriends,result.newFriend]

                state.allFriends = sortFriendsByLatestMessage(newList) || []

            })
            .addCase(SetUser.pending, (state) => {
                state.allFriends = [];
                state.isLoad = true;
                state.isError = false;
            })
            .addCase(SetUser.rejected, (state) => {
                state.allFriends = [];
                state.isLoad = false;
                state.isError = true;
            })
            .addCase(recallMess.fulfilled, (state, action) => {
                const { friendId, chatId, isRecall } = action.payload;

                const indexFriend = state.allFriends.findIndex(
                    (i) => i.userId === friendId
                );

                const indexChat = state.allFriends[
                    indexFriend
                ].chatInMessages.findIndex((i) => i.chatId === chatId);

                if (isRecall) {
                    state.allFriends[indexFriend].chatInMessages[
                        indexChat
                    ].content = "Tin nhắn đã thu hồi";
                    state.allFriends[indexFriend].chatInMessages[
                        indexChat
                    ].isRecall = true;
                }

                state.isLoad = false;
                state.isError = false;
            })
            .addCase(deleteMess.fulfilled, (state, action) => {
                const { friendId, chatId, isDelete } = action.payload;

                const indexFriend = state.allFriends.findIndex(
                    (i) => i.userId === friendId
                );

                if (isDelete) {
                    const newChat = state.allFriends[
                        indexFriend
                    ].chatInMessages.filter((c) => c.chatId !== chatId);

                    state.allFriends[indexFriend].chatInMessages = newChat;
                }

                state.isLoad = false;
                state.isError = false;
            })
            .addCase(deleteMess.pending, (state) => {
                state.isLoad = true;
                state.isError = false;
            })
            .addCase(deleteMess.rejected, (state) => {
                state.isLoad = false;
                state.isError = true;
            })
            .addCase(addMess.fulfilled, (state, action) => {
                const { friendId, message } = action.payload;

                const index = state.allFriends.findIndex(
                    (i) => i.userId === friendId
                );

                if (index !== -1) {
                    state.allFriends[index].chatInMessages.push(message);
                }

                state.allFriends = sortFriendsByLatestMessage(state.allFriends);
                state.isLoad = false;
                state.isError = false;
            })
            .addCase(addMess.rejected, (state, action) => {
                console.log(action.payload);
            })
            .addCase(addMessWithMedia.fulfilled, (state, action) => {
                const { friendId, message } = action.payload;

                const index = state.allFriends.findIndex(
                    (i) => i.userId === friendId
                );

                if (index !== -1) {
                    state.allFriends[index].chatInMessages.push(message);
                }

                state.allFriends = sortFriendsByLatestMessage(state.allFriends);

                state.isLoad = false;
                state.isError = false;
            })
            .addCase(readMess.fulfilled, (state, action) => {
                state.allFriends = action.payload;
                state.allFriends = sortFriendsByLatestMessage(state.allFriends);
            })
            .addCase(readMess.rejected, (state, action) => {
                console.log(action.payload);
            });
    },
});

export const { receiveMess, staticMess, receiveUpdateChat, updateOnline } =
    FriendSlice.actions;
export default FriendSlice.reducer;
