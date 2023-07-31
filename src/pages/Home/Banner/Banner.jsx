import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

import img1 from "../../../assets/banner/banner2.png";
import img2 from "../../../assets/banner/banner1.jpg";
import img3 from "../../../assets/banner/banner3.webp";

const Banner = () => {
  return (
    <div className='pt-32'>
      <AwesomeSlider animation='cubeAnimation'>
        <div data-src={img1} />
        <div data-src={img2} />
        <div data-src={img3} />
      </AwesomeSlider>
    </div>
  );
};

export default Banner;
