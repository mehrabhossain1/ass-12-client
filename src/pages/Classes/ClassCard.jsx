import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ClassCard = ({ classData }) => {
  const { image, name, instructor, available_seats, price } = classData;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSelectClass = (classData) => {
    console.log(classData);
    if (user) {
      fetch("http://localhost:5000/selected")
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      Swal.fire({
        title: "Login to select the class",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };
  return (
    <div className='card w-96 bg-base-100 shadow-xl image-full'>
      <figure>
        <img src={image} alt='' />
      </figure>
      <div className='card-body'>
        <h2 className='card-title text-2xl font-bold'>{name}</h2>
        <h2 className='card-title'>
          Instructor: <span className='font-semibold'>{instructor}</span>
        </h2>
        <p>
          Only{" "}
          <span className='text-lg font-bold text-yellow-400'>
            {available_seats}
          </span>{" "}
          seats are available.
        </p>
        <h2 className='card-title text-2xl font-bold'>${price}</h2>
        <div className='card-actions justify-end'>
          <button
            onClick={() => handleSelectClass(classData)}
            className='btn btn-warning'
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
