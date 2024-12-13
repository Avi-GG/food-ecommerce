import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import { useContext, useEffect, useState, } from "react";
import Shimmer from "./Shimmer";
import React from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { withPromotedLabel } from "./RestaurantCard";
import UserContext from "../utils/UserContext";

const Body = () => {
	const [restaurantList1, setrestaurantList] = useState([]);
	const [filteredRestaurants, setfilteredRestaurants] = useState([])
	const [searchText, setsearchText] = useState("");
	
	const RestaurantCardPromted = withPromotedLabel(RestaurantCard);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		
			const data = await fetch(
				"https://foodfire.onrender.com/api/restaurants?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING"
			);
			
			const json = await data.json();
			// console.log(json);
			// console.log(restaurantList1);
			console.log( 
				json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
			);
			setrestaurantList(
				json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
			);
			setfilteredRestaurants(
				json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
			);
		
		}

		const OnlineStatus = useOnlineStatus();
		if(!OnlineStatus){
			return <div>You are offline. Please check your internet connection.</div>;
		}


		// const {LoggedInUser, setUserName} = useContext(UserContext);

	return (restaurantList1.length === 0 ? <Shimmer /> :
		<div className="body">
			<div className="filter flex justify-center">
				<div className="search m-4 p-4">
					<input type="text" name="" id="" placeholder="Search the restaurant..." className="border-black border-solid border-2 rounded-lg h-8 focus:outline-green-600 px-4" value={searchText} onChange={(e) => {
						setsearchText(e.target.value); //for updating state and re-rendering
					}} />
					<button className="px-4 py-1 rounded  bg-green-200 border-2 border-transparent hover:border-green-700 m-4" onClick={() => {
						const filteredrestaurants = restaurantList1.filter((res) => {
							return res.info.name.toLowerCase().includes(searchText.toLowerCase());
						})
						setfilteredRestaurants(filteredrestaurants);
					}}>search</button>
				</div>
				<div className="m-4 p-4 flex items-center ">
					<button
						className="filter-btn px-4 py-1 bg-gray-200 border-2 border-transparent hover:border-gray-700 rounded"
						onClick={() => {
							const filteredList = restaurantList1.filter(
								(res) => res.info.avgRating > 4.5
							);
							setrestaurantList(filteredList);
						}}
					>
						Top Rated Restaurants
					</button>
					{/* <div>
						<input type="text" name="" id="" placeholder="Search the restaurant..." className="border-black border-solid border-2 rounded-lg h-8 focus:outline-green-600 px-4" value={LoggedInUser} onChange={(e) => {
							setUserName(e.target.value); //for updating state and re-rendering
						}} />
					</div> */}
				</div>
			</div>
			<div className="res-container flex justify-center flex-wrap">
				{filteredRestaurants.map((restaurant) => (
					<Link className="m-4" key={restaurant.info.id} to={"/restaurants/"+restaurant.info.id}><RestaurantCard {...restaurant.info} /> </Link>
				))}
				
			</div>
		</div>
	);
};

export default Body;
