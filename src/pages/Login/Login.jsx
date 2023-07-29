/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='p-28'>
      <div className='flex items-center justify-center min-h-screen py-6'>
        <div className='bg-white w-full max-w-md px-6 py-8 rounded-lg shadow-lg'>
          <div className='mb-8'>
            <h2 className='text-center text-3xl font-semibold text-gray-800'>
              Login
            </h2>
          </div>
          <form>
            <div className='mb-4'>
              <label
                htmlFor='username'
                className='block mb-2 text-sm font-medium text-gray-600'
              >
                Email
              </label>
              <input
                type='text'
                id='username'
                name='username'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                placeholder='Enter your username or email'
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-600'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  name='password'
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                  placeholder='Enter your password'
                />
                <span
                  className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer'
                  onClick={handlePasswordToggle}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg focus:outline-none hover:bg-blue-700'
              >
                Login
              </button>
              <a href='#' className='text-sm text-blue-600 hover:underline'>
                Forgot Password?
              </a>
            </div>
          </form>
          <div className='divider'></div>
          <div className='flex items-center justify-center '>
            <div className='text-3xl text-center py-4'>
              <FcGoogle />
            </div>
          </div>
          <p className='py-4'>
            Don't have an account? Please{" "}
            <span className='text-blue-600'>
              <Link to='/signup'>Signup</Link>
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
