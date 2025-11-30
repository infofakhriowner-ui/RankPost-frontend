"use client";

import { useState } from "react";
import {
  CreditCard,
  FileText,
  Globe,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  Check,
  ShieldCheck,
  Crown,
  Rocket,
} from "lucide-react";

export default function BillingPage() {
  const [autoRenew, setAutoRenew] = useState(true);

  // Dummy data (baad me backend se connect kar lena)
  const currentPlan = {
    name: "Starter",
    price: 1500,
    renewalDate: "12 Dec 2025",
    billingPeriod: "Monthly",
    articlesUsed: 12,
    articlesLimit: 30,
    sitesUsed: 1,
    sitesLimit: 3,
    nextInvoiceDate: "12 Dec 2025",
    nextInvoiceAmount: "Rs. 1500",
  };

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 1500,
      sites: 3,
      articles: 30,
      tag: "Current Plan",
    },
    {
      id: "pro",
      name: "Pro",
      price: 4500,
      sites: 10,
      articles: 100,
      tag: "Most Popular",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 15000,
      sites: "Unlimited",
      articles: 500,
      tag: "Teams",
    },
  ];

  const invoices = [
    { id: 1, date: "12 Nov 2025", plan: "Starter", amount: "Rs. 1500", status: "Paid" },
    { id: 2, date: "12 Oct 2025", plan: "Starter", amount: "Rs. 1500", status: "Paid" },
    { id: 3, date: "12 Sep 2025", plan: "Starter", amount: "Rs. 1500", status: "Paid" },
  ];

  const articlesPct = (currentPlan.articlesUsed / currentPlan.articlesLimit) * 100;
  const sitesPct = (currentPlan.sitesUsed / currentPlan.sitesLimit) * 100;

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* ================= HEADER ================= */}
        <header className="bg-[#4285F4] text-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <CreditCard className="w-7 h-7" />
              Billing &amp; Subscription
            </h1>
            <p className="text-sm opacity-90 mt-2 max-w-xl">
              Manage your subscription, usage, invoices and payment methods in one place.
            </p>
          </div>
          <button className="self-start md:self-auto px-4 py-2 text-sm font-semibold rounded-xl bg-white text-[#4285F4] shadow hover:bg-gray-100 transition">
            View Pricing FAQ
          </button>
        </header>

        {/* ================= TOP OVERVIEW ROW ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Option B Current Plan card */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#4285F4] uppercase tracking-wide">
                  Current Plan
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">{currentPlan.name}</h2>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] font-semibold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Renews on <span className="font-medium">{currentPlan.renewalDate}</span> •{" "}
                  {currentPlan.billingPeriod}
                </p>

                <ul className="mt-3 space-y-1 text-xs text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                    Articles:{" "}
                    <span className="font-semibold">
                      {currentPlan.articlesUsed}/{currentPlan.articlesLimit} this month
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                    Sites:{" "}
                    <span className="font-semibold">
                      {currentPlan.sitesUsed}/{currentPlan.sitesLimit} connected
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                    Auto-renew:{" "}
                    <span className="font-semibold">
                      {autoRenew ? "On" : "Off"}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-500">Price</p>
                <p className="text-3xl font-extrabold text-[#4285F4] leading-none">
                  Rs. {currentPlan.price}
                </p>
                <p className="text-[11px] text-gray-500 mt-0.5">per month</p>

                <div className="mt-4 flex flex-col gap-2">
                  <button className="px-4 py-2 text-xs rounded-xl bg-[#4285F4] text-white font-semibold hover:bg-[#3568d8] transition">
                    Upgrade plan
                  </button>
                  <button className="px-4 py-2 text-xs rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition">
                    Manage billing
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick stat cards - same color family as dashboard */}
          <div className="bg-[#34A853] text-white rounded-2xl shadow p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs opacity-80">Articles used</p>
              <p className="text-2xl font-bold">
                {currentPlan.articlesUsed}/{currentPlan.articlesLimit}
              </p>
            </div>
            <p className="text-[11px] opacity-80 mt-2">
              Content generation for this billing cycle.
            </p>
          </div>

          <div className="bg-[#EA4335] text-white rounded-2xl shadow p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs opacity-80">Sites connected</p>
              <p className="text-2xl font-bold">
                {currentPlan.sitesUsed}/{currentPlan.sitesLimit}
              </p>
            </div>
            <p className="text-[11px] opacity-80 mt-2">
              Active WordPress sites in your account.
            </p>
          </div>
        </section>

        {/* ================= AUTO-RENEW + NEXT INVOICE ================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Auto-renewal */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Auto-renewal</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Your subscription will automatically renew every month.
                </p>
              </div>
              <button
                onClick={() => setAutoRenew((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  autoRenew ? "bg-[#34A853]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    autoRenew ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-500 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#4285F4]" />
              Payments are securely processed using industry-standard encryption.
            </p>
          </div>

          {/* Next invoice */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-800">Next invoice</h3>
            <p className="text-xs text-gray-500 mt-1">
              This is a preview of your upcoming charge.
            </p>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {currentPlan.nextInvoiceAmount}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Billing date</p>
                <p className="text-sm font-semibold text-gray-800">
                  {currentPlan.nextInvoiceDate}
                </p>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-gray-500">
              Taxes and regional pricing may apply at checkout based on your location.
            </p>
          </div>
        </section>

        {/* ================= USAGE & ANALYTICS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Usage bars */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Usage this billing cycle
            </h2>

            {/* Articles usage */}
            <div className="mb-5">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Articles</span>
                <span className="text-gray-600">
                  {currentPlan.articlesUsed}/{currentPlan.articlesLimit} used
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="h-2.5 rounded-full"
                  style={{ width: `${articlesPct}%`, backgroundColor: "#34A853" }}
                />
              </div>
            </div>

            {/* Sites usage */}
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">Connected sites</span>
                <span className="text-gray-600">
                  {currentPlan.sitesUsed}/{currentPlan.sitesLimit} used
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="h-2.5 rounded-full"
                  style={{ width: `${sitesPct}%`, backgroundColor: "#EA4335" }}
                />
              </div>
            </div>

            <div className="mt-3 flex items-start gap-2 text-xs text-gray-700 bg-[#FFF8E1] border border-[#FBC02D] rounded-2xl p-3">
              <AlertTriangle className="w-4 h-4 text-[#F9A825] mt-0.5" />
              <p>
                When you reach your monthly article limit, new article generation will
                pause until the next billing cycle or until you upgrade your plan.
              </p>
            </div>
          </div>

          {/* Included features */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              What&apos;s included in Starter
            </h3>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#34A853]" /> Up to 3 WordPress sites
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#34A853]" /> 30 AI-generated articles / month
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#34A853]" /> Auto-publish to WordPress
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#34A853]" /> SEO-optimized content styles
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#34A853]" /> Email support
              </li>
            </ul>
          </div>
        </section>

        {/* ================= PLAN COMPARISON TABLE ================= */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Plan comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="text-left py-3">Feature</th>
                  <th className="text-left py-3">Starter</th>
                  <th className="text-left py-3">Pro</th>
                  <th className="text-left py-3">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 text-gray-700">Sites</td>
                  <td>3</td>
                  <td>10</td>
                  <td>Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-700">Articles / month</td>
                  <td>30</td>
                  <td>100</td>
                  <td>500</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 text-gray-700">Priority support</td>
                  <td>–</td>
                  <td>
                    <Check className="w-4 h-4 text-[#34A853]" />
                  </td>
                  <td>
                    <Check className="w-4 h-4 text-[#34A853]" />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 text-gray-700">Team access</td>
                  <td>–</td>
                  <td>–</td>
                  <td>
                    <Check className="w-4 h-4 text-[#34A853]" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= UPGRADE CARDS ================= */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Upgrade your plan
              </h2>
              <p className="text-sm text-gray-600">
                Choose a higher plan to unlock more sites, more content, and advanced features.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isCurrent = plan.name === currentPlan.name;
              const IconComponent =
                plan.id === "starter" ? ShieldCheck : plan.id === "pro" ? Crown : Rocket;

              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl border p-6 text-center shadow-sm hover:shadow-xl transition ${
                    plan.id === "pro" ? "border-[#4285F4]" : "border-gray-200"
                  }`}
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-xl bg-[#4285F4] flex items-center justify-center shadow-md">
                      <IconComponent className="text-white" size={22} />
                    </div>
                  </div>

                  {plan.tag && (
                    <p
                      className={`text-xs mb-3 inline-flex px-3 py-1 rounded-full ${
                        plan.tag === "Current Plan"
                          ? "bg-gray-100 text-gray-600"
                          : plan.tag === "Most Popular"
                          ? "bg-[#E8F0FE] text-[#1A73E8]"
                          : "bg-[#E6F4EA] text-[#137333]"
                      }`}
                    >
                      {plan.tag}
                    </p>
                  )}

                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-3xl font-extrabold text-[#4285F4] mt-1">
                    Rs. {plan.price}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">per month</p>

                  <ul className="space-y-1 text-sm text-gray-700 mb-5">
                    <li className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-[#34A853]" /> {plan.sites} Sites
                    </li>
                    <li className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-[#34A853]" /> {plan.articles} Articles / month
                    </li>
                  </ul>

                  <button
                    className={`w-full px-5 py-2 rounded-xl text-sm font-medium ${
                      isCurrent
                        ? "bg-gray-100 text-gray-500 cursor-default"
                        : "bg-[#4285F4] text-white hover:bg-[#2f6fe0]"
                    }`}
                  >
                    {isCurrent ? "Current Plan" : "Upgrade"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= PAYMENT METHOD ================= */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-[#4285F4]" />
            Payment method
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1 text-sm text-gray-700">
              <p className="font-medium">Primary card</p>
              <p className="text-gray-600">
                Visa ending in <span className="font-semibold">2391</span>
              </p>
              <p className="text-xs text-gray-500">Expires 04/27</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 text-sm rounded-xl border border-gray-300 bg-white hover:bg-gray-50">
                Update card
              </button>
              <button className="px-4 py-2 text-sm rounded-xl border border-gray-300 bg-white hover:bg-gray-50">
                Add payment method
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            All charges will appear as{" "}
            <span className="font-medium">RANKPOST</span> on your bank statement.
            Taxes may apply based on your location.
          </p>
        </section>

        {/* ================= BILLING HISTORY ================= */}
        <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#4285F4]" />
            Billing history
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="text-left py-3">Date</th>
                  <th className="text-left">Plan</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b last:border-0">
                    <td className="py-3">{inv.date}</td>
                    <td>{inv.plan}</td>
                    <td>{inv.amount}</td>
                    <td>
                      <span className="text-green-600 font-semibold">{inv.status}</span>
                    </td>
                    <td>
                      <button className="text-[#4285F4] text-xs font-medium hover:underline">
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================= CANCEL / PAUSE SECTION ================= */}
        <section className="bg-[#FFEBEE] border border-[#FFCDD2] rounded-3xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[#B71C1C] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Cancel or pause subscription
            </h3>
            <p className="text-xs text-[#5D4037] mt-1 max-w-md">
              If you cancel, automatic posting and AI article creation will be disabled
              at the end of this billing period. Your data and connected sites will
              remain safe in your account.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-xs rounded-xl border border-[#FFAB91] text-[#E64A19] bg-white hover:bg-[#FFCCBC]">
              Pause subscription
            </button>
            <button className="px-4 py-2 text-xs rounded-xl bg-[#E53935] text-white hover:bg-[#C62828]">
              Cancel plan
            </button>
          </div>
        </section>

        {/* ================= HELP / FAQ ================= */}
        <section className="p-6 rounded-3xl bg-[#34A853] text-white shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-5 h-5 text-white mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold">
                Need help with billing or charges?
              </h3>
              <p className="text-xs opacity-90 mt-1 max-w-md">
                View billing FAQs or contact support if you think there&apos;s an
                issue with a payment or your subscription.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="/help/billing"
              className="px-4 py-2 text-xs rounded-xl bg-white text-[#1B5E20] border border-[#C8E6C9] hover:bg-[#F1F8E9]"
            >
              Open billing FAQ
            </a>
            <a
              href="/support"
              className="px-4 py-2 text-xs rounded-xl bg-[#1B5E20] text-white hover:bg-[#104812]"
            >
              Contact support
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}