import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

const useSelectedClass = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access-token");

  const { refetch, data: selectedClass = [] } = useQuery({
    queryKey: ["selected", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/selected?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  return [selectedClass, refetch];
};

export default useSelectedClass;
