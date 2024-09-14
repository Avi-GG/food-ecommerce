import { CDN_URL } from "../utils/constants";


const RestaurantCard = ({cloudinaryImageId, name,cuisines,area,sla, costForTwo, avgRating,}) => {
	
	
	return (
		<div className="res-card">
			<div className="res-logo">
				<img
					src={ CDN_URL
						 +
						cloudinaryImageId
					} height="150"
				/>
			</div>
			<h3>{name}</h3>
			<h4>{cuisines.join(", ")}</h4>
			<h4>{avgRating}</h4>
			<p>{costForTwo}</p>
			<p>{sla?.slaString} </p>
		</div>
	);
};

export default RestaurantCard;