import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import GlobalStyles from "./components/GlobalStyles/index.jsx";
import { Provider } from "react-redux";
import Store from "~/components/Redux/Store/index";

createRoot(document.getElementById("root")).render(
    <Provider store={Store}>
    <StrictMode>
        <Router>
            <GlobalStyles>
                <App />
            </GlobalStyles>
        </Router>
    </StrictMode>
    </Provider>
);