import { Link } from "react-router-dom";

export default function Privacy() {
  // Last updated date
  const lastUpdated = "April 10, 2025";
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="mb-8">
            <div className="flex justify-between items-baseline">
              <p className="text-sm text-gray-500">
                Last Updated: {lastUpdated}
              </p>
              <button
                className="text-sm text-blue-600 hover:text-blue-500"
                onClick={() => window.print()}
              >
                Print Policy
              </button>
            </div>
            <div className="mt-2 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700">
                This Privacy Policy describes how LinguaLink ("we", "us", or
                "our") collects, uses, and discloses your personal information
                when you use our platform. Please read this policy carefully to
                understand our practices regarding your personal data.
              </p>
            </div>
          </div>
          {/* Table of Contents */}
          <div className="mb-8 p-4 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Contents</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <a
                  href="#information-we-collect"
                  className="text-blue-600 hover:underline"
                >
                  Information We Collect
                </a>
              </li>
              <li>
                <a
                  href="#how-we-use-information"
                  className="text-blue-600 hover:underline"
                >
                  How We Use Your Information
                </a>
              </li>
              <li>
                <a
                  href="#information-sharing"
                  className="text-blue-600 hover:underline"
                >
                  Information Sharing and Disclosure
                </a>
              </li>
              <li>
                <a
                  href="#data-retention"
                  className="text-blue-600 hover:underline"
                >
                  Data Retention
                </a>
              </li>
              <li>
                <a href="#security" className="text-blue-600 hover:underline">
                  Security
                </a>
              </li>
              <li>
                <a
                  href="#childrens-privacy"
                  className="text-blue-600 hover:underline"
                >
                  Children's Privacy
                </a>
              </li>
              <li>
                <a
                  href="#your-rights"
                  className="text-blue-600 hover:underline"
                >
                  Your Rights
                </a>
              </li>
              <li>
                <a
                  href="#international-transfers"
                  className="text-blue-600 hover:underline"
                >
                  International Data Transfers
                </a>
              </li>
              <li>
                <a href="#changes" className="text-blue-600 hover:underline">
                  Changes to This Privacy Policy
                </a>
              </li>
              <li>
                <a href="#contact" className="text-blue-600 hover:underline">
                  Contact Us
                </a>
              </li>
            </ol>
          </div>

          {/* Policy Sections */}
          <section id="information-we-collect" className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Personal Information
                </h3>
                <p className="text-gray-700">
                  We collect personal information that you provide directly to
                  us when you:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>Create an account or profile</li>
                  <li>Complete forms on our platform</li>
                  <li>Participate in language exchanges or lessons</li>
                  <li>Contact our customer support</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Make payments through our platform</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Usage Information
                </h3>
                <p className="text-gray-700">
                  We automatically collect certain information about your device
                  and how you interact with our platform, including:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                  <li>IP address and device identifiers</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and features used</li>
                  <li>Time spent on the platform</li>
                  <li>Language preferences</li>
                  <li>Referring websites</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="how-we-use-information" className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-3">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Providing, maintaining, and improving our services</li>
              <li>Processing transactions and managing your account</li>
              <li>Matching you with appropriate language partners</li>
              <li>Personalizing your experience on our platform</li>
              <li>
                Sending you technical notices, updates, and support messages
              </li>
              <li>
                Communicating with you about new features, offers, and
                promotions
              </li>
              <li>Monitoring and analyzing trends, usage, and activities</li>
              <li>
                Detecting, preventing, and addressing fraud and security issues
              </li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section id="information-sharing" className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              3. Information Sharing and Disclosure
            </h2>
            <p className="text-gray-700 mb-3">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>
                <strong>With Other Users:</strong> Your profile information,
                language preferences, and learning goals may be visible to other
                users to facilitate language exchange connections.
              </li>
              <li>
                <strong>With Service Providers:</strong> We share information
                with third-party vendors who provide services on our behalf,
                such as payment processing, data analysis, email delivery, and
                hosting.
              </li>
              <li>
                <strong>For Legal Reasons:</strong> We may disclose information
                if required by law, legal process, or government request, or to
                protect our rights, property, or safety.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share information
                with third parties when you provide consent to do so.
              </li>
              <li>
                <strong>Business Transfers:</strong> If we're involved in a
                merger, acquisition, or sale of assets, your information may be
                transferred as part of that transaction.
              </li>
            </ul>
          </section>

          <section id="data-retention" className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              4. Data Retention
            </h2>
            <p className="text-gray-700 mb-3">
              We retain your personal information for as long as necessary to
              provide our services and fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required or
              permitted by law. When determining the appropriate retention
              period, we consider:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>The amount, nature, and sensitivity of the information</li>
              <li>
                The potential risk of harm from unauthorized use or disclosure
              </li>
              <li>The purposes for which we process the information</li>
              <li>Whether we can achieve those purposes through other means</li>
              <li>
                Applicable legal, regulatory, tax, accounting, or other
                requirements
              </li>
            </ul>
            <p className="text-gray-700 mt-3">
              You may request deletion of your personal information at any time
              by contacting us. Note that we may retain certain information as
              required by law or for legitimate business purposes.
            </p>
          </section>

          <section id="security" className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              5. Security
            </h2>
            <p className="text-gray-700 mb-3">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Security monitoring and incident response procedures</li>
              <li>Employee training on data security practices</li>
            </ul>
            <p className="text-gray-700 mt-3">
              While we strive to protect your information, no method of
              transmission over the Internet or electronic storage is 100%
              secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section id="childrens-privacy" className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              6. Children's Privacy
            </h2>
            <p className="text-gray-700 mb-3">
              Our services are not intended for individuals under the age of 16.
              We do not knowingly collect personal information from children
              under 16. If we become aware that we have collected personal
              information from a child under 16 without parental consent, we
              will take steps to remove that information from our servers.
            </p>
            <p className="text-gray-700">
              If you believe we might have collected information from a child
              under 16, please contact us immediately.
            </p>
          </section>

          <section id="your-rights" className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              7. Your Rights
            </h2>
            <p className="text-gray-700 mb-3">
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>
                The right to access the personal information we hold about you
              </li>
              <li>The right to correct inaccurate or incomplete information</li>
              <li>The right to delete your personal information</li>
              <li>
                The right to restrict or object to our processing of your
                information
              </li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
              <li>
                The right to lodge a complaint with a supervisory authority
              </li>
            </ul>
            <p className="text-gray-700 mt-3">
              To exercise these rights, please contact us using the information
              provided in the "Contact Us" section below. We will respond to
              your request within the timeframe required by applicable law.
            </p>
          </section>

          <section id="international-transfers" className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              8. International Data Transfers
            </h2>
            <p className="text-gray-700 mb-3">
              We operate globally and may transfer your personal information to
              countries other than your country of residence. These countries
              may have different data protection laws than your country. When
              transferring data internationally, we implement appropriate
              safeguards in accordance with applicable law to ensure your
              information is protected.
            </p>
            <p className="text-gray-700">
              By using our services, you consent to the transfer of your
              information to countries that may not provide the same level of
              data protection as your country of residence.
            </p>
          </section>

          <section id="changes" className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 mb-3">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Posting the updated policy on our website</li>
              <li>
                Sending an email to the address associated with your account
              </li>
              <li>Displaying a notice on our platform</li>
            </ul>
            <p className="text-gray-700 mt-3">
              The date at the top of this Privacy Policy indicates when it was
              last updated. We encourage you to review the Privacy Policy
              whenever you access our services.
            </p>
          </section>

          <section id="contact" className="mb-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p className="text-gray-700 mb-3">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 font-medium">LinguaLink</p>
              <p className="text-gray-700">Email: privacy@lingualink.com</p>
              <p className="text-gray-700">
                Address: 123 Language Lane, San Francisco, CA 94105, USA
              </p>
              <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
            </div>
            <p className="text-gray-700 mt-3">
              We will respond to your inquiry as soon as possible and within the
              timeframe required by applicable law.
            </p>
          </section>
        </div>

        <div className="text-center py-6">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Return to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
