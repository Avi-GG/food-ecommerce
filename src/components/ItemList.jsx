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
                    <div className='w-28 relative'>
                        
                        <img className='w-28 rounded-md' src={CDN_URL + item?.card?.info?.imageId} alt="" />
                        <div className='absolute mx-6 rounded-lg border -my-5 '>
                            <button className='p-2 bg-white shadow-lg rounded-lg bottom-0' onClick={() => handleAddItem(item)}> ADD + </button>
                        </div>
                    </div>
                    {showRemoveBtn && <button onClick={() => handleRemove(item)}>Remove</button>}
                    
                </div>))}
        </ul>
      
    </div>
  )
}

export default ItemList
