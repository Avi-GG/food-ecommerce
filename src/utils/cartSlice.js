import { createSlice } from "@reduxjs/toolkit";
import { firestore, auth } from "../firebase";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firestore = getFirestore();
const auth = getAuth();

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || [],
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },

    addItem: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item?.card?.info?.id === action.payload?.card?.info?.id
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, increment its count
        state.items[existingItemIndex].count += 1;
      } else {
        // Otherwise, add the new item with count 1
        state.items.push({ ...action.payload, count: 1 });
      }

      // If the user is logged in, save to Firestore
      if (auth.currentUser) {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        setDoc(userRef, { cart: state.items }, { merge: true });
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Save to localStorage
    },

    removeItem: (state, action) => {
      // Remove item based on unique id
      const { id } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item?.card?.info?.id === id
      );

      if (existingItemIndex !== -1) {
        // Decrement the count of the item
        if (state.items[existingItemIndex].count > 1) {
          state.items[existingItemIndex].count -= 1;
        } else {
          // If count is 1, remove the item completely
          state.items = state.items.filter(
            (item) => item?.card?.info?.id !== id
          );
        }
      }

      // If the user is logged in, update Firestore with the new cart
      if (auth.currentUser) {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        setDoc(userRef, { cart: state.items }, { merge: true });
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Save to localStorage
    },

    clearCart: (state) => {
      state.items = [];
      // If the user is logged in, clear the cart in Firestore
      if (auth.currentUser) {
        const userRef = doc(firestore, "users", auth.currentUser.uid);
        setDoc(userRef, { cart: [] }, { merge: true });
      }
      localStorage.setItem('cart', JSON.stringify(state.items)); // Save to localStorage
    },
  },
});

export const { setCartItems, addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
