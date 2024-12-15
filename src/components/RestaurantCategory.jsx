import React from "react";
import ItemList from "./ItemList";
import { useState } from "react";

const RestaurantCategory = ({ data }) => {
	const [showItems, setShowItems] = useState(false);
	const handleclick = () => {
		setShowItems(!showItems)
	};
	return (
		<div>
			{/* header */}
			<div className={`w-8/12 mx-auto my-4 bg-gray-50 shadow-lg   border-2 border-transparent rounded-md ${ !showItems && "hover:border-gray-400"} `}>
				<div className="w-full flex justify-between cursor-pointer transition-all ease-in-out p-8 " onClick={()=> (handleclick())}>
					<span className="font-bold text-lg">
						{data.title}({data.itemCards.length})
					</span>
					<span className="text-lg font-bold">{showItems ? "⤴" : "⤵"}</span>
				</div>

				{showItems && <ItemList items={data.itemCards}  showRemoveBtn={false}/>}
			</div>

			{/* body */}
		</div>
	);
};

export default RestaurantCategory;
