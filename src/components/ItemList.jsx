import { list } from 'postcss'
import React from 'react'
import { CDN_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from "../utils/cartSlice";
import Shimmer from './Shimmer';

const ItemList = ({ items = [], showRemoveBtn}) => {
    // console.log(items);
    const dispatch = useDispatch();
    const handleAddItem = (item) => {
        //dispatch an action 
        dispatch(addItem(item));
    }
    const handleRemove = (item) => {
        dispatch(removeItem({ id: item?.card?.info?.id }));
    };

    
  return ( 
    <div>
        
        <ul>
            {items.map((item) =>(
                <div key={item?.card?.info?.id} className='p-8 m-2 border-b-2 border-gray-300 text-xs text-left flex justify-between'>
                    <div className='w-9/12'>
                        <div className=' font-semibold py-2'>
                            <span className=''>{item?.card?.info?.name}</span>
                            <span>  -  ₹ {(item?.card?.info?.price || item?.card?.info?.defaultPrice) / 100}</span>
                            <span> (x{item.count})</span> {/* Display the count */}
                        </div>
                        <p>{item?.card?.info?.description}</p>
                    </div>
                    <div>
                        <div className='w-32 h-32 overflow-hidden relative rounded-md'>
                            
                            <img className='w-32 z-0 object-contain relative -top-4 overflow-hidden rounded-md' src={CDN_URL + item?.card?.info?.imageId} alt="" />
                            
                        </div>
                        <div className=' mx-6 relative top-1  rounded-lg -my-5 flex'>
                            <button className={`p-2 z-2 relative ${showRemoveBtn && "-left-5"}  bg-[#c5680c] text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300`} onClick={() => handleAddItem(item)}> ADD + </button>
                            {showRemoveBtn && <button className='p-2 z-2  relative bg-red-600 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300' onClick={() => handleRemove(item)}> REMOVE - </button>}
                        </div>
                    </div>
                </div>))}
        </ul>
      
    </div>
  )
}

export default ItemList
