import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for redirecting

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize the useNavigate hook for redirecting

  const handleSignup = async (e) => {
    e.preventDefault();
    const auth = getAuth(); // Initialize auth

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // Register user
      console.log('User signed up:', userCredential.user);
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('User is already registered with this email. Please login.');
      } else {
        setError(error.message); // Display other errors
      }
      console.error('Signup error:', error.message);
    }
  };

  return (
    <div className='min-h-[75vh] flex items-center justify-center'>
        <div className='  w-80 h-96 border border-[#c5680c] p-5  rounded-2xl shadow-2xl relative'>
            <h2 className='font-semibold text-3xl text-center mt-8 mb-5 text-[#c5680c]'>Signup</h2>
            <form className='flex flex-col h-40 w-full' onSubmit={handleSignup}>
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
                {error && <p className='text-red-600 text-sm mt-2'>{error}</p>} {/* Show error if any */}
                <button className='bg-[#c5680c] hover:bg-[#d97919] w-20 py-2 mx-auto rounded mt-5 text-white' type="submit">Signup</button>
            </form>
            
            <p className='text-sm text-center left-0 right-0 absolute bottom-5'>
                Already have an account? <a className='text-blue-600 font-semibold' href="/login">Login</a>
            </p>
        </div>
    </div>
  );
};

export default Signup;
