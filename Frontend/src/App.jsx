import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import Message from "./pages/Message";
// import GroupList from "./pages/Group/components/GroupList";
import ProfileGroup from "./pages/ProfileGroup";
import Home from "./pages/Home";
import Information from "./pages/Information";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/Profile";
import Authentication from "./components/Authentication";
import { SetUser } from "./components/Redux/Actions/UserAction";
import LoadingPage from "./pages/Loading/index.jsx";


function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getuser = async () => {
            await dispatch(SetUser());
            setLoading(false);
        };
        getuser();
    }, []);

    if(loading){ return(<LoadingPage/>)}

    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route
                    path="/message"
                    element={
                        <Authentication>
                            <Message />
                        </Authentication>
                    }
                />
                <Route
                    path="/"
                    element={
                        <Authentication>
                            <Home />
                        </Authentication>
                    }
                />
                {/* <Route
                    path="/group"
                    element={
                        <Authentication>
                            <GroupList />
                        </Authentication>
                    }
                /> */}
                <Route
                    path="/profile/:userId"
                    element={
                        <Authentication>
                            <Profile/>
                        </Authentication>
                    }
                />
                <Route
                    path="/profilegroup/:groupId"
                    element={
                        <Authentication>
                            <ProfileGroup />
                        </Authentication>
                    }
                />
                <Route
                    path="/information"
                    element={
                        <Authentication>
                            `<Information />
                        </Authentication>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Login />} />
            </Route>
        </Routes>
    );
}

export default App;
