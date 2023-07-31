import Container from "../../Shared/Container/Container";
import Banner from "../Banner/Banner";
import Newsletter from "../Newsletter/Newsletter";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
  return (
    <div>
      <Container>
        <Banner></Banner>
        <PopularClasses></PopularClasses>
        <PopularInstructors></PopularInstructors>
        <Newsletter></Newsletter>
      </Container>
    </div>
  );
};

export default Home;
