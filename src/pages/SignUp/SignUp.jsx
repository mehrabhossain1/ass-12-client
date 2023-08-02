/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { TbFidgetSpinner } from "react-icons/tb";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

// TODO: private route jodi lage taile kro, moving to homepage
const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const {
    loading,
    setLoading,
    signInWithGoogle,
    createUser,
    updateUserProfile,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((res) => {
      const loggedUser = res.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoUrl)
        .then(() => {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        })
        .catch((err) => console.log(err));
    });
  };

  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };

  const password = watch("password");

  return (
    <div className='p-96'>
      <div className='flex items-center justify-center h-screen bg-gray-100'>
        <div className='bg-white w-full max-w-md p-8 rounded-lg shadow-lg'>
          <div className='text-center'>
            <h2 className='mt-2 text-2xl font-semibold'>Sign Up</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
            <div className='mb-4'>
              <label
                htmlFor='name'
                className='block mb-2 text-sm font-medium text-gray-600'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                {...register("name", { required: "This field is required" })}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                placeholder='Enter your name'
              />
              {errors.name && (
                <span className='text-red-500 text-sm'>
                  {errors.name.message}
                </span>
              )}
            </div>
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
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email format",
                  },
                })}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                placeholder='Enter your email'
              />
              {errors.email && (
                <span className='text-red-500 text-sm'>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='password'
                className='block mb-2 text-sm font-medium text-gray-600'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password is less than 6 characters",
                  },
                  pattern: /(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])/,
                })}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                placeholder='Enter your password'
              />
              {errors.password && (
                <span className='text-red-500 text-sm'>
                  {errors.password.message}
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <p className='text-red-600'>
                  Password must have one capital letter and one special
                  characters
                </p>
              )}
            </div>
            <div className='mb-4'>
              <label
                htmlFor='confirmPassword'
                className='block mb-2 text-sm font-medium text-gray-600'
              >
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                placeholder='Confirm your password'
              />
              {errors.confirmPassword && (
                <span className='text-red-500 text-sm'>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className='mb-6'>
              <label
                htmlFor='photoUrl'
                className='block mb-2 text-sm font-medium text-gray-600'
              >
                Photo URL
              </label>
              <input
                type='text'
                id='photoUrl'
                {...register("photoUrl", {
                  required: "This field is required",
                  pattern: {
                    value: /\.(jpeg|jpg|gif|png|svg)$/i,
                    message: "Invalid photo URL format",
                  },
                })}
                className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
                placeholder='Enter your photo URL'
              />
              {errors.photoUrl && (
                <span className='text-red-500 text-sm'>
                  {errors.photoUrl.message}
                </span>
              )}
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg focus:outline-none hover:bg-blue-700'
              >
                {loading ? (
                  <TbFidgetSpinner className='m-auto animate-spin' size={24} />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <div className='divider'></div>
          <div
            onClick={handleGoogleSignIn}
            className='flex items-center justify-center'
          >
            <FcGoogle size={48} />
          </div>
          <p className='py-4'>
            Already have an account? Please{" "}
            <span className='text-sm text-blue-600 hover:underline'>
              <Link to='/login'>Login</Link>
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
