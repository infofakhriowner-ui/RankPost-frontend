"use client"; 

export default function RefundPolicy() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8 bg-white rounded-3xl shadow p-8">

        <h1 className="text-3xl font-bold text-gray-800">Refund Policy</h1>
        <p className="text-sm text-gray-500">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <p className="text-gray-700">
          At RankPost, we want our customers to be fully satisfied with the service. 
          If you are not happy with your purchase, we offer a 14-day refund guarantee 
          from the date of the initial subscription.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Refund Eligibility</h2>
          <p className="text-gray-700">
            You may request a refund within 14 days if:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>You are not satisfied with the product performance or features</li>
            <li>You face unresolved technical issues preventing use of the service</li>
            <li>You were charged due to a billing error</li>
          </ul>

          <p className="text-gray-700">
            Refunds will not be issued for:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Change of mind or unused subscription time</li>
            <li>Requests made after 14 days of purchase</li>
            <li>Issues caused by incorrect user configuration or third-party platforms</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">Subscription Cancellation</h2>
          <p className="text-gray-700">
            You may cancel your subscription at any time. After cancellation, your plan 
            will remain active until the end of the billing period. 
              RankPost provides a minimum 14-day refund window in compliance with international digital product standards and Paddle billing requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">How to Request a Refund</h2>
          <p className="text-gray-700">
            To request a refund, please contact us at:
          </p>
          <p className="font-semibold text-gray-900">
            support@rankpost.net
          </p>
          <p className="text-gray-700">
            Include your account email, payment receipt, and the reason for your request.
            Refunds (when approved) are processed within 5-10 business days.
          </p>
        </section>

        <div className="text-center text-xs text-gray-400 pt-6">
          © {new Date().getFullYear()} RankPost.net — All Rights Reserved
        </div>

      </div>
    </div>
  );
}
