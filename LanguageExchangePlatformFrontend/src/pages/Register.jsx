import React from "react";
import RegisterForm from "../components/Auth/RegisterForm";
import { useEffect } from "react";
import { registerUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { registerActions } from "../store/auth/registerSlice";
import { Link } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const userCred = useSelector((state) => state.register);

  useEffect(() => {
    const handleRegister = async () => {
      try {
        console.log(userCred);
        const response = await registerUser(userCred.userDetails);
        console.log("Registered successfully", response);
      } catch (err) {
        dispatch(registerActions.registerError());
        console.error("Registration failed", err);
      }
    };

    if (userCred.registered) {
      handleRegister();
    }
  }, [dispatch, userCred]);

  return (
    <div className="min-h-screen bg-[#2E2B3A] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden flex shadow-xl">
        {/* Left side with image and tagline */}
        <div className="hidden md:block w-5/12 bg-[url('loginpic.jpeg')]  bg-cover bg-center text-white p-12 relative ">
          <div className="absolute top-6 left-6">
            <h1 className="text-xl font-bold">LinguaLink</h1>
          </div>
          <div className="flex flex-col justify-end h-full pb-8">
            <h2 className="text-2xl font-bold mb-2">Bridging Cultures,</h2>
            <h2 className="text-2xl font-bold mb-2">Speaking Connections</h2>
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-7/12 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Create an account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 font-medium">
              Log in
            </Link>
          </p>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
