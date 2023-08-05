import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const SocialLogin = () => {
  const { setLoading, signInWithGoogle } = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  // handle google sign in
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
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
