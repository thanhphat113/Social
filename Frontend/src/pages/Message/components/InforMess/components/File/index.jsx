import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./File.module.scss";

function File() {
    const [files, setFiles] = useState([]);
    const messageId = useSelector(
        (state) => state.message.currentMessage.messagesId
    );

    useEffect(() => {
        callMedia(messageId);

        return () => {
            setFiles([]);
        };
    }, []);

    const download = (target) => {
        const link = document.createElement("a");
        link.href = `http://localhost:3000/public/file/${target.src}`;
        link.download = target.src;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const callMedia = async (MessageId) => {
        try {
            const response = await axios.get(
                `http://localhost:5164/api/Media`,
                {
                    params: { MessageId: MessageId, Type: "file" },
                    withCredentials: true,
                }
            );
            setFiles(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.wrapper}>
            <h1 className="have-line">Danh sách file</h1>
            <div className={styles.list}>
                {files.length > 0 ? (
                    files.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => download(item)}
                            className={styles.item}
                        >
                            <i className="fa-solid fa-file"></i>
                            {item.src.split('/').pop()}
                        </li>
                    ))
                ) : (
                    <p>Rỗng</p>
                )}
            </div>
        </div>
    );
}

export default File;
