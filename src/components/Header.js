import { useState } from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const btnName = isLoggedIn ? "Logout" : "Login";
	return (
		<div className="header">
			<div className="logo-container">
				<img
					className="logo" 
					src={LOGO_URL}
				></img>
			</div>
			<div className="nav-items">
				<ul>
					<li>Home</li>
					<li>About</li>
					<li>Contact Us</li>
					<li>Cart</li>
                    <button className="login" onClick={() => {
                        setisLoggedIn(!isLoggedIn);
                    }}>{btnName}</button>
				</ul>
			</div>
		</div>
	);
};


export default Header;