import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/authService";
import { isTokenExpired } from "../services/TokenService";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../store/auth/loginSlice";
import { useParams } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const isEditRoute = location.pathname === "/profile/edit";
  const userdetails = useSelector((state) => state.login.user);
  const params = useParams();
  const parterId = params.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (isTokenExpired(token)) {
          dispatch(loginActions.logout());
        }

        var userId = userdetails.id;
        console.log(userdetails.id);

        if (parterId) {
          userId = parterId;
        }

        const response = await axios.get(
          `${BASE_URL}/user/getProfile.php?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.data);
        } else {
          setError("Failed to load profile data");
        }
      } catch (err) {
        setError("Error connecting to the server: " + err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch, userdetails, location.state?.updated, parterId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
          <Link
            to="/dashboard"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {!isEditRoute && (
        <>
          {/* Header */}
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-6">
                <div className="flex items-center">
                  <h1 className="text-3xl font-bold text-gray-900">
                    My Profile
                  </h1>
                  {user?.native_language && (
                    <span className="ml-4 px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
                      {user.native_language} Speaker
                    </span>
                  )}
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </header>

          {/* Profile Info */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Profile Information
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Personal details and language preferences
                  </p>
                </div>
                {!parterId && (
                  <Link
                    to="/profile/edit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Edit Profile
                  </Link>
                )}
              </div>

              <div className="border-t border-gray-200">
                <div className="flex flex-col sm:flex-row">
                  {/* Profile Picture */}
                  <div className="px-4 py-5 sm:p-6 sm:w-1/3 flex flex-col items-center">
                    <div className="h-40 w-40 rounded-full overflow-hidden bg-gray-100 mb-4">
                      <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    </div>
                    <p className="text-xl font-bold text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Member since{" "}
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  {/* Profile Details */}
                  <div className="sm:w-2/3">
                    <dl>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Native Language
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user?.native_language || "Not specified"}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Learning Language
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user?.learning_language || "Not specified"}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Location
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user?.location || "Not specified"}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Interests
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user?.interests ? (
                            <div className="flex flex-wrap gap-2">
                              {user.interests
                                .split(",")
                                .map((interest, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                                  >
                                    {interest.trim()}
                                  </span>
                                ))}
                            </div>
                          ) : (
                            "No interests specified"
                          )}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Bio
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {user?.bio || "No bio information provided"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Incomplete Alert */}
            {(!user?.bio ||
              !user?.learning_language ||
              !user?.native_language ||
              !user?.interests ||
              !user?.location) && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Your profile is incomplete. Please
                      <Link
                        to="/profile/edit"
                        className="ml-1 font-medium underline text-yellow-800 hover:text-yellow-600"
                      >
                        edit your profile
                      </Link>{" "}
                      to get better matching results.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </>
      )}

      {/* Always Render Nested Routes (Edit Profile) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
