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
    <div>
      <form onSubmit={HandleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              id="name"
              name="name"
              type="text"
              required
              ref={nameRef}
              className="w-full px-4 py-3 rounded-md bg-gray-100 border-0 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="First name"
            />
          </div>
          <div>
            <input
              id="lastname"
              name="lastname"
              type="text"
              className="w-full px-4 py-3 rounded-md bg-gray-100 border-0 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Last name"
            />
          </div>
        </div>

        <div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            ref={emailRef}
            className="w-full px-4 py-3 rounded-md bg-gray-100 border-0 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Email"
          />
        </div>

        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            ref={passwordRef}
            className="w-full px-4 py-3 rounded-md bg-gray-100 border-0 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
            onClick={() => {
              const input = passwordRef.current;
              input.type = input.type === "password" ? "text" : "password";
            }}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>

        <div className="hidden">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            ref={confirmPasswordRef}
          />
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{" "}
            <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
              Terms & Conditions
            </a>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 font-medium"
            onClick={() => {
              setTimeout(() => {
                navigate("/login");
              }, 1000);
            }}
          >
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
