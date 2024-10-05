import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
// import MessagePage from "./pages/Message";
// import DefaultLayout from "./components/Layouts/DefaultLayout";
// import Profile from "./pages/Profile";
// import ProfileGroup from "./pages/ProfileGroup";
import Login from "./pages/Login/index.jsx";
import Information from "./pages/Information/index.jsx";

function App() {
    return (
        <Router>
        {/* <DefaultLayout>
                <Routes>
                    <Route path="/message" element={<MessagePage />} />
                    <Route path="/" element={<MessagePage />} />
                    <Route path="/group" element={<MessagePage />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
        </DefaultLayout> */}
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/info" element={<Information />} />
        </Routes>
            </Router>
    );
}

export default App;
