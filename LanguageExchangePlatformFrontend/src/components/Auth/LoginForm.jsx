import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/auth/loginSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  function HandleSubmit(e) {
    e.preventDefault();
    const details = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(loginActions.login(details));
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <form
      onSubmit={HandleSubmit}
      className="w-full max-w-xl mx-auto bg-white px-10 py-8 rounded-2xl shadow-md border border-gray-100 space-y-5"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-sm mt-1">
          Sign in to continue your journey
        </p>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          placeholder="name@example.com"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          placeholder="••••••••"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Login
      </button>

      <div className="relative flex items-center justify-center mt-4">
        <div className="absolute border-t w-full border-gray-300"></div>
        <div className="relative bg-white px-4 text-sm text-gray-500">
          or continue with
        </div>
      </div>

      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Sign up
        </a>
      </p>
    </form>
  );
}

export default LoginForm;
