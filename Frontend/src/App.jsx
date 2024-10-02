import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import MessagePage from "./pages/Message";
import DefaultLayout from "./components/Layouts/DefaultLayout";

function App() {
    return (
        <DefaultLayout>
            <Router>
                <Routes>
                    <Route path="/message" element={<MessagePage />} />
                </Routes>
            </Router>
        </DefaultLayout>
    );
}

export default App;
