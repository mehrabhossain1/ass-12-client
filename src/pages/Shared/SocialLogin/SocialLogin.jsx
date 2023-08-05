import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle().then((result) => {
      const loggedInUser = result.user;
      console.log(loggedInUser);

      const savedUser = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(savedUser),
      })
        .then((res) => res.json())
        .then(() => {
          navigate(from, { replace: true });
        });
    });
  };

  return (
    <div>
      <div className='divider'></div>
      <div
        onClick={handleGoogleSignIn}
        className='flex items-center justify-center cursor-pointer'
      >
        <FcGoogle size={48} />
      </div>
    </div>
  );
};

export default SocialLogin;
