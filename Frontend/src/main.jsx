import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useState,createContext } from "react";

import MessagePage from "./pages/Message";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Profile from "./pages/Profile";
// import ProfileGroup from "./pages/ProfileGroup";
import Login from "./pages/Login/index.jsx";
import Information from "./pages/Information/index.jsx";
import ProfileGroup from "./pages/ProfileGroup/index.jsx";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    return (
        <Router>
            {isAuthenticated ? (
                <DefaultLayout>
                    <Routes>
                        <Route path="/message" element={<MessagePage />} />
                        <Route path="/" element={<MessagePage />} />
                        <Route path="/group" element={<MessagePage />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/information" element={<Information />} />
                    </Routes>
                </DefaultLayout>
            ) : (
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <Login onLogin={() => {
                                setIsAuthenticated(true)
                                
                                }
                                } />
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            )}
        </Router>
    );
}

export default App;