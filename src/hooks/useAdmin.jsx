import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
// import axios from "axios";

const useAdmin = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/users/admin/${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      console.log("is admin res", res);
      return res.json();
    },
  });
  return [isAdmin, isAdminLoading];
};
export default useAdmin;
