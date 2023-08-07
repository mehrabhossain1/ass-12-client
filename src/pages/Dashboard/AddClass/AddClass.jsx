import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;

const AddClass = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`;

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        console.log(imgResponse);
      });
  };

  console.log(errors);
  console.log(img_hosting_token);

  return (
    <div>
      <SectionTitle heading='Add A Class'></SectionTitle>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='max-w-md mx-auto mt-8 p-4 border border-gray-300 shadow-md rounded-md'
      >
        <label className='block font-semibold mb-2'>Class Name:</label>
        <input
          {...register("name", { required: true })}
          className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          type='text'
          required
        />

        <label className='block font-semibold mt-4 mb-2'>Class Image:</label>
        <input
          {...register("image", { required: true })}
          className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          type='file'
          required
        />

        <label className='block font-semibold mt-4 mb-2'>
          Instructor Name:
        </label>
        <input
          value={user.displayName}
          {...register("instructor", { required: true })}
          className='w-full p-2 bg-gray-100 border rounded-md'
          type='text'
          readOnly
        />

        <label className='block font-semibold mt-4 mb-2'>
          Instructor Email:
        </label>
        <input
          value={user.email}
          className='w-full p-2 bg-gray-100 border rounded-md'
          type='email'
          readOnly
        />

        <label className='block font-semibold mt-4 mb-2'>
          Available Seats:
        </label>
        <input
          {...register("available_seats", { required: true })}
          className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          type='number'
          required
        />

        <label className='block font-semibold mt-4 mb-2'>Price:</label>
        <input
          {...register("price", { required: true })}
          className='w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300'
          type='number'
          required
        />

        <button
          className='w-full bg-blue-500 text-white py-2 mt-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
          type='submit'
        >
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
