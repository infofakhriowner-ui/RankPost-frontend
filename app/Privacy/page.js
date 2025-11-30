"use client";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8 bg-white rounded-3xl shadow p-8">

        <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
        <p className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <p className="text-gray-700">
          At RankPost.net, we value your privacy and are committed to protecting your
          personal information. This Privacy Policy explains what information we
          collect, how we use it, and the choices you have regarding your data.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Information We Collect</h2>
          <p className="text-gray-700">
            We may collect information when you register, subscribe, or use our platform,
            including:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Name and email address</li>
            <li>Account login details</li>
            <li>Usage data such as connected websites, posts published, and activity logs</li>
            <li>Technical data including browser type, IP address, and device information</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">How We Use Your Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>To create and manage your account</li>
            <li>To provide and improve our services</li>
            <li>To communicate system updates or support responses</li>
            <li>To secure and protect the platform</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Data Security</h2>
          <p className="text-gray-700">
            We implement security measures to protect your information from unauthorized
            access, alteration, or disclosure. However, no online system can guarantee
            100% security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Sharing of Information</h2>
          <p className="text-gray-700">
            We do not sell or trade your personal information. We may share limited
            information with trusted service providers as necessary to operate our
            platform (for example: hosting, analytics, and email delivery).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Cookies & Tracking</h2>
          <p className="text-gray-700">
            We use cookies to improve user experience, store preferences, and analyze
            platform performance. You can disable cookies through your browser settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Your Rights</h2>
          <p className="text-gray-700">
            You may request access, update, or deletion of your personal information by
            contacting us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-900 font-semibold">
            support@rankpost.net
          </p>
        </section>

        <div className="text-center text-xs text-gray-400 pt-6">
          © {new Date().getFullYear()} RankPost.net — All Rights Reserved
        </div>

      </div>
    </div>
  );
}
