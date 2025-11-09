import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaEye, FaLeaf } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { easeInOut, easeOut, motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../auth/AuthContext";
import { formValidation } from "../utils/formValidation";
import Container from "../container/Container";
import useAxios from "../hooks/useAxios";
const Register = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setUser, createUser, signInWithGoogle, updateUser } = use(AuthContext);
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  //register by email/password
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value || "";
    const email = e.target.email.value || "";
    const photoURL = e.target.photo.value || "";
    const password = e.target.password.value || "";
    const confirmPassword = e.target.confirmPassword.value || "";
    const err = formValidation({ name, email, photoURL, password, confirmPassword });
    console.log({ name, email, photoURL, password, err });
    if (err) {
      setError(err);
      return;
    }

    setError("");
    //create user by email/password
    createUser(email, password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        updateUser(user, name, photoURL);
        setUser({ ...user, displayName: name, photoURL: photoURL });
        axiosInstance
          .post("/users", { name, email, photoURL })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        toast.success("Registration Successfully");
        e.target.reset();
        navigate("/");
      })
      .catch((err) => {
        setError(err.code.slice(5));
        console.log(err.code.slice(5));
        toast.error(err.code.slice(5));
      });
  };

  // google login
  const handleGoogleAuth = async () => {
    setError("");
    signInWithGoogle()
      .then((res) => {
        console.log(res.user);
        axiosInstance
          .post("/users", { name: res.user.displayName, email: res.user.email, photoURL: res.user.photoURL })
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.log(err);
          });
        toast.success("Registration Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setError(err.code);
        toast.error(err.code);
      });
  };

  return (
    <div className="h-screen flex justify-center items-center  bg-linear-to-br from-purple-800 to-green-600">
      <title>Register</title>

      <Container>
        <div className="md:flex justify-center items-center">
          <motion.div
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: easeInOut }}
            viewport={{ once: true }}
            className="w-1/2 hidden md:block"
          >
            {/* <motion.div
              // initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "loop", ease: easeOut }}
            >
              <img src={logo} alt="" className="size-42 mx-auto " />
            </motion.div> */}
            <div className="text-center ">
              <h1 className="text-3xl font-semibold  my-3 text-lime-400">Join PawMart</h1>
              <p className="text-gray-50 mb-4">Create your account and start your meowwww journey</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: easeInOut }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="card  bg-green-50 w-full max-w-sm mx-auto shrink-0  shadow-2xl">
              <div className="card-body">
                <form onSubmit={handleRegister}>
                  <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="input-field"
                      placeholder="Enter your full name"
                      required
                    />
                    <label className="label">Email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="input-field"
                      placeholder="Enter your email"
                      required
                    />
                    <label className="label">Photo URL</label>
                    <input
                      type="text"
                      name="photo"
                      id="text"
                      className="input-field"
                      placeholder="Add your photo url"
                    />
                    <label className="label">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="input-field"
                        placeholder="Create a password"
                        required
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                        className="text-base text-gray-700  absolute top-3 right-6 hover:cursor-pointer z-10"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    <label className="label">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        id="confirmPassword"
                        className="input-field"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        type="button"
                        className="text-base text-gray-700  absolute top-3 right-6 hover:cursor-pointer z-10"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    <button className="btn bg-lime-700 text-white mt-4 hover:bg-green-800">Create Account</button>
                  </fieldset>
                </form>
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex justify-center items-center gap-2 my-1">
                  <h1 className="h-px w-24 bg-gray-300"></h1>
                  <h1 className="text-sm text-gray-500">Or continue with</h1>
                  <h1 className="h-px w-24 bg-gray-300"></h1>
                </div>
                <button onClick={handleGoogleAuth} className="btn mb-1">
                  <FcGoogle className="text-xl"></FcGoogle>
                  Sign Up with Google
                </button>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link to="/login" className="text-green-500 underline">
                    Login in Here
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
