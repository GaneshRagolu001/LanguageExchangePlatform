import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitStatus("loading");

    // Fake API call delay
    setTimeout(() => {
      setSubmitStatus("success");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
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
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="md:grid md:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-blue-700 text-white p-8">
              <div className="max-w-prose mx-auto">
                <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                <p className="mb-8">
                  Have questions about LinguaLink? Want to share your language
                  learning journey? We'd love to hear from you. Our support team
                  is ready to assist you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-blue-200 mt-1 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-blue-200 font-medium mb-1">Email</h3>
                      <p className="text-white">support@lingualink.io</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-blue-200 mt-1 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-blue-200 font-medium mb-1">Phone</h3>
                      <p className="text-white">+91 8500446677</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg
                      className="h-6 w-6 text-blue-200 mt-1 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="text-blue-200 font-medium mb-1">
                        Location
                      </h3>
                      <p className="text-white">Lovely Proffessional University</p>
                      <p className="text-white">phagwara,Punjab,India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-blue-200 font-medium mb-3">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    {["facebook", "twitter", "instagram", "linkedin"].map(
                      (social) => (
                        <a
                          key={social}
                          href={`https://${social}.com/lingualink`}
                          className="text-white hover:text-blue-200"
                        >
                          <span className="sr-only">{social}</span>
                          <div className="h-8 w-8 border border-blue-400 rounded-full flex items-center justify-center">
                            {social[0].toUpperCase()}
                          </div>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8">
              <div className="max-w-prose mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h2>

                {submitStatus === "success" ? (
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
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
                        <p className="text-sm text-green-700">
                          Thank you for your message! We'll get back to you as
                          soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a subject</option>
                        <option value="account">Account Help</option>
                        <option value="billing">Billing Question</option>
                        <option value="feature">Feature Request</option>
                        <option value="partner">Partnership Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={submitStatus === "loading"}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
                      >
                        {submitStatus === "loading" ? (
                          <>
                            <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></span>
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            {[
              {
                question: "How do I find language partners?",
                answer:
                  "You can find language partners by navigating to the 'Find Partners' section in your dashboard. Our matching algorithm will suggest partners based on your language goals, interests, and schedule compatibility.",
              },
              {
                question: "Is LinguaLink free to use?",
                answer:
                  "LinguaLink offers both free and premium plans. With a free account, you can connect with up to 3 language partners and access basic features. Premium plans unlock unlimited connections, advanced learning tools, and additional resources.",
              },
              {
                question: "How do I schedule a language exchange session?",
                answer:
                  "Once you've connected with a language partner, you can schedule a session by going to their profile and clicking 'Schedule Session'. You can propose times that work for you, and they'll confirm or suggest alternatives.",
              },
              {
                question: "What if I need to cancel a scheduled session?",
                answer:
                  "You can cancel a scheduled session up to 2 hours before the start time without any penalty. Just go to your scheduled sessions in the dashboard and select the session you need to cancel.",
              },
              {
                question: "How can I report inappropriate behavior?",
                answer:
                  "We take user safety seriously. If you encounter inappropriate behavior, please use the 'Report' button on the user's profile or in your chat with them. Our moderation team will review the report promptly.",
              },
            ].map((faq, index) => (
              <div key={index} className="p-6">
                <dt className="text-lg font-medium text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-500">{faq.answer}</dd>
              </div>
            ))}
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
