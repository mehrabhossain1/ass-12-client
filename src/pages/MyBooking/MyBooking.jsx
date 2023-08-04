import useSelectedClass from "../../hooks/useSelectedClass";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const MyBooking = () => {
  const [selectedClass, refetch] = useSelectedClass();
  const total = selectedClass.reduce((sum, item) => item.price + sum, 0);

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/selected/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <div className='w-full'>
      <h2>My Booking</h2>
      <div className='uppercase font-semibold flex justify-evenly items-center'>
        <h3 className='text-3xl'>Total Booked: {selectedClass.length}</h3>
        <h3 className='text-3xl'>Total Price: {total}</h3>
        <button className='btn btn-warning'>PAY</button>
      </div>

      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th></th>
              <th>Class</th>
              <th>Instructor</th>
              <th>Available Seats</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {selectedClass.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className='avatar'>
                    <div className='mask mask-squircle w-12 h-12'>
                      <img
                        src={item.image}
                        alt='Avatar Tailwind CSS Component'
                      />
                    </div>

                    <div></div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.instructor}</td>
                <td>{item.available_seats}</td>
                <td className='text-end'>${item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item)}
                    className='btn btn-error text-white'
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBooking;
