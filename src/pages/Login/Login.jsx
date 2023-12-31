/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Link, useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
import { AuthContext } from "../../Providers/AuthProvider";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        Swal.fire({
          title: "Login successful",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='block mb-2 text-sm font-medium text-gray-600'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                {...register("email", { required: true })}
                name='email'
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                placeholder='Enter your username or email'
              />
              {errors.email && (
                <span className='text-red-500 text-sm'>
                  {errors.email.message}
                </span>
              )}
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
                  {...register("password", { required: true })}
                  name='password'
                  className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                  placeholder='Enter your password'
                />
                {errors.password && (
                  <span className='text-red-500 text-sm'>
                    {errors.password.message}
                  </span>
                )}
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
                {loading ? (
                  <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                ) : (
                  "Login"
                )}
              </button>
              <a href='#' className='text-sm text-blue-600 hover:underline'>
                Forgot Password?
              </a>
            </div>
          </form>

          <p className='py-4'>
            Don't have an account? Please{" "}
            <span className='text-sm text-blue-600 hover:underline'>
              <Link to='/signup'>Signup</Link>
            </span>{" "}
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
