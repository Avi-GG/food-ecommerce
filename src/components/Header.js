import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { NavLink } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import LOGO from "../utils/logo.png";
import { useSelector } from "react-redux";


const Header = () => {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const btnName = isLoggedIn ? "Logout" : "Login";

	const OnlineStatus = useOnlineStatus();

	//Subscribing to the store using selector
	const cartItems = useSelector((store) => store.cart.items);


	return (
		<div className="flex items-center justify-between text-emerald-700  bg-green-200 shadow-lg">
			<div className="logo-container">
				<img
					className="w-40 ml-5 drop-shadow-[0rem_0rem_1rem_#0DE789]" 
					src={LOGO}
				></img>
			</div>
			<div className="flex justify-between items-center   h-full">
				<ul className="flex items-center justify-between w-full h-full">
					<li className="pr-10">{OnlineStatus? "🟢" : "🔴"}</li>
					<li className="pr-10  group"><NavLink className="relative" to="/">Home <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span></NavLink></li>
					<li className="pr-10  group"><NavLink className="relative" to="/about">About <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span></NavLink></li>
					<li className="pr-10  group"><NavLink className="relative" to="/contact">Contact Us <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span></NavLink></li>
					<li className="pr-10  group"><NavLink className="relative" to="/grocery">Grocery <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span></NavLink></li>
					<li className="pr-10  group"><NavLink className="relative" to="/cart">Cart ({cartItems.length}) <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span></NavLink></li>
                    <button className="login pr-10" onClick={() => {
                        setisLoggedIn(!isLoggedIn);
                    }}>{btnName}</button>
				</ul>
			</div>
		</div>
	);
};


export default Header;