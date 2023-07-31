const ClassCard = ({ classData }) => {
  const { image, name, instructor, available_seats, price } = classData;
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
          <button className='btn btn-warning'>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
