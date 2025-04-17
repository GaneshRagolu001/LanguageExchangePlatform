import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              About LinguaLink
            </h1>
            <Link
              to="/"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            LinguaLink connects language learners with native speakers around
            the world, creating meaningful connections that go beyond
            traditional language learning. We believe that authentic
            conversations are the key to true language fluency.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-6">
            Founded in 2023 by a team of language enthusiasts and educators,
            LinguaLink was born from the frustration of traditional language
            learning methods that failed to prepare learners for real-world
            conversations. We set out to create a platform that bridges cultural
            gaps and makes language exchange accessible to everyone.
          </p>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    1
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">
                  Create Your Profile
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Tell us about yourself, your native language, and what
                  language you're learning
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    2
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">
                  Find Language Partners
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Connect with native speakers of your target language who want
                  to learn your language
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    3
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center mb-2">
                  Practice Together
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Schedule sessions, chat, and improve your language skills
                  through real conversations
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              {
                name: "Sarah Chen",
                role: "Founder & CEO",
                lang: "Mandarin, English, Spanish",
              },
              {
                name: "Miguel Rodriguez",
                role: "Head of Education",
                lang: "Spanish, English, French",
              },
              {
                name: "Amina Diallo",
                role: "Community Manager",
                lang: "French, Arabic, English",
              },
              {
                name: "Hiroshi Tanaka",
                role: "Lead Developer",
                lang: "Japanese, English, Korean",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  className="h-24 w-24 rounded-full mx-auto mb-2"
                  src={`/api/placeholder/${index}/96`}
                  alt={member.name}
                />
                <h3 className="text-gray-900 font-medium">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.role}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Speaks: {member.lang}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-700 mb-6">
            LinguaLink is more than just a language learning platform—it's a
            global community of language enthusiasts helping each other achieve
            fluency through friendship and cultural exchange.
          </p>

          <div className="flex justify-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Learning Today
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2025 LinguaLink. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/about"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                About
              </Link>
              <Link
                to="/blog"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Contact
              </Link>
              <Link
                to="/privacy"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-500 hover:text-gray-900"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
