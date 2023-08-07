import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axios from "axios";

const useInstructor = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor", user?.email],
    queryFn: async () => {
      const res = await axios(
        `http://localhost:5000/users/instructor/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      console.log("is instructor res", res);
      return res.data.instructor;
    },
  });
  return [isInstructor, isInstructorLoading];
};
export default useInstructor;
