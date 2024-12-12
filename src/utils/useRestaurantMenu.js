import { MENU_API } from '../utils/constants';
import { useState, useEffect } from 'react';

//custom-hook
const useRestaurantMenu = (resId) => {

    const [resInfo, setresInfo] = useState(null);

    useEffect(() => {
        fetchMenu();
      }, [])
      
      const fetchMenu = async () => {
          const data  = await fetch(MENU_API + resId);
          const json = await data.json();
          // console.log(json);
          setresInfo(json);
      };
      
      return resInfo;
}

export default useRestaurantMenu;