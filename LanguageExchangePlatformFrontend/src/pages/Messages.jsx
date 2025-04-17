import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../services/authService";

export default function Messages() {
  const user = useSelector((state) => state.login.user);
  const token = localStorage.getItem("token");
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch user's connections
  useEffect(() => {
    const fetchConnections = async () => {
      if (!user?.id || !token) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/user/getConnections.php?id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data?.success && Array.isArray(response.data.data)) {
          setConnections(response.data.data);
        } else {
          setConnections([]); // fallback if no connections found
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load connections");
        setLoading(false);
        console.error("Error fetching connections:", err);
      }
    };

    fetchConnections();
  }, [user?.id, token]);

  // Filter connections based on search term
  const filteredConnections = connections.filter(
    (connection) =>
      connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      connection.bio?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <Link
              to="/dashboard"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                placeholder="Search connections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 m-4">
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

          {/* Connections List */}
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-4 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="mt-2 text-gray-600">Loading connections...</p>
              </div>
            ) : filteredConnections.length === 0 ? (
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
                  {searchTerm
                    ? "No matching connections"
                    : "No connections yet"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm
                    ? "Try adjusting your search terms."
                    : "Connect with language partners to start messaging."}
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Link
                      to="/findpartners"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      Find Language Partners
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              filteredConnections.map((connection) => (
                <Link
                  key={connection.id}
                  to={`/chat/${connection.id}`}
                  className="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="relative">
                    <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 text-xl font-bold">
                      {connection?.name
                        ? connection.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                    {/* Online status */}
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white"></span>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        {connection.name}
                      </h3>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 truncate w-64">
                      {connection.bio}
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      {connection.native_language} • {connection.location}
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
