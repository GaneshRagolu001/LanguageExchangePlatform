import React from "react";
import { useEffect } from "react";
import { loginUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/auth/loginSlice";
import LoginForm from "../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const userCred = useSelector((state) => state.login.loginDetails);
  const loggedIn = useSelector((state) => state.login.logedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      try {
        console.log("login.jsx");
        console.log(userCred);
        const response = await loginUser(userCred);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        console.log("Logged in successfully", response);
        dispatch(loginActions.SetUser(response.user));
        navigate("/");
      } catch (err) {
        dispatch(loginActions.loginError("login failed"));
        console.error("login failed", err);
      }
    };

    if (loggedIn) {
      handleLogin();
    }
  }, [dispatch, userCred, navigate, loggedIn]);

  return (
    <div className="min-h-screen bg-[#2E2B3A]  flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden flex shadow-xl">
        {/* Left side with image and tagline */}
        <div
          className="hidden md:block w-5/12  bg-cover bg-center text-white p-12 relative "
          style={{ backgroundImage: "url('/loginpic.jpeg')" }}
        >
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
            Sign in to your account
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-medium">
              Sign up
            </Link>
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
