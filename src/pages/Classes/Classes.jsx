import { useQuery } from "@tanstack/react-query";
import ClassCard from "./ClassCard";
import Container from "../Shared/Container/Container";

const Classes = () => {
  const {
    data: classes = [],
    isLoading,
    isError,
  } = useQuery(["classes"], async () => {
    const res = await fetch("http://localhost:5000/class");
    return res.json();
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  console.log(classes);

  return (
    <Container>
      <div className='grid grid-cols-3 py-32 gap-10'>
        {classes.map((classData) => (
          <ClassCard key={classData._id} classData={classData}></ClassCard>
        ))}
      </div>
    </Container>
  );
};

export default Classes;
