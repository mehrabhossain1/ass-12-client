import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import defaultImg from "../../../assets/defaultUser.jpg";

const Avatar = () => {
  const { user } = useContext(AuthContext);
  return (
    <img
      className='rounded-full'
      src={user && user.photoURL ? user.photoURL : defaultImg}
      alt='profile'
      height='50'
      width='50'
    />
  );
};

export default Avatar;
