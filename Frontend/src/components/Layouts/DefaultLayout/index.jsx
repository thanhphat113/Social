import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef, useState, createContext } from "react";
import { receiveMess, receiveUpdateChat, updateOnline } from "../../Redux/Slices/FriendSlice";
import { setNNPassive, setTopicPassive } from "../../Redux/Slices/MessageSlice";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import clsx from "clsx";
import Validate from "../../Validate";

export const messageContext = createContext();

function DefaultLayout() {
    const user = useSelector((state) => state.user.information);
    const [caller, setCaller] = useState();
    const [haveUser, setHaveUser] = useState(null);
    const location = useLocation();
    const audioRef = useRef();
    const callingRef = useRef();
    const [request, setRequest] = useState();
    const [accept, setAccept] = useState();
    const [connection, setConnection] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const peerConnect = useRef(null);
    const localStream = useRef(null);
    const remoteStream = useRef(null);

    const [toggleCamera, setToggleCamera] = useState(true);
    const [toggleVolume, setToggleVolume] = useState(true);

    const userVideo = useRef(null);
    const otherVideo = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`http://localhost:5164/onlinehub`)
            .configureLogging(signalR.LogLevel.None)
            .withAutomaticReconnect()
            .build();

        user &&
            connection
                .start()
                .then(() => setConnection(connection))
                .catch((error) => console.log("lỗi", error));

        const audioElement = callingRef.current;
        if (audioElement) {
            audioElement.addEventListener("ended", handleAudioEnd);
        }

        return () => {
            if (connection && !window.name.includes("call")) connection.stop();
            setRequest(null);
            setAccept(null);
            if (audioElement) {
                audioElement.removeEventListener("ended", handleAudioEnd);
            }

            if (callingRef.current && !callingRef.current.paused) {
                callingRef.current.pause();
                callingRef.current.currentTime = 0;
            } else {
                console.log("Audio is not playing.");
            }
            if (peerConnect.current) {
                peerConnect.current.close();
            }
            setCaller();
            setHaveUser();
        };
    }, [user]);

    const handleAudioEnd = () => {
        cancelCall();
    };

    const createPeerConnection = async () => {
        try {
            peerConnect.current = new RTCPeerConnection();

            remoteStream.current = new MediaStream();
            if (otherVideo.current) {
                otherVideo.current.srcObject = remoteStream.current;
            }

            localStream.current = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });

            if (userVideo.current) {
                userVideo.current.srcObject = localStream.current;
            }

            localStream.current.getTracks().forEach((track) => {
                peerConnect.current.addTrack(track, localStream.current);
            });

            peerConnect.current.ontrack = (event) => {
                event.streams[0].getTracks().forEach((track) => {
                    remoteStream.current.addTrack(track);
                });
            };
        } catch (err) {
            console.log("khởi tạo: ", err);
        }
    };

    const sendOffer = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            await createPeerConnection();

            if (peerConnect.current) {
                const offer = await peerConnect.current.createOffer();
                await peerConnect.current.setLocalDescription(offer);
                await connection
                    .invoke("AcceptCall", caller.userId, offer)
                    .catch((err) => console.log("Lỗi gửi offer", err));
            }
        } catch (error) {
            console.log("lỗi", error);
        } finally {
            if (callingRef.current) {
                callingRef.current.pause();
                callingRef.current.currentTime = 0;
            }
            setHaveUser({ callerId: caller.userId, calleeId: user.userId });
            setCaller(null);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        caller
            ? calling()
            : () => {
                  callingRef.current.pause();
                  callingRef.current.currentTime = 0;
              };
    }, [caller]);

    useEffect(() => {
        if (connection) {
            connection.off("UpdateOnlineStatus")
            connection.on("UpdateOnlineStatus", async (userId, isOnline) => {
                dispatch(updateOnline({userId: userId, isOnline: isOnline}));
            });

            connection.on("ReceiveMessage", async (message) => {
                await dispatch(receiveMess(message));
                notifications();
            });

            connection.on("ReceiveTopic", async (MainTopic, UserId) => {
                console.log(MainTopic, UserId);
                dispatch(setTopicPassive({ MainTopic, UserId }));
            });

            connection.on("ReceiveNickName", async (userId, message) => {
                console.log(userId, message);
                dispatch(setNNPassive({ userId, message }));
            });

            connection.on("ConnectCall", async (user) => {
                setCaller(user);
            });

            connection.on("receiveRecallChat", async (chatId, userId) => {
                console.log(chatId, userId);

                await dispatch(
                    receiveUpdateChat({
                        friendId: userId,
                        chatId: chatId,
                        type: "recall",
                    })
                );
                notifications();
            });

            connection.on("receiveDeleteChat", async (id, userId) => {
                console.log(id, userId);
                await dispatch(
                    receiveUpdateChat({
                        friendId: userId,
                        chatId: id,
                        type: "delete",
                    })
                );
                notifications();
            });

            connection.on("CallDeclined", async (value) => {
                setRequest(null);
                setAccept(value);
            });

            connection.off("RequestCall");
            connection.on("RequestCall", async (value) => {
                await createPeerConnection();
                try {
                    if (peerConnect.current) {
                        peerConnect.current.onicecandidate = async (event) => {
                            if (
                                event.candidate &&
                                event.candidate.candidate !== ""
                            ) {
                                await connection.invoke(
                                    "SendCandidate",
                                    value.calleeId,
                                    event.candidate
                                );
                                console.log(
                                    "Sent ICE candidate:",
                                    event.candidate
                                );
                            } else {
                                console.log(
                                    "All ICE candidates have been gathered."
                                );
                            }
                        };

                        await peerConnect.current.setRemoteDescription(
                            new RTCSessionDescription(value.offer)
                        );

                        const answer = await peerConnect.current.createAnswer();
                        await peerConnect.current.setLocalDescription(
                            new RTCSessionDescription(answer)
                        );

                        await connection
                            .invoke("SendAnswer", value.calleeId, answer)
                            .catch((err) => console.log("Lỗi", err));
                    }
                } catch (error) {
                    console.log("Lỗi thêm offer vào remote của caller", error);
                } finally {
                    setHaveUser({
                        calleeId: value.calleeId,
                        callerId: value.callerId,
                    });
                    setRequest(null);
                }
            });

            let pendingCandidates = [];
            connection.on("receiveCandidate", async (data) => {
                const receivedCandidates = new Set();
                if (data && !receivedCandidates.has(data)) {
                    if (peerConnect.current.remoteDescription) {
                        receivedCandidates.add(data.candidate);
                        try {
                            await peerConnect.current
                                .addIceCandidate(new RTCIceCandidate(data))
                                .catch((error) => {
                                    console.error(
                                        "Error adding ICE candidate:",
                                        error
                                    );
                                });
                        } catch (error) {
                            console.error("Error adding ICE candidate:", error);
                        }
                    } else {
                        pendingCandidates.push(data);
                    }
                } else {
                    console.log(
                        "ICE candidate đã nhận trước đó hoặc không hợp lệ."
                    );
                }
            });

            connection.on("sendLeaveCall", async (value) => {
                stopMedia();
                setHaveUser(value);
            });

            connection.on("receiveAnswer", async (value) => {
                peerConnect.current.onicecandidate = async (event) => {
                    if (event.candidate && event.candidate.candidate !== "") {
                        await connection.invoke(
                            "SendCandidate",
                            value.callerId,
                            event.candidate
                        );
                    } else {
                        console.log("All ICE candidates have been gathered.");
                    }
                };

                if (!peerConnect.current.currentRemoteDescription) {
                    await peerConnect.current.setRemoteDescription(
                        new RTCSessionDescription(value.answer)
                    );
                } 

                pendingCandidates.forEach(async (candidate) => {
                    try {
                        await peerConnect.current
                            .addIceCandidate(new RTCIceCandidate(candidate))
                            .catch((error) => {
                                console.error(
                                    "Error adding ICE candidate:",
                                    error
                                );
                            });
                    } catch (error) {
                        console.error("Error adding ICE candidate:", error);
                    }
                });
            });
        }
    });

    const notifications = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const cancelCall = async () => {
        callingRef.current.pause();
        callingRef.current.currentTime = 0;
        connection
            .invoke("DeclineCall", caller.userId)
            .catch((err) => console.log("Lỗi", err));
        setCaller(null);
        setRequest(null);
    };

    const leaveCall = async () => {
        console.log(haveUser);
        await connection
            .invoke("LeaveCall", haveUser.callerId, haveUser.calleeId)
            .catch((err) => console.log("Lỗi", err));
        setHaveUser();
        stopMedia();
    };

    const toggleCameraFc = async () => {
        let cameraTrack = await localStream.current
            .getTracks()
            .find((track) => track.kind === "video");

        cameraTrack.enabled = !cameraTrack.enabled;
        setToggleCamera(!toggleCamera);
    };

    const toggleAudioFc = async () => {
        let audioTrack = await localStream.current
            .getTracks()
            .find((track) => track.kind === "audio");

        audioTrack.enabled = !audioTrack.enabled;
        setToggleVolume(!toggleVolume);
    };

    const stopMedia = async () => {
        stopMediaStream(localStream.current);
        stopMediaStream(remoteStream.current);
        if (peerConnect) {
            await peerConnect.current.close();
        }
    };

    const stopMediaStream = (stream) => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
        }
    };

    const calling = () => {
        if (callingRef.current) {
            callingRef.current.play();
        }
    };

    return (
        <messageContext.Provider value={{ request, setRequest }}>
            <div className={styles.wrapper}>
                <audio
                    ref={audioRef}
                    src="/public/sound/notification.mp3"
                    style={{ display: "none" }}
                />
                <audio
                    ref={callingRef}
                    src="/public/sound/calling.mp3"
                    style={{ display: "none" }}
                />
                {user && !location.pathname.startsWith("/call") && <Header />}
                <div className="container">
                    <Outlet />
                </div>
                {caller && (
                    <div className={styles.receiveCall}>
                        <div className={styles.content}>
                            <img
                                className={styles.img}
                                src={
                                    caller.profilePicture
                                        ? `${caller.profilePicture.src}`
                                        : `/public/img/default/${
                                              caller.genderId !== 2
                                                  ? "man"
                                                  : "woman"
                                          }_default.png`
                                }
                            />
                            <h1>{`${caller.lastName} ${caller.firstName}`}</h1>
                            <div className={styles.action}>
                                <i
                                    onClick={() => sendOffer()}
                                    className={clsx(
                                        "fa-solid fa-check",
                                        styles.accept
                                    )}
                                ></i>
                                <i
                                    onClick={() => cancelCall()}
                                    className={clsx(
                                        "fa-solid fa-xmark",
                                        styles.cancel
                                    )}
                                ></i>
                            </div>
                        </div>
                    </div>
                )}
                {request &&
                    (request.isConnect ? (
                        <Validate message={request.message || null} />
                    ) : (
                        <Validate
                            onAccept={() => setRequest(null)}
                            message={request.message}
                        />
                    ))}
                {accept &&
                    (accept.isAccept ? (
                        <Validate message={request.message || null} />
                    ) : (
                        <Validate
                            onAccept={async () => {
                                setAccept(null);
                            }}
                            message={accept.message}
                        />
                    ))}
                <div
                    className={styles.callFrame}
                    style={{ display: !haveUser && `none` }}
                >
                    <video
                        className={styles.video}
                        ref={otherVideo}
                        autoPlay
                        playsInline
                    ></video>
                    <div className={styles.actions}>
                        <i
                            onClick={() => toggleCameraFc()}
                            className={clsx(
                                styles.camera,
                                toggleCamera
                                    ? "fa-solid fa-video"
                                    : "fa-solid fa-video-slash"
                            )}
                        ></i>
                        <i
                            onClick={() => toggleAudioFc()}
                            className={clsx(
                                styles.camera,
                                toggleVolume
                                    ? "fa-solid fa-volume-high"
                                    : "fa-solid fa-volume-xmark"
                            )}
                        ></i>
                        <i
                            onClick={() => leaveCall()}
                            className={clsx(styles.stop, "fa-solid fa-phone")}
                        ></i>
                    </div>

                    <div className={styles.userScreen}>
                        <video
                            ref={userVideo}
                            autoPlay
                            playsInline
                            style={{ display: !toggleCamera && `none` }}
                        ></video>
                    </div>
                </div>
            </div>
        </messageContext.Provider>
    );
}

export default DefaultLayout;
