import React from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";
import { CDN_URL } from "../utils/constants";

const RestaurantMenu = () => {
	const { resId } = useParams(); // getting restaurant id from url

	const resInfo = useRestaurantMenu(resId); //custom-hook

	if (resInfo === null) {
		return <Shimmer />;
	}

	// console.log(resInfo);
	const { name, cuisines, cloudinaryImageId, costForTwoMessage , avgRating, sla} =
		resInfo?.data?.cards[2]?.card?.card?.info;
	// console.log(name, cuisines, cloudinaryImageId, costForTwoMessage);

	const itemsCard =
		resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
			?.card?.itemCards;
	// console.log(resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

	const categories =
		resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
			(c) =>
				c.card?.card?.["@type"] ===
				"type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
		);
	console.log(categories);

	return (
		<div className="menu text-center">
			<div className="menu text-center bg-[#1c1c1c] w-8/12 mx-auto h-60 flex p-3 rounded-lg">
				<img
					className=" rounded-lg w-80 object-cover"
					src={CDN_URL + cloudinaryImageId}
					alt={name}
				/>
				<div class="restaurant-summary-details flex flex-col h-full  w-1/2 text-left  m-5  text-white">
					<h1 class="restaurant-title text-4xl">{name}</h1>
					<p class="restaurant-tags text-gray-400 mt-3">{cuisines.join(", ")}</p>
					<div class="restaurant-details font-semibold flex gap-3 mt-8">
						<span class="restaurant-rating" >
							<i class="fa-solid fa-star"></i>
							<span>{avgRating}</span>
						</span>
						<span class="restaurant-rating-slash">|</span>
						<span>{sla?.slaString} </span>
						<span class="restaurant-rating-slash">|</span>
						<span>{costForTwoMessage}</span>
					</div>
				</div>

				{/* <h1 className="font-bold my-6 text-3xl">{name}</h1> */}
			</div>
			{/* <h1 className="font-bold my-6 text-3xl">{name}</h1>
			<h5 className="font-bold text-lg">
				{cuisines.join(", ")} - {costForTwoMessage}
			</h5> */}

			{/* categories accordions */}
			{categories.map((category) => (
				<RestaurantCategory
					key={category?.card?.card?.title}
					data={category?.card?.card}
					showItems={false}
				/>
			))}

			{/* <ul>  
          {itemsCard?.length > 0 ? (
            itemsCard.map((item) => (
              <li key={item?.card?.info?.id}>
                {item?.card?.info?.name} - Rs. {item?.card?.info?.price /100}
              </li>
            ))
          ) : (
            <li>No items available</li>
          )}
        </ul> */}
		</div>
	);
};

export default RestaurantMenu;
