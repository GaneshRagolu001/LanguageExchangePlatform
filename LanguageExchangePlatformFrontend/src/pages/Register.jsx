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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us today and get started
          </p>
        </div>
        <RegisterForm />
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
