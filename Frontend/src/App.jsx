import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getuser = async () => {
            const response = await dispatch(SetUser());
            if (SetUser.fulfilled.match(response)) {
                navigate("/");
            }
        };
        getuser();
    }, []);

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
                    path="/profile"
                    element={
                        <Authentication>
                            <Profile />
                        </Authentication>
                    }
                />
                <Route
                    path="/profilegroup"
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
