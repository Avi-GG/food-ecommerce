import { useState, useEffect } from "react";
import { LOGO_URL } from "../utils/constants";
import { NavLink, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import LOGO from "../utils/logo.png";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Default is false
    const btnName = isLoggedIn ? "Logout" : "Login";
    const OnlineStatus = useOnlineStatus();
    const navigate = useNavigate();
	const dispatch = useDispatch();

    // Subscribing to the store using selector
    const cartItems = useSelector((store) => store.cart.items);

    // Check if the user is logged in on initial render
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setIsLoggedIn(true); // If user is logged in, update state
            } else {
                setIsLoggedIn(false); // If user is logged out, update state
            }
        });

        return () => unsubscribe(); // Cleanup subscription on component unmount
    }, []);

    // Handle logout
    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                setIsLoggedIn(false); // Update state on logout
				dispatch(clearCart()); // Clear cart items on logout
                navigate("/login"); // Redirect to login page after logout
            })
            .catch((error) => {
                console.error("Logout failed", error);
            });
    };

    return (
        <div className="flex items-center justify-between text-emerald-700 bg-green-200 shadow-lg fixed z-10 w-full h-24 top-0 ">
            <div className="logo-container">
                <img
                    className="w-28 ml-5 drop-shadow-[0rem_0rem_1rem_#0DE789]"
                    src={LOGO}
                    alt="Logo"
                />
            </div>
            <div className="flex justify-between items-center h-full">
                <ul className="flex items-center justify-between w-full h-full">
                    <li className="pr-10">{OnlineStatus ? "🟢" : "🔴"}</li>
                    <li className="pr-10 group">
                        <NavLink className="relative" to="/">
                            Home
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                        </NavLink>
                    </li>
                    <li className="pr-10 group">
                        <NavLink className="relative" to="/about">
                            About
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                        </NavLink>
                    </li>
                    <li className="pr-10 group">
                        <NavLink className="relative" to="/contact">
                            Contact Us
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                        </NavLink>
                    </li>
                    <li className="pr-10 group">
                        <NavLink className="relative" to="/grocery">
                            Grocery
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                        </NavLink>
                    </li>
                    <li className="pr-10 group">
                        <NavLink className="relative" to="/cart">
                            Cart ({cartItems.length})
                            <span className="absolute left-0 bottom-0 h-[2px] w-full bg-green-600 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
                        </NavLink>
                    </li>
                    <button
                        className="login px-5 py-2 mr-10 rounded-lg bg-[#c5680c] hover:bg-white hover:text-[#c5680c] hover:border-2 border-2 border-white hover:border-[#c5680c] text-white p-2"
                        onClick={() => {
                            isLoggedIn ? handleLogout() : navigate("/login");
                        }}
                    >
                        {btnName}
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default Header;
