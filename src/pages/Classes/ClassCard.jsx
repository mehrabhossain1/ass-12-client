import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import useSelectedClass from "../../hooks/useSelectedClass";

const ClassCard = ({ classData }) => {
  const { _id, image, name, instructor, available_seats, price } = classData;
  const { user } = useContext(AuthContext);
  const [, refetch] = useSelectedClass();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSelectClass = (classData) => {
    console.log(classData);
    if (user) {
      const selectedClass = {
        selectedClassId: _id,
        email: user.email,
        image,
        name,
        instructor,
        available_seats,
        price,
      };
      fetch("http://localhost:5000/selected", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(selectedClass),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "This class is booked",
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
          navigate("/login", { state: { from: location } });
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
          {/* TODO: If the user is not logged in, then tell the user to log in before selecting the course. This button will be disabled 
          if:
  Available seats are 0
  Logged in as admin/instructor
  The class card background will be red if the available seats are 0. */}
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
