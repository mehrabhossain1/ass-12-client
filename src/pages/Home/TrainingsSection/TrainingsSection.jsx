import Tilt from "react-parallax-tilt";
import img1 from "../../../assets/TrainingSection/img1.jpg";
import { FaFutbol, FaTableList } from "react-icons/fa6";

const TrainingsSection = () => {
  return (
    <Tilt>
      <div
        className='my-32 mb-96'
        style={{
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "white",
        }}
      >
        <div className='lg:grid grid-cols-3'>
          <div className='card w-full glass'>
            <figure>
              <img src={img1} alt='car!' />
            </figure>
            <div className='card-body'>
              <p className='uppercase text-3xl'>Player of the month</p>
              <h2 className='card-title text-6xl font-bold'>Adriana White</h2>
            </div>
          </div>
          <div className='card w-full glass bg-[#7bdcb5]'>
            <div className='card-body'>
              <h2 className='card-title text-5xl text-blue-900'>
                How are our trainings done?
              </h2>
              <p className='text-white'>
                Podcasting operational change management inside of workflows to
                establish a framework. Taking seamless key performance
                indicators offline to maximise the long tail.
              </p>
              <h2 className='card-title text-white pt-4 text-2xl border-b-2'>
                SPORT CLUB APPROACH
              </h2>
              <p className='text-white'>
                Podcasting operational change management inside of workflows to
                establish a framework. Taking seamless key performance
                indicators offline to maximise the long tail. Keeping your eye
                on the ball while performing a deep dive on the start-up
                mentality to derive convergence on cross-platform integration.
              </p>
            </div>
          </div>
          <div className='card w-full glass bg-blue-900 text-white'>
            <div className='card-body'>
              <h2 className='card-title text-5xl'>Best kids team in US</h2>
              <p>
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative approaches to corporate strategy
                foster collaborative thinking to further the overall value
                proposition.
              </p>
              <div className='flex'>
                <FaTableList size={120} />
                <div className='p-4'>
                  <h2 className='card-title'>SKILLED TRAINERS</h2>
                  <p>
                    Podcasting operational change management inside of workflows
                    to establish a framework.
                  </p>
                </div>
              </div>
              <div className='flex'>
                <FaFutbol size={120} />
                <div className='p-4'>
                  <h2 className='card-title'>YOUTH ACADEMY</h2>
                  <p>
                    At the end of the day, going forward, a new normal that has
                    evolved from generation X is on the runway heading.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default TrainingsSection;
