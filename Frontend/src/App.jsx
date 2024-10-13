import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

import Login from "./pages/Login";
import Message from "./pages/Message";
// import GroupList from "./pages/Group/components/GroupList";
import Home from "./pages/Home/Home";
import Information from "./pages/Information";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/Profile";
// import ProfileGroup from "./pages/ProfileGroup";
import Login from "./pages/Login/index.jsx";
import Information from "./pages/Information/index.jsx";
import ProfileGroup from "./pages/ProfileGroup/index.jsx";
import Home from "./pages/Home";

export const AccountContext = createContext();

function App() {
    // const [account, setAccount] = useState([]);
    // const [error, setError] = useState("");
    // const [loading,setLoading] = useState(false);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:5164/api/User")
    //         .then((response) => {
    //             setAccount(response.data);
    //         })
    //         .catch((error) => {
    //             setError(error); // Xử lý lỗi
    //             setLoading(false);
    //         });
    // }, []);

    return (
        <Router>
            <DefaultLayout>
                <Routes>
                    <Route path="/message" element={<Message />} />
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/group" element={<GroupList />} /> */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/information" element={<Information />} />
                </Routes>
            </DefaultLayout>
            {/* <Routes>
                    <Route
                        path="/login"
                        element={<Login/>} />
                    <Route path="*" element={<Login></Login>} />
                </Routes> */}
        </Router>
    );
}

export default App;
