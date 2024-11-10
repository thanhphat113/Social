import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const SetUser = createAsyncThunk("User/get", async () => {
    try {
        const response = await axios.get(
            "http://localhost:5164/api/User/user-login",
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch {
        return null;
    }
});

const getRequests = createAsyncThunk("User/getRequests", async (userid) => {
    try {
        const response = await axios.get("http://localhost:5164/Request", {
            params: { id: userid },
            withCredentials: true,
        });
        return response.data;
    } catch {
        return null;
    }
});

const acceptRequests = createAsyncThunk(
    "User/acceptRequests",
    async (userid) => {
        try {
            const response = await axios.post(
                "http://localhost:5164/Request",
                {},
                {
                    params: { otheruser: userid },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            return response.data;
        } catch {
            return null;
        }
    }
);

const deleteRequests = createAsyncThunk(
    "User/deleteRequests",
    async (userid) => {
        try {
            const response = await axios.delete(
                `http://localhost:5164/Request/${userid}`,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            return response.data;
        } catch {
            return null;
        }
    }
);

const getPostRequests = createAsyncThunk(
    "User/getPostRequests",
    async (userid) => {
        try {
            const response = await axios.get("http://localhost:5164/Request", {
                params: { id: userid },
                withCredentials: true,
            });
            return response.data;
        } catch {
            return null;
        }
    }
);

export { SetUser, getRequests, acceptRequests, deleteRequests };
