import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import MessagePage from "./pages/Message";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import Home from "./pages/Home/Home"

function App() {
    return (
        // <Router>
        // <DefaultLayout>
        //         <Routes>
        //             <Route path="/message" element={<MessagePage />} />
        //             <Route path="/" element={<MessagePage />} />
        //             <Route path="/group" element={<MessagePage />} />
        //         </Routes>
        // </DefaultLayout>
        //     </Router>
        <Home />
    );
}

export default App;
