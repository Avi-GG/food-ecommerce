import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom'; // Importing useNavigate
import { useDispatch } from 'react-redux';  // Importing useDispatch
import { setCartItems } from '../utils/cartSlice'; // Import the action for setting cart items
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Firestore functions

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(); // Get the Firebase Auth instance
    const firestore = getFirestore(); // Initialize Firestore

    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user);
      
      // Fetch the user's cart from Firestore after login
      const userDocRef = doc(firestore, 'users', userCredential.user.uid); // Reference the user's document
      const cartSnapshot = await getDoc(userDocRef); // Get the document snapshot

      if (cartSnapshot.exists()) {
        // Set cart items to Redux store
        dispatch(setCartItems(cartSnapshot.data().cart || []));
      } else {
        console.log('No cart data found for this user.');
      }

      // Redirect to the home page after successful login
      navigate('/');
    } catch (error) {
      setError(error.message); // Display error message if login fails
    }
  };

  return (
    <div className='min-h-[75vh] flex items-center justify-center'>
      <div className='w-80 h-96 border border-[#c5680c] p-5 rounded-2xl shadow-2xl relative'>
        <h2 className='font-semibold text-3xl text-center mt-8 mb-5 text-[#c5680c]'>Login</h2>
        <form className='flex flex-col h-40 w-full' onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className='border border-[#c5680c] w-full shadow-lg rounded text-sm p-2 mt-5'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className='border border-[#c5680c] shadow-lg rounded text-sm p-2 mt-5'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className='bg-[#c5680c] hover:bg-[#d97919] w-20 py-2 mx-auto rounded mt-8 text-white' type="submit">Login</button>
        </form>
        {error && <p className='text-red-600 text-sm mt-9'>{error}</p>}
        <p className='text-sm text-center left-0 right-0 absolute bottom-5'>
          Don't have an account? <NavLink className='text-blue-600 font-semibold' to="/signup">Sign up</NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
