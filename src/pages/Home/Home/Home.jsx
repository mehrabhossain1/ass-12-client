import Container from "../../Shared/Container/Container";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
  return (
    <div>
      <Container>
        <Banner></Banner>
        <PopularClasses></PopularClasses>
        <PopularInstructors></PopularInstructors>
      </Container>
    </div>
  );
};

export default Home;
