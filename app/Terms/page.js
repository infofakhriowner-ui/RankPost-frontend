"use client";

export default function Terms() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8 bg-white rounded-3xl shadow p-8">

        <h1 className="text-3xl font-bold text-gray-800">Terms & Conditions</h1>
        <p className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <p className="text-gray-700">
          These Terms & Conditions govern the use of RankPost.net ("Service", "we", "us", "our").
          By accessing or using RankPost, you agree to these Terms. If you do not agree,
          please discontinue use of the platform.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Use of Service</h2>
          <p className="text-gray-700">
            You may use RankPost only for lawful purposes and in compliance with these Terms.
            You are responsible for maintaining the security of your account and login information.
            Any activity performed under your account is your responsibility.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Accounts & Access</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>You must provide accurate information during registration.</li>
            <li>You must not share or sell your account access.</li>
            <li>We reserve the right to suspend or terminate accounts involved in misuse or abuse.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Subscriptions & Payments</h2>
          <p className="text-gray-700">
            RankPost may offer free and paid subscription plans. Prices may change at any time,
            and continued use after a price update means you accept the new pricing.
            All subscription charges are non-refundable unless required by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Content & Publishing</h2>
          <p className="text-gray-700">
            When connecting external websites (e.g., WordPress), you allow RankPost to publish
            content on your behalf. You are fully responsible for the posts you generate and publish.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Prohibited Use</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Illegal or harmful activities</li>
            <li>Spamming or automated abuse</li>
            <li>Publishing harmful, violent or adult content using RankPost</li>
            <li>Reverse-engineering or tampering with platform functionality</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Service Availability</h2>
          <p className="text-gray-700">
            We strive to provide uninterrupted access, but we do not guarantee 100% uptime.
            We are not responsible for downtime caused by hosting providers, third-party
            platforms or maintenance operations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Limitation of Liability</h2>
          <p className="text-gray-700">
            RankPost is not liable for any loss of data, revenue, profits, or business caused by
            usage of the platform. You use the service at your own risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Termination</h2>
          <p className="text-gray-700">
            We may suspend or terminate your account immediately if you violate these Terms.
            You may stop using RankPost at any time by closing your account.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Changes to Terms</h2>
          <p className="text-gray-700">
            We may update these Terms periodically. Continued use of the platform means you
            accept the updated Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-gray-700">If you have any questions regarding these Terms, contact:</p>
          <p className="font-semibold text-gray-900">support@rankpost.net</p>
        </section>

        <div className="text-center text-xs text-gray-400 pt-6">
          © {new Date().getFullYear()} RankPost.net — All Rights Reserved
        </div>

      </div>
    </div>
  );
}
