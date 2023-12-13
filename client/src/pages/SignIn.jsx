import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import OAuth from '../components/OAuth';

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const {loading, error} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        try {
            dispatch(signInStart())
            const res = await axios.post('/api/auth/signin', formData);
            dispatch(signInSuccess(res.data));
            navigate('/')

        } catch (error) {
            dispatch(signInFailure(error))
        }
    }
    // console.log(error)
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input 
                    type='email' 
                    placeholder='Email' 
                    id='email' 
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handleChange}
                />
                <input 
                    type='password' 
                    placeholder='Password' 
                    id='password' 
                    className='bg-slate-100 p-3 rounded-lg'
                    onChange={handleChange}
                />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-70 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Don't Have an account?</p>
                <Link to='/sign-up'>
                    <span className='text-blue-500'>Sign Up</span>
                </Link>
            </div>
            <p className='text-red-700 mt-5'>{error ? error.message || 'Something Went Wrong!' : ''}</p>
        </div>
    )
}
