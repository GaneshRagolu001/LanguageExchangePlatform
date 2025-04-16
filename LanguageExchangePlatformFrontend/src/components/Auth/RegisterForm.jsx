import React from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { registerActions } from "../../store/auth/registerSlice";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  function HandleSubmit(e) {
    e.preventDefault();
    const details = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    dispatch(registerActions.register(details));

    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.value = "";
    }
  }

  return (
    <form onSubmit={HandleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <label htmlFor="name" className="sr-only">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            ref={nameRef}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Full Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            ref={emailRef}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            ref={passwordRef}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="sr-only">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            ref={confirmPasswordRef}
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
          I agree to the{" "}
          <a
            href="/terms"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Privacy Policy
          </a>
        </label>
      </div>

      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
          onClick={() => {
            setTimeout(() => {
              navigate("/login");
            },1000);
          }}
        >
          Create Account
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
