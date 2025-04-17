import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/auth/loginSlice";
import { Link } from "react-router-dom";

function LoginForm() {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

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
    <div>
      <form onSubmit={HandleSubmit} className="space-y-4">
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
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            ref={passwordRef}
            className="w-full px-4 py-3 rounded-md bg-gray-100 border-0 text-gray-900 text-sm focus:ring-2 focus:ring-indigo-500"
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
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
                d={
                  showPassword
                    ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                }
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 font-medium"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
