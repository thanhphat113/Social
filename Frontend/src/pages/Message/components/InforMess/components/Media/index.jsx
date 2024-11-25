import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./Media.module.scss";
import axios from "axios";

function Media() {
    const [medias, setMedias] = useState([]);
    const [show, setShow] = useState();
    const messageId = useSelector(
        (state) => state.message.currentMessage.messagesId
    );
    const imgRef = useRef(null);
    const downloadRef = useRef(null);

    const picture = show ? medias.find((m) => m.mediaId === show) : null;

    useEffect(() => {
        callMedia(messageId);

        return () => {
            setShow(null);
            setMedias([]);
        };
    }, []);

    const downloadImage = () => {
        const link = document.createElement("a");
        link.href = `http://localhost:3000/public/file/${picture.src}`;
        link.download = picture.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const callMedia = async (MessageId) => {
        try {
            const response = await axios.get(
                `http://localhost:5164/api/Media`,
                {
                    params: { MessageId: MessageId },
                    withCredentials: true,
                }
            );
            setMedias(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                imgRef.current &&
                !imgRef.current.contains(event.target) &&
                downloadRef.current &&
                !downloadRef.current.contains(event.target)
            ) {
                setShow(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <h1 className="have-line">Danh sách Media</h1>
            <div className={styles.container}>
                {medias.length > 0 &&
                    medias.map((item) => (
                        <img
                            onClick={() => setShow(item.mediaId)}
                            key={item.mediaId}
                            className={styles.source}
                            src={`${item.src}`}
                            alt="ảnh"
                        ></img>
                    ))}
            </div>
            {picture && (
                <div className={styles.showOnly}>
                    <div className={styles.action}>
                        <i
                            ref={downloadRef}
                            onClick={(e) => {
                                e.stopPropagation();
                                downloadImage();
                            }}
                            className="fa-solid fa-download"
                        ></i>
                        <i
                            onClick={() => setShow(null)}
                            className="fa-solid fa-x"
                        ></i>
                    </div>
                    <img
                        ref={imgRef}
                        className={styles.item}
                        src={`${picture.src}`}
                    ></img>
                </div>
            )}
        </div>
    );
}

export default Media;
