import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import React from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

import UserContext from "../utils/UserContext";

const Body = () => {
	const [restaurantList1, setrestaurantList] = useState([]);
	const [filteredRestaurants, setfilteredRestaurants] = useState([]);
	const [searchText, setsearchText] = useState("");
	const [isTopRated, setIsTopRated] = useState(false); // New state for filtering top rated restaurants

	const RestaurantCardPromted = withPromotedLabel(RestaurantCard);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const data = await fetch(
				"https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
			);

			const json = await data.json();
			const restaurants =
				json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
					?.restaurants;

			if (restaurants) {
				setrestaurantList(restaurants);
				setfilteredRestaurants(restaurants);
			} else {
				console.error("No restaurants found");
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const OnlineStatus = useOnlineStatus();
	if (!OnlineStatus) {
		return <div>You are offline. Please check your internet connection.</div>;
	}

	const toggleTopRatedFilter = () => {
		if (isTopRated) {
			// If filter is applied, remove it
			setfilteredRestaurants(restaurantList1);
		} else {
			// Apply filter for top-rated restaurants
			const filteredList = restaurantList1.filter(
				(res) => res.info.avgRating >= 4.5
			);
			setfilteredRestaurants(filteredList);
		}
		setIsTopRated(!isTopRated); // Toggle filter state
	};
	// const {LoggedInUser, setUserName} = useContext(UserContext);

	return restaurantList1.length === 0 ? (
		<Shimmer />
	) : (
		<div className="body">
			<div className="w-full h-screen relative">
				{/* Hero Section */}
				<div
					className="w-full h-3/5 bg-cover bg-center"
					style={{
						backgroundImage: `url(${"https://static.vecteezy.com/system/resources/previews/036/804/331/non_2x/ai-generated-assorted-indian-food-on-dark-wooden-background-free-photo.jpg"})`,
					}}
				>
					<div className="w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-center text-white">
						<h1 className="text-4xl md:text-6xl font-bold mb-4">
							Delicious Deals Await 🍔
						</h1>
						<p className="text-xl md:text-2xl font-medium mb-8">
							Order now and enjoy exclusive discounts on your favorite cuisines!
						</p>
						<Link
							to="#"
							onClick={() => {
								document.getElementById("restaurants")?.scrollIntoView({
								  behavior: "smooth",
								  block: "start",
								});
							}}
							className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg"
						>
							Explore Restaurants
						</Link>
					</div>
				</div>

				{/* Offers Section */}
				<div className="p-6 md:p-12 bg-gray-50 text-center">
					<h2 className="text-3xl font-bold text-gray-800 mb-6">
						Today's Special Offers 💥
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="bg-white shadow-md rounded-lg p-4">
							<h3 className="text-xl font-semibold text-orange-500">
								Flat 50% Off
							</h3>
							<p className="text-gray-600">On all orders above ₹300</p>
						</div>
						<div className="bg-white shadow-md rounded-lg p-4">
							<h3 className="text-xl font-semibold text-orange-500">
								Free Delivery
							</h3>
							<p className="text-gray-600">On your first 3 orders</p>
						</div>
						<div  className="bg-white shadow-md rounded-lg p-4">
							<h3  className="text-xl font-semibold text-orange-500">
								Buy 1 Get 1 Free
							</h3>
							<p id="restaurants" className="text-gray-600">On select dishes</p>
						</div>
					</div>
					
				</div>
			</div>
			<div  className="filter flex justify-center ">
				<div className="search m-4 p-4">
					<input
						type="text"
						name=""
						id=""
						placeholder="Search the restaurant..."
						className="border-black border-solid border-2 rounded-lg h-8 focus:outline-green-600 px-4"
						value={searchText}
						onChange={(e) => {
							setsearchText(e.target.value); //for updating state and re-rendering
						}}
					/>
					<button
						className="px-4 py-1 rounded  bg-green-200 border-2 border-transparent hover:border-green-700 m-4"
						onClick={() => {
							const filteredrestaurants = restaurantList1.filter((res) => {
								return res.info.name
									.toLowerCase()
									.includes(searchText.toLowerCase());
							});
							setfilteredRestaurants(filteredrestaurants);
						}}
					>
						search
					</button>
				</div>
				<div className="m-4 p-4 flex items-center ">
					<button
						className="filter-btn px-4 py-1 bg-gray-200 border-2 border-transparent hover:border-gray-700 rounded"
						onClick={toggleTopRatedFilter}
					>
						{isTopRated ? "Show All Restaurants" : "Top Rated Restaurants"}
					</button>
					{/* <div>
						<input type="text" name="" id="" placeholder="Search the restaurant..." className="border-black border-solid border-2 rounded-lg h-8 focus:outline-green-600 px-4" value={LoggedInUser} onChange={(e) => {
							setUserName(e.target.value); //for updating state and re-rendering
						}} />
					</div> */}
				</div>
			</div>
			<div  className="res-container flex justify-center flex-wrap">
				{filteredRestaurants.map((restaurant) => (
					<Link
						className="m-4 relative"
						key={restaurant.info.id}
						to={"/restaurants/" + restaurant.info.id}
					> {console.log(restaurant)}
						<RestaurantCard {...restaurant.info} />{" "}
						 {/* Render Veg/Non-Veg Tag */}
						 
					</Link>
				))}
			</div>
		</div>
	);
};

export default Body;
