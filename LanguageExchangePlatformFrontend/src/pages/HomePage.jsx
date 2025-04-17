import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomePage() {
  const user = useSelector((state) => state.login.user);
  const isAuthenticated = localStorage.getItem("token");
  console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-12 md:py-20">
            {isAuthenticated ? (
              <div className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
                  <span className="block text-xl sm:text-2xl text-gray-600 mb-2">
                    Hi {user.name}
                  </span>
                  <div className="flex gap-4 justify-center items-center">
                    <span className="block">Welcome to</span>
                    <span className="block text-blue-600">LinguaLink</span>
                  </div>
                </h1>

                <p className="mt-4 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-gray-500">
                  Continue your language learning journey. You have new
                  connection requests waiting.
                </p>

                <div className="mt-6 sm:mt-8 flex justify-center">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base md:text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition duration-300"
                  >
                    Go to Dashboard
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Connect, Learn, Grow</span>
                  <span className="block text-blue-600">
                    Languages Made Social
                  </span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Find language partners, practice through real conversations,
                  and make friends from around the world.
                </p>
                <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Get Started
                    </Link>
                  </div>
                  <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                    <Link
                      to="/about"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to learn a language
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform provides all the tools you need to connect with
              native speakers and improve your language skills naturally.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Real-time Language Chat
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Communicate instantly with language partners. Practice
                      writing and reading with built-in translation assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Smart Partner Matching
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Find perfect language partners based on your learning
                      goals, interests, and availability. Our algorithm matches
                      you with compatible speakers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <svg
                          className="h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      Progress Tracking
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      Track your language learning journey with detailed
                      statistics, vocabulary lists, and milestone achievements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAuthenticated ? (
        <div className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Welcome back, {user.name}!
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Here's your daily language tip:
              </p>
              <blockquote className="mt-6 max-w-2xl mx-auto italic text-blue-700 bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                "Practice 15 minutes of conversation each day with a native
                speaker — it's better than studying alone for an hour!"
              </blockquote>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/findpartners"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100"
              >
                Find a Language Partner
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Join thousands of language learners
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                People from over 150 countries are already using our platform to
                improve their language skills.
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center">
            <div className="px-5 py-2">
              <Link
                to="/about"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                About
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/blog"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Blog
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/contact"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Contact
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/privacy"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Privacy
              </Link>
            </div>
            <div className="px-5 py-2">
              <Link
                to="/terms"
                className="text-base text-gray-500 hover:text-gray-900"
              >
                Terms
              </Link>
            </div>
          </nav>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2025 LinguaLink. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
