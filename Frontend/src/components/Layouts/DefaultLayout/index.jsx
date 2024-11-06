import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";


function DefaultLayout() {
    const user = useSelector((state) => state.user.information)
    return (
        <div>
            {user &&  <Header />}
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
}

export default DefaultLayout;
