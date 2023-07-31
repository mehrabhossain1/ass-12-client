import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

const PopularInstructors = () => {
  const { data: instructors = [] } = useQuery(["instructors"], async () => {
    const res = await fetch("http://localhost:5000/instructor");
    return res.json();
  });

  console.log(instructors);

  return (
    <div>
      <SectionTitle heading='Popular Instructors'></SectionTitle>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className='mySwiper'
      >
        {instructors.map((instructor) => (
          <SwiperSlide key={instructor._id}>
            <img
              className='h-full w-full object-cover object-center group-hover:opacity-75'
              src={instructor.image}
              alt=''
            />
            <h2 className='mt-1 text-lg font-bold text-gray-900'>
              {instructor.name}
            </h2>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularInstructors;
