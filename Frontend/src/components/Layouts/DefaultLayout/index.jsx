import { Outlet } from "react-router-dom";
import Header from "./Header";

function DefaultLayout() {
	return ( 
		<div>
			<Header />
			<div className="container">
				<Outlet/>
			</div>
		</div>
	 );
}

export default DefaultLayout;