import { CDN_URL } from "../utils/constants";



const RestaurantCard = ({cloudinaryImageId, name,cuisines,area,sla, costForTwo, avgRating, veg}) => {
	
	
	return (
		<div className="res-card m-2 p-4 w-60 rounded h-[22rem] border-2 overflow-hidden border-gray-300 bg-gray-100 hover:scale-110 transition-all shadow-2xl relative">
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
			<div className="absolute bottom-5 z-2 text-sm flex gap-3 items-center">
				<span className="py-1 px-2  bg-green-700  text-white font-semibold rounded-lg">⭐{avgRating.toString().includes('.')? avgRating: avgRating+'.0'}</span>•
				<span className="font-semibold ">{costForTwo}</span>
			</div>
			
			<span className="p-2 absolute rounded-r-[62.438rem] text-sm z-2 text-white bg-orange-700 top-0 -left-1">
				<p>{sla?.slaString} </p>
			</span>
			<div
        className={`absolute top-0 right-0 w-20 text-white flex items-center justify-center h-20 ${veg? "bg-green-700":"bg-red-600"} z-2`}
        style={{
          clipPath: "polygon(100% 0%, 100% 100%, 50% 80%, 0% 100%, 0% 0%)", // Bookmark shape from the right side
        }}
      > {veg ? "Veg":"Non-Veg"}
        
      </div>
			
			
			
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