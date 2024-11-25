import { createSlice } from "@reduxjs/toolkit";
import { SetUser } from "../Actions/UserAction";
import { recallMess,deleteMess, addMessWithMedia } from "../Actions/MessageActions";
import { addMess, readMess } from "../Actions/MessageActions";

const FriendSlice = createSlice({
    name: "friends",
    initialState: {
        allFriends:[],
        isLoad: false,
        isError: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(SetUser.fulfilled, (state, action) => {
                const infor = action.payload;
                const sortFriends = infor?.friends.sort((a, b) => {
                    const latestA = a.chatInMessages.reduce((latest, message) => {    
                        return latest && new Date(latest.dateCreated) > new Date(message.dateCreated) ? latest : message;
                      }, null);
                    
                      const latestB = b.chatInMessages.reduce((latest, message) => {
                        return latest && new Date(latest.dateCreated) > new Date(message.dateCreated) ? latest : message;
                      }, null);

                      return new Date(latestB.dateCreated) - new Date(latestA.dateCreated)
                });

                state.allFriends = sortFriends || [];
                state.isLoad = false;
                state.isError = false;
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
                    ].chatInMessages.filter(c => c.chatId !== chatId)

                    state.allFriends[indexFriend].chatInMessages = newChat
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

                state.allFriends.sort((a, b) => {
                    const latestA = a.chatInMessages.reduce((latest, message) => {    
                        return latest && new Date(latest.dateCreated) > new Date(message.dateCreated) ? latest : message;
                      }, null);
                    
                      const latestB = b.chatInMessages.reduce((latest, message) => {
                        return latest && new Date(latest.dateCreated) > new Date(message.dateCreated) ? latest : message;
                      }, null);
    
                      return new Date(latestB.dateCreated) - new Date(latestA.dateCreated)
                });

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

                state.allFriends.sort((a, b) => {
                    const latestA = a.chatInMessages.reduce((latest, message) => {    
                        return latest && new Date(latest.dateCreated) > new Date(message.dateCreated) ? latest : message;
                      }, null);
                    
                      const latestB = b.chatInMessages.reduce((latest, message) => {
                        return latest && new Date(latest.dateCreated) > new Date(message.dateCreated) ? latest : message;
                      }, null);
    
                      return new Date(latestB.dateCreated) - new Date(latestA.dateCreated)
                });

                state.isLoad = false;
                state.isError = false;
            })
            .addCase(readMess.fulfilled, (state, action) => {
                state.allFriends = action.payload;
            })
            .addCase(readMess.rejected, (state, action) => {
                console.log(action.payload);
            });
    },
});

export default FriendSlice.reducer;
