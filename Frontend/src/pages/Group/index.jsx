<<<<<<< HEAD
import React, { useEffect } from 'react';
import { useState } from "react";
import axios from "axios";
import clsx from "clsx";
import styles from "./Group.module.scss";
import Itemgroup from "./components/Itemgroup";
import CreateGroup from './components/CreateGroup';

function Group(){
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true); // State để điều khiển sidebar
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]); 


    useEffect(() => {
        const getsearch = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5164/api/Group1/search`,
                    {
                        params: { name: search },
                        withCredentials: true,
                    }
                );
                console.log(response.data)
                setList(response.data)
            } catch (error) {
                console.log(error)
            }
        };
        search ? getsearch(): setList([])
    }, [search]);

    const handleCreateGroupClick = () => {
        setIsCreatingGroup(!isCreatingGroup); // Toggle trạng thái
        setShowSidebar(!showSidebar); // Toggle sidebar
    };

    const handleCancelCreateGroup = () => {
        setIsCreatingGroup(false); // Đặt lại trạng thái ban đầu
        setShowSidebar(true); // Hiển thị lại sidebar
    };

    return (
        <div className={styles.wrapper}>
             <div className={clsx(styles.left, { [styles.hidden]: !showSidebar })}>
                <div className={styles.sidebar}>
                    <h1>Nhóm</h1>
                   
                    <div className={styles.search}>
                        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" placeholder=" Tìm kiếm nhóm"/>
                    </div>
                        
                    <button onClick={handleCreateGroupClick} className={styles.creategroup}> {isCreatingGroup ? 'Hủy tạo nhóm' : '+ Tạo nhóm mới'}</button>
                </div>
            </div>
            
            <div className={styles.right}>
                {isCreatingGroup ? <CreateGroup onCancel={handleCancelCreateGroup} /> : <Itemgroup list={list} />}
            </div>            
        </div>
    )
}

export default Group
=======
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import clsx from "clsx";
import styles from "./Group.module.scss";
import Itemgroup from "./components/Itemgroup";
import CreateGroup from "./components/CreateGroup";

function Group() {
    const [isCreate, setIsCreate] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true); // State để điều khiển sidebar
    const [search, setSearch] = useState("");
    const [listSearch, setListSearch] = useState([]);
    const [allGroups, setAllGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const getsearch = async () => {
            if (loading) return;
            setLoading(true);

            try {
                const response = await axios.get(
                    `http://localhost:5164/api/Group/group-list-by-name`,
                    {
                        params: { Name: search },
                        withCredentials: true,
                    }
                );
                setListSearch(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        search ? getsearch() : setListSearch([]);
    }, [search]);

    const getAll = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:5164/api/Group`,
                {
                    params: { OffSet: offset, Limit: 6 },
                    withCredentials: true,
                }
            );
            setAllGroups([...allGroups,...response.data]);
            setOffset(offset + 6);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAll(); // Tải dữ liệu khi component mount
        return () => {
            setAllGroups([])
        }
    }, []);

    const handleScroll = (e) => {
        const bottom =
            e.target.scrollHeight ===
            e.target.scrollTop + e.target.clientHeight;
        if (bottom && !loading) {
            getAll();
        }
    };

    return (
        <div className={styles.wrapper}>
            <div
                className={clsx(styles.left, { [styles.hidden]: !showSidebar })}
            >
                <div className={styles.sidebar}>
                    <h1>Nhóm</h1>

                    <div className={styles.search}>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder=" Tìm kiếm nhóm"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setShowSidebar(!showSidebar) 
                            setIsCreate(!isCreate)}}
                        className={styles.creategroup}
                    >
                        {" "}
                        {isCreate ? "Hủy tạo nhóm" : "+ Tạo nhóm mới"}
                    </button>
                </div>
            </div>

            <div  className={styles.right}>
                {isCreate ? (
                    <CreateGroup onCancel={setIsCreate} />
                ) : (
                    <Itemgroup handle={handleScroll} list={allGroups} />
                )}
            </div>
        </div>
    );
}

export default Group;
>>>>>>> origin/main
