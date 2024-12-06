import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


function Authentication({ children }) {
    const user = useSelector((state) => state.user.information);

    return (
        <div>
            {user ? children : <Navigate to="/login"></Navigate>}
        </div>
    );
}

export default Authentication;
