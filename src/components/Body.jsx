import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

import React from "react";

const Body = () => {
	const [restaurantList1, setrestaurantList] = useState([]);
	const [filteredRestaurants, setfilteredRestaurants] = useState([])
	const [searchText, setsearchText] = useState("");

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		
			const data = await fetch(
				"https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=29.4844043&lng=77.7151616&carousel=true&third_party_vendor=1"
			);
			
			const json = await data.json();
			console.log(json);
			console.log(
				json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
			);
			setrestaurantList(
				json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
			);
			setfilteredRestaurants(
				json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
			);
		
		}

	return (restaurantList1.length === 0 ? <Shimmer /> :
		<div className="body">
			<div className="filter">
				<div className="search">
					<input type="text" name="" id="" className="search-box" value={searchText} onChange={(e) => {
						setsearchText(e.target.value);
					}} />
					<button onClick={() => {
						const filteredrestaurants = restaurantList1.filter((res) => {
							return res.info.name.toLowerCase().includes(searchText.toLowerCase());
						})
						setfilteredRestaurants(filteredrestaurants);
					}}>search</button>
				</div>
				<button
					className="filter-btn"
					onClick={() => {
						const filteredList = restaurantList1.filter(
							(res) => res.info.avgRating > 4
						);
						setrestaurantList(filteredList);
					}}
				>
					Top Rated Restaurants
				</button>
			</div>
			<div className="res-container">
				{filteredRestaurants.map((restaurant) => (
					<RestaurantCard key={restaurant.info.id} {...restaurant.info} />
				))}
				
			</div>
		</div>
	);
};

export default Body;
