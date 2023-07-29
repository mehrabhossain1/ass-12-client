import Container from "../../Shared/Container/Container";
import Banner from "../Banner/Banner";
import Classes from "../Classes/Classes";
import PopularInstructors from "../PopularInstructors/PopularInstructors";

const Home = () => {
  return (
    <div>
      <Container>
        <Banner></Banner>
        <Classes></Classes> 
        <PopularInstructors></PopularInstructors>
      </Container>
    </div>
  );
};

export default Home;
