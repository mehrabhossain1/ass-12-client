import useSelectedClass from "../../hooks/useSelectedClass";

const MyBooking = () => {
  const [selectedClass] = useSelectedClass();
  const total = selectedClass.reduce((sum, item) => item.price + sum, 0);

  return (
    <div>
      <h2>My Booking</h2>
      <div className='uppercase'>
        <h3 className='text-3xl'>Total Booked: {selectedClass.length}</h3>
        <h3 className='text-3xl'>Total Price: {total}</h3>
        <button className='btn btn-warning'>PAY</button>
      </div>
    </div>
  );
};

export default MyBooking;
