import React from "react";
import { useEffect } from "react";
import { loginUser } from "../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/auth/loginSlice";
import LoginForm from "../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">Welcome back</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
