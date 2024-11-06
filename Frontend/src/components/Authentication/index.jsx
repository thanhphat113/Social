import { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";



function Authentication ({ children }) {
    const user = useSelector((state) => state.user.information)

    if (user) {
        return children
    }

    return <Navigate to="/login"></Navigate>
    
};

export default Authentication;