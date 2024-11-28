import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import { receiveMess } from "../Redux/Slices/FriendSlice";
import { setTopicPassive } from "../Redux/Slices/MessageSlice";


function Authentication({ children }) {
    const user = useSelector((state) => state.user.information);
    const dispatch = useDispatch();
    const audioRef = useRef(null);

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:5164/onlinehub`)
            // .configureLogging(signalR.LogLevel.None)
            .withAutomaticReconnect()
            .build();

        user && connection.start().catch((error) => console.log("lỗi", error));

        connection.on("ReceiveMessage", async (message) => {
            await dispatch(receiveMess(message));
            notifications()
        });

        connection.on("ReceiveTopic", async (MainTopic, UserId) => {
            console.log(MainTopic, UserId)
            dispatch(setTopicPassive( {MainTopic, UserId} ))
        });
    });

    const notifications = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    return (
        <div>
            <audio
                ref={audioRef}
                src="/public/sound/notification.mp3"
                style={{ display: "none" }}
            />
            {user ? children : <Navigate to="/login"></Navigate>}
        </div>
    );
}

export default Authentication;
