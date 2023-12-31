import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const PopularClasses = () => {
  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await fetch("http://localhost:5000/class");
    return res.json();
  });

  //   console.log(classes);

  const sortedData = classes.sort((a, b) => b.students - a.students);

  return (
    <>
      <SectionTitle heading='Popular Classes'></SectionTitle>
      <div className='bg-white'>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <h2 className='sr-only'>Popular Classes</h2>
          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
            {sortedData.slice(0, 6).map((classes) => (
              <a key={classes._id} className='group'>
                <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7'>
                  <img
                    src={classes.image}
                    alt='image'
                    className='h-full w-full object-cover object-center group-hover:opacity-75'
                  />
                </div>
                <h3 className='mt-4 text-sm text-gray-700'>{classes.name}</h3>
                <p className='mt-1 text-lg font-bold text-gray-900'>
                  ${classes.price}
                </p>
                <p className='mt-1 text-lg font-medium text-gray-900'>
                  {classes.students} Students here.
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularClasses;
