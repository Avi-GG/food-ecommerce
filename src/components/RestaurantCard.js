import { CDN_URL } from "../utils/constants";



const RestaurantCard = ({cloudinaryImageId, name,cuisines,area,sla, costForTwo, avgRating,}) => {
	
	
	return (
		<div className="res-card m-2 p-4 w-60 rounded h-full bg-gray-100 hover:scale-110 transition-all shadow-2xl relative">
			<div className="res-logo">
				<img
					className=" h-40 rounded-lg w-full"
					src={ CDN_URL
						 +
						cloudinaryImageId
					} 
				/>
			</div>
			<h3 className="font-bold py-4 text-lg">{name}</h3>
			<h4>{cuisines.join(", ")}</h4>
			<h4>{avgRating}</h4>
			<p>{costForTwo}</p>
			<span className="p-2 absolute rounded-[62.438rem] bg-green-100 top-0 -left-1">
				<p>{sla?.slaString} </p>
			</span>
			
			
			
		</div>
	);
};

//Higher Order Components -takes component as argument and returns the same component with some modifictaion to it
export const withPromotedLabel = (RestaurantCard) => {
	return (props) => {
		return (
			<div>
				<label>Promoted</label>
				<RestaurantCard {...props}/>
			</div>
		)
	}
}
export default RestaurantCard;