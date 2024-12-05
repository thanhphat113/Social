import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as signalR from "@microsoft/signalr";
import { useEffect, useRef, useState, createContext } from "react";
import { receiveMess } from "../../Redux/Slices/FriendSlice";
import { setNNPassive, setTopicPassive } from "../../Redux/Slices/MessageSlice";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import clsx from "clsx";
import Validate from "../../Validate";

export const messageContext = createContext();

function DefaultLayout() {
    const user = useSelector((state) => state.user.information);
    const [caller, setCaller] = useState();
    const [haveCalling, setHaveCalling] = useState(false);
    const [haveUser, setHaveUser] = useState();
    const location = useLocation();
    const audioRef = useRef();
    const callingRef = useRef();
    const [request, setRequest] = useState();
    const [accept, setAccept] = useState();
    const [connection, setConnection] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const [toggleCamera, setToggleCamera] = useState(true);
    const [toggleVolume, setToggleVolume] = useState(false);

    const peerConnect = useRef(null);

    const userVideo = useRef(null);
    const otherVideo = useRef(null);
    const localStream = useRef(null);

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
                peerConnect.current = null;
            }
            setCaller();
            setHaveCalling(false);
            setHaveUser();
        };
    }, [user]);

    const handleAudioEnd = () => {
        cancelCall();
    };


    const handleAcceptCall = async () => {
        if (isLoading) return
        setIsLoading(true)
        if (callingRef.current) {
            callingRef.current.pause();
            callingRef.current.currentTime = 0;
        }
        setHaveUser({ callerId: caller.userId, calleeId: user.userId });
        setHaveCalling(true);
        setCaller(null);

        peerConnect.current = new RTCPeerConnection();

        peerConnect.current.ontrack = (event) => {
            console.log(peerConnect.current)
            console.log("Caller received track from callee:", event.track.id);
        
            if (event.track.kind === "video") {
                const remoteStream = new MediaStream();
                remoteStream.addTrack(event.track);
                otherVideo.current.srcObject = remoteStream;
            }
        };

        localStream.current = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        }).then((stream) => {
            userVideo.current.srcObject = stream;

            stream.getTracks().forEach((track) => {
                console.log(track)
                peerConnect.current.addTrack(track, stream);})
        })

        peerConnect.current.getSenders().forEach((sender) => {
            if (sender.track) {
                console.log("Caller is sending track:", sender.track.id);
                console.log("Kind:", sender.track.kind);
            }
        });

        try {
            const offer = await peerConnect.current.createOffer();

            await peerConnect.current.setLocalDescription(new RTCSessionDescription(offer));

            await connection
                .invoke("AcceptCall", caller.userId, offer)
                .catch((err) => console.log("Lỗi", err));
        } catch (err) {
            console.error("Error accessing media devices:", err);
        }
        finally{
            setIsLoading(false)
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

            connection.on("ConnectCall", async (value) => {
                setCaller(value);
            });

            connection.on("CallDeclined", async (value) => {
                setRequest(null);
                setAccept(value);
            });

            connection.on("RequestCall", async (value) => {
                try {
                    peerConnect.current = new RTCPeerConnection();

                    peerConnect.current.ontrack = (event) => {
                        console.log("Caller received track from callee:", event.track.kind);
                    
                        if (event.track.kind === "video") {
                            const remoteStream = new MediaStream();
                            remoteStream.addTrack(event.track);
                            otherVideo.current.srcObject = remoteStream
                        }
                    };

                    await peerConnect.current.setRemoteDescription(
                        new RTCSessionDescription(value.offer)
                    );
                    
                    peerConnect.current.onicecandidate = async (event) => {
                        if (
                            peerConnect.current.iceConnectionState ===
                                "connected" ||
                            peerConnect.current.iceConnectionState ===
                                "completed"
                        ) {
                            console.log(
                                "Skipping ICE candidate, connection is already stable."
                            );
                            return;
                        }

                        if (
                            event.candidate &&
                            event.candidate.candidate !== ""
                        ) {

                            await connection.invoke(
                                "SendCandidate",
                                value.calleeId,
                                event.candidate
                            );
                        } else {
                            console.log(
                                "All ICE candidates have been gathered."
                            );
                        }
                    };

                    localStream.current =
                        await navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: false,
                        }).then((stream) => {
                            userVideo.current.srcObject = stream;
                
                            stream.getTracks().forEach((track) => {
                                peerConnect.current.addTrack(track, stream);
                        })})
                        console.log(localStream.current)


                        peerConnect.current.getSenders().forEach((sender) => {
                            if (sender.track) {
                                console.log("Caller is sending track:", sender.track.id);
                                console.log("Kind:", sender.track.kind); // "audio" hoặc "video"
                            }
                        });
                        console.log(peerConnect.current)

                    const answer = await peerConnect.current.createAnswer();
                    await peerConnect.current.setLocalDescription(answer);

                    await connection
                        .invoke("SendAnswer", value.calleeId, answer)
                        .catch((err) => console.log("Lỗi", err));
                } catch (error) {
                    console.error("Error handling WebRTC signaling:", error);
                } finally {
                    setHaveUser({
                        calleeId: value.calleeId,
                        callerId: value.callerId,
                    });
                    setHaveCalling(true);
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
                setHaveCalling(false);
                setHaveUser(value);
            });

            connection.on("receiveAnswer", async (value) => {
                await peerConnect.current.setRemoteDescription(
                    new RTCSessionDescription(value.answer)
                );

                try {
                    peerConnect.current.onicecandidate = async (event) => {
                        if (
                            peerConnect.current.iceConnectionState ===
                                "connected" ||
                            peerConnect.current.iceConnectionState ===
                                "completed"
                        ) {
                            console.log(
                                "Skipping ICE candidate, connection is already stable."
                            );
                            return;
                        }

                        if (
                            event.candidate &&
                            event.candidate.candidate !== ""
                        ) {
                            await connection.invoke(
                                "SendCandidate",
                                value.callerId,
                                event.candidate
                            );
                            console.log("Sent ICE candidate:", event.candidate);
                        } else {
                            console.log(
                                "All ICE candidates have been gathered."
                            );
                        }
                    };

                    pendingCandidates.forEach(async (candidate) => {
                        try {
                            await peerConnect.current
                                .addIceCandidate(new RTCIceCandidate(candidate))
                                .then(() => {
                                    console.log(
                                        "Caller added ICE candidate successfully."
                                    );
                                })
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
                } catch (error) {
                    console.log("Lỗi", error);
                }
            });
        }
    });

    const turnOffVideo = () => {
        if (userVideo.current && userVideo.current.srcObject) {
            const tracks = userVideo.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
        }
    };

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
        turnOffVideo();
        setHaveCalling(false);
        setHaveUser();
        stopMedia();
    };

    async function stopMedia() {
        stopMediaStream(localStream.current);
        if (peerConnect.current) {
            await peerConnect.current.close();
        }
    }

    const stopMediaStream = async (stream) => {
        if (stream) {
            await stream.getTracks().forEach((track) => {
                track.stop();
            });
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
                                    onClick={() => handleAcceptCall()}
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
                    style={{ display: !haveCalling && `none` }}
                >
                    <video
                        className={styles.video}
                        ref={otherVideo}
                        autoPlay
                        playsInline
                        muted
                    ></video>
                    <div className={styles.actions}>
                        <i
                            onClick={() => setToggleCamera(!toggleCamera)}
                            className={clsx(
                                styles.camera,
                                toggleCamera
                                    ? "fa-solid fa-video"
                                    : "fa-solid fa-video-slash"
                            )}
                        ></i>
                        <i
                            onClick={() => setToggleVolume(!toggleVolume)}
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
