import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../services/authService";

export default function Dashboard() {
  const user = useSelector((state) => state.login.user);

  const [activeTab, setActiveTab] = useState("overview");
  const token = localStorage.getItem("token");

  // State for dynamic data
  const [connections, setConnections] = useState([]);
  const [stats, setStats] = useState([
    { name: "Practice Sessions", value: "0" },
    { name: "Connections", value: "0" },
    { name: "Messages", value: "0" },
    { name: "Streak Days", value: "0" },
  ]);
  const [suggestedPartners, setSuggestedPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.id || !token) return;

      setIsLoading(true);
      try {
        // Fetch connections
        const connectionsResponse = await axios.get(
          `${BASE_URL}/user/getConnections.php?id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (
          connectionsResponse.data?.success &&
          Array.isArray(connectionsResponse.data.data)
        ) {
          const connectionsData = connectionsResponse.data.data;
          setConnections(connectionsData);
          updateStats("Connections", connectionsData.length.toString());
        } else {
          setConnections([]); // fallback
        }

        // // Fetch messages count
        // const messagesResponse = await axios.get(
        //   `${BASE_URL}/messages/getCount.php?id=${user.id}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );

        // if (messagesResponse.data && messagesResponse.data.count) {
        //   updateStats("Messages", messagesResponse.data.count);
        // }

        // Fetch streak days
        const streakResponse = await axios.get(
          `${BASE_URL}/user/getStreak.php?id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (streakResponse.data && streakResponse.data.streak_days) {
          updateStats("Streak Days", streakResponse.data.streak_days);
        }

        // Fetch suggested partners
        const partnersResponse = await axios.get(
          `${BASE_URL}/user/matchUsers.php?id=${user.id}&limit=3`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (partnersResponse.data) {
          setSuggestedPartners(partnersResponse.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.id, token]);

  // Helper function to update stats
  const updateStats = (name, value) => {
    setStats((prevStats) =>
      prevStats.map((stat) => (stat.name === name ? { ...stat, value } : stat))
    );
  };

  // Connect with suggested partner
  const connectWithPartner = async (partnerId) => {
    const userId = user?.id || "";

    try {
      const response = await axios.post(
        `${BASE_URL}/user/createConnection.php?id=${userId}&con_id=${partnerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to connect");

      // Update suggested partners list to show connected status
      setSuggestedPartners((prevPartners) =>
        prevPartners.map((partner) =>
          partner.id === partnerId ? { ...partner, connected: true } : partner
        )
      );
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              {user?.native_language && (
                <span className="ml-4 px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-full">
                  {user.native_language} Speaker
                </span>
              )}
            </div>
            <Link
              to="/profile"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              <div className="h-10 w-10 flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-bold rounded-full mr-3">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span>My Profile</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center py-6">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Loading your dashboard...</p>
          </div>
        )}

        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name || "Language Learner"}!
              </h2>
              {user?.learning_language && (
                <p className="mt-1 text-sm text-gray-500">
                  You're currently learning:{" "}
                  <span className="font-medium text-blue-600">
                    {user.learning_language}
                  </span>
                </p>
              )}
              {user?.location && (
                <p className="mt-1 text-sm text-gray-500">
                  Location: <span className="font-medium">{user.location}</span>
                </p>
              )}
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link
                to="/findpartners"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Find New Partners
              </Link>
            </div>
          </div>
        </div>

        {/* Complete Profile Alert - Show only if profile is incomplete */}
        {(!user?.bio ||
          !user?.learning_language ||
          !user?.native_language ||
          !user?.interests) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
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
                    className="font-medium underline text-yellow-700 hover:text-yellow-600"
                  >
                    {" "}
                    complete your profile{" "}
                  </Link>
                  to get better language partner matches.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  {stat.name}
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("connections")}
              className={`${
                activeTab === "connections"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Connections
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`${
                activeTab === "messages"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab("progress")}
              className={`${
                activeTab === "progress"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Progress
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
          {activeTab === "overview" && (
            <div className="p-6">
              {/* Get Started Guide - Show if new user */}
              {!user?.created_at && (
                <div className="mb-8 bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-blue-900 mb-2">
                    Get Started with LinguaLink
                  </h3>
                  <ol className="list-decimal pl-5 space-y-2 text-blue-800">
                    <li>
                      Complete your profile with your language preferences and
                      interests
                    </li>
                    <li>
                      Find language partners who match your learning goals
                    </li>
                    <li>Schedule your first conversation session</li>
                    <li>Start practicing with real native speakers!</li>
                  </ol>
                  <div className="mt-4">
                    <Link
                      to="/profile/edit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Complete Your Profile
                    </Link>
                  </div>
                </div>
              )}

              {/* Suggested Language Partners */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Suggested Partners
                  </h3>
                  <Link
                    to="/findpartners"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {suggestedPartners.length > 0 ? (
                    suggestedPartners.map((partner) => (
                      <div
                        key={partner.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              partner.profile_picture ||
                              `/api/placeholder/${partner.id}/40`
                            }
                            alt={partner.name}
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {partner.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {partner.native_language} • {partner.location}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-gray-500">
                          Interests: {partner.interests || "Not specified"}
                        </p>
                        <button
                          onClick={() => connectWithPartner(partner.id)}
                          disabled={partner.connected}
                          className={`mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${
                            partner.connected
                              ? "bg-gray-300 cursor-not-allowed text-gray-500"
                              : "text-white bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {partner.connected ? "Connected" : "Connect"}
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-6">
                      <p className="text-gray-500">
                        No suggested partners available right now.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "connections" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Your Language Partners
                </h3>
                <Link
                  to="/findpartners"
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Find New Partners
                </Link>
              </div>

              {connections.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {connections.map((connection) => (
                    <div
                      key={connection.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={
                              connection.profile_picture ||
                              `/api/placeholder/${connection.id}/40`
                            }
                            alt={connection.name}
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {connection.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {connection.native_language} •{" "}
                              {connection.location}
                            </p>
                          </div>
                        </div>
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            connection.online_status === "online"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {connection.online_status || "offline"}
                        </span>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <Link
                          to={`/chat/${connection.id}`}
                          className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700"
                        >
                          Message
                        </Link>
                        <Link
                          to={`/schedule/${connection.id}`}
                          className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Schedule
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M1521H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No connections yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You don't have any language partners connected yet.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/findpartners"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Find Language Partners
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "messages" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent Messages
                </h3>
                <Link
                  to="/messages"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View all messages
                </Link>
              </div>

              {connections.length > 0 ? (
                <div className="space-y-4">
                  {connections.slice(0, 5).map((connection) => (
                    <Link
                      key={connection.id}
                      to={`/chat/${connection.id}`}
                      className="block"
                    >
                      <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={
                            connection.profile_picture ||
                            `/api/placeholder/${connection.id}/40`
                          }
                          alt={connection.name}
                        />
                        <div className="ml-4 flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {connection.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {connection.last_message_time ||
                                "No messages yet"}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {connection.last_message || "Start a conversation"}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No messages
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Connect with language partners to start messaging.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/findpartners"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Find Language Partners
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "progress" && (
            <div className="p-6">
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Language Learning Progress
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Practice Hours this Month
                    </h4>
                    <div className="mt-2 relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                            {Math.min(
                              stats.find((s) => s.name === "Practice Sessions")
                                ?.value || 0,
                              20
                            )}{" "}
                            / 20 hours
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {Math.min(
                              (stats.find((s) => s.name === "Practice Sessions")
                                ?.value /
                                20) *
                                100 || 0,
                              100
                            ).toFixed(0)}
                            %
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{
                            width: `${Math.min(
                              (stats.find((s) => s.name === "Practice Sessions")
                                ?.value /
                                20) *
                                100 || 0,
                              100
                            )}%`,
                          }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Conversation Streak
                    </h4>
                    <div className="mt-2 flex">
                      {[...Array(7)].map((_, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${
                              index <
                              (stats.find((s) => s.name === "Streak Days")
                                ?.value || 0) %
                                7
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-500"
                            } mx-1`}
                          >
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Your current streak:{" "}
                      {stats.find((s) => s.name === "Streak Days")?.value || 0}{" "}
                      days
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Learning Goals
                    </h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="goal-1"
                          name="goal-1"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="goal-1"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Have 5 conversation sessions
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="goal-2"
                          name="goal-2"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="goal-2"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Learn 20 new vocabulary words
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="goal-3"
                          name="goal-3"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="goal-3"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Practice for at least 10 hours
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Learning Resources
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">
                      Grammar Guides
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Learn the fundamentals of grammar for your target
                      language.
                    </p>
                    <Link
                      to="/resources/grammar"
                      className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Explore guides →
                    </Link>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">
                      Vocabulary Lists
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Essential vocabulary organized by topics and difficulty
                      levels.
                    </p>
                    <Link
                      to="/resources/vocabulary"
                      className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Browse lists →
                    </Link>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">
                      Conversation Topics
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Ideas and prompts for your language exchange sessions.
                    </p>
                    <Link
                      to="/resources/topics"
                      className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      View topics →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
