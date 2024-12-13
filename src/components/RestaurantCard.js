import { CDN_URL } from "../utils/constants";



const RestaurantCard = ({cloudinaryImageId, name,cuisines,area,sla, costForTwo, avgRating,}) => {
	
	
	return (
		<div className="res-card m-2 p-4 w-60 rounded h-[22rem] bg-gray-100 hover:scale-110 transition-all shadow-2xl relative">
			<div className="res-logo">
				<img
					className=" h-40 rounded-lg w-full"
					src={ CDN_URL
						 +
						cloudinaryImageId
					} 
				/>
			</div>
			<h3 className="font-bold pt-4 text-md">{name}</h3>
			<h4 className="text-sm">{cuisines.join(", ")}</h4>
			<div className="absolute bottom-5 text-sm flex gap-3 items-center">
				<span className="py-1 px-2 bg-green-700 text-white font-semibold rounded-lg">⭐{avgRating.toString().includes('.')? avgRating: avgRating+'.0'}</span>•
				<span className="font-semibold ">{costForTwo}</span>
			</div>
			
			<span className="p-2 absolute rounded-r-[62.438rem] text-white bg-orange-700 top-0 -left-1">
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