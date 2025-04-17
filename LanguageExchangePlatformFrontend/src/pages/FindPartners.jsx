import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../store/auth/loginSlice";
import { BASE_URL } from "../services/authService";
import axios from "axios";

export default function FindPartners() {
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const [partners, setPartners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectedIds, setConnectedIds] = useState(
    user?.connected_user_ids || []
  );

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${BASE_URL}/user/matchUsers.php?id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setPartners(response.data);
      } catch (err) {
        setError("Failed to fetch partners: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, [user?.id, token]);

  const sendConnectionRequest = async (partnerId) => {
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

      // Fetch updated user profile
      const profileResponse = await axios.get(
        `${BASE_URL}/user/getProfile.php?id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (profileResponse.data.success) {
        const updatedUser = profileResponse.data.data;
        dispatch(loginActions.SetUser(updatedUser));
        setConnectedIds(updatedUser.connected_user_ids || []);
      } else {
        setError("Failed to refresh profile after connection");
      }
    } catch (err) {
      setError("Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : partners.length === 0 ? (
            <div>No partners found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={`/api/placeholder/${partner.id}/80`}
                        alt={partner.name}
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {partner.name}
                        </p>
                        <div className="flex flex-wrap mt-1">
                          <span className="mr-2 mb-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Speaks: {partner.native_language}
                          </span>
                          <span className="mb-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            Learning: {partner.learning_language}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {partner.bio && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {partner.bio}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex space-x-2">
                    {connectedIds.includes(partner.id) ? (
                      <button
                        disabled
                        className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 cursor-not-allowed"
                      >
                        Connected
                      </button>
                    ) : (
                      <button
                        onClick={() => sendConnectionRequest(partner.id)}
                        className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                      >
                        Connect
                      </button>
                    )}
                    <Link
                      to={`/user/${partner.id}`}
                      className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
