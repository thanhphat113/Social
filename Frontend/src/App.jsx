import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import MessagePage from "./pages/Message";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/Profile";
import ProfileGroup from "./pages/ProfileGroup";

function App() {
    return (
        <Router>
        <DefaultLayout>
                <Routes>
                    <Route path="/message" element={<MessagePage />} />
                    <Route path="/" element={<MessagePage />} />
                    <Route path="/group" element={<MessagePage />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
        </DefaultLayout>
            </Router>
    );
}

export default App;
