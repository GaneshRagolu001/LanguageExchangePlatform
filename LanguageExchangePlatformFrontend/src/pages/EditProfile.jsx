import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../services/authService";

export default function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    native_language: "",
    learning_language: "",
    location: "",
    interests: "",
    bio: "",
    profile_picture: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = 10;

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
          const userData = response.data.data;
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            native_language: userData.native_language || "",
            learning_language: userData.learning_language || "",
            location: userData.location || "",
            interests: userData.interests || "",
            bio: userData.bio || "",
            profile_picture: null,
          });

          if (userData.profile_picture) {
            setImagePreview(userData.profile_picture);
          }
        } else {
          setError("Failed to load profile data");
        }
      } catch (err) {
        setError("Error connecting to the server: " + err);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profile_picture: file,
      });

      // Create preview for image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const userId = 10;

      // Create FormData for file upload
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "profile_picture" && formData[key]) {
          data.append(key, formData[key]);
        } else if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });
      data.append("id", userId);

      const response = await axios.post(
        `${BASE_URL}/user/updateProfile.php?${userId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setSuccess("Profile updated successfully");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setError("Failed to update profile: " + response.data.message);
      }
    } catch (err) {
      setError("Error updating profile: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.name) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading profile data...</p>
        </div>
      </div>
    );
  }

  const languageOptions = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Chinese",
    "Japanese",
    "Korean",
    "Russian",
    "Arabic",
    "Portuguese",
    "Hindi",
    "Turkish",
    "Dutch",
    "Swedish",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
            <Link
              to="/profile"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Back to Profile
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
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

        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Profile Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Update your personal details and language preferences
            </p>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-6">
                {/* Profile Picture Section */}
                <div className="sm:col-span-6 flex flex-col items-center">
                  <div className="h-40 w-40 rounded-full overflow-hidden bg-gray-100 mb-4">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
                        {formData.name
                          ? formData.name.charAt(0).toUpperCase()
                          : "U"}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <label
                      htmlFor="profile_picture"
                      className="block text-sm font-medium text-gray-700 cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-center hover:bg-gray-50 focus:outline-none"
                    >
                      Change Photo
                    </label>
                    <input
                      type="file"
                      id="profile_picture"
                      name="profile_picture"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                      disabled
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="native_language"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Native Language
                  </label>
                  <div className="mt-1">
                    <select
                      id="native_language"
                      name="native_language"
                      value={formData.native_language}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select a language</option>
                      {languageOptions.map((language) => (
                        <option key={`native-${language}`} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="learning_language"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Learning Language
                  </label>
                  <div className="mt-1">
                    <select
                      id="learning_language"
                      name="learning_language"
                      value={formData.learning_language}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">Select a language</option>
                      {languageOptions.map((language) => (
                        <option key={`learning-${language}`} value={language}>
                          {language}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="interests"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Interests
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="interests"
                      id="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      placeholder="Reading, Movies, Cooking, etc. (comma separated)"
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Separate interests with commas
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell others about yourself..."
                      className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Brief description about yourself, your language learning
                    goals, etc.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Link
                  to="/profile"
                  className="mr-3 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-blue-300"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">
                © 2025 LinguaLink. All rights reserved.
              </span>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-6">
                <Link
                  to="/help"
                  className="text-gray-500 hover:text-gray-900 text-sm"
                >
                  Help Center
                </Link>
                <Link
                  to="/privacy"
                  className="text-gray-500 hover:text-gray-900 text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms"
                  className="text-gray-500 hover:text-gray-900 text-sm"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
