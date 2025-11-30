"use client";

import { useState } from "react";
import { User, ShieldCheck, CreditCard, Camera } from "lucide-react";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("Anwar Fakhri");
  const [email, setEmail] = useState("you@example.com");
  const [company, setCompany] = useState("RankPost");
  const [role, setRole] = useState("Founder");
  const [timezone, setTimezone] = useState("Asia/Karachi");
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Top Header Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="text-sm text-slate-500 mb-1">
          Settings <span className="mx-1">/</span>
          <span className="font-medium text-slate-700">Profile</span>
        </div>

        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
          Profile
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal info, avatar, account and subscription.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid gap-6 lg:grid-cols-[300px,1fr] mt-10">
        {/* LEFT SIDEBAR CARDS */}
        <div className="space-y-6">
          {/* Avatar */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#4285F4]" />
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-[#4285F4]/10 flex items-center justify-center font-bold text-[#4285F4] text-xl">
                {fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Profile photo
                </p>
                <p className="text-xs text-slate-500 mb-2">
                  Appears on invoices & shared exports
                </p>

                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-full font-medium bg-[#4285F4]/10 text-[#4285F4] hover:bg-[#4285F4]/20 transition">
                    Upload
                  </button>
                  <button className="text-xs font-medium text-slate-500 hover:text-slate-700">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="relative bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#34A853]" />

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CreditCard size={18} className="text-[#34A853]" />
                <p className="text-sm font-semibold text-slate-900">
                  Subscription
                </p>
              </div>

              <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ACTIVE
              </span>
            </div>

            <p className="text-sm text-slate-600">
              RankPost Starter • Monthly billing
            </p>

            <button className="mt-3 text-xs px-3 py-1.5 rounded-full font-medium border border-slate-200 hover:bg-slate-100 transition">
              Manage billing
            </button>
          </div>
        </div>

        {/* RIGHT MAIN CONTENT */}
        <div className="space-y-6">
          {/* Person Info Section */}
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5"
          >
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#4285F4]" />

            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-[#4285F4]" />
              <h2 className="text-sm font-semibold text-slate-900">
                Personal information
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="label">Full Name</label>
                <input
                  type="text"
                  className="input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input bg-slate-100 text-slate-500 cursor-not-allowed"
                  disabled
                  value={email}
                />
              </div>

              <div>
                <label className="label">Role</label>
                <input
                  type="text"
                  className="input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Company / Brand</label>
                <input
                  type="text"
                  className="input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div>
                <label className="label">Timezone</label>
                <select
                  className="input"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="Asia/Karachi">Asia / Karachi (PK)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">New York (ET)</option>
                  <option value="Europe/London">London (UK)</option>
                </select>
              </div>
            </div>

            {/* Save Bar */}
            <div className="flex items-center justify-end gap-2 pt-3">
              <button className="cancelBtn">Cancel</button>
              <button
                type="submit"
                className="saveBtn"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>

          {/* Security Section */}
          <form className="relative bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5">
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#EA4335]" />

            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-[#EA4335]" />
              <h2 className="text-sm font-semibold text-slate-900">Security</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="label">Current password</label>
                <input type="password" className="input" placeholder="••••••••" />
              </div>

              <div>
                <label className="label">New password</label>
                <input type="password" className="input" placeholder="New password" />
              </div>

              <div>
                <label className="label">Confirm</label>
                <input type="password" className="input" placeholder="Repeat password" />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="redBtn">Update password</button>
            </div>
          </form>
        </div>
      </div>

      {/* GLOBAL UTIL CLASSES */}
      <style>{`
        .label { font-size: 11px; font-weight: 500; color: #475569; margin-bottom: 6px; display: block; }
        .input { width: 100%; padding: 10px 14px; border-radius: 12px; border: 1px solid #e2e8f0; background:#f8fafc; font-size: 14px; outline: none; transition: .2s; }
        .input:focus { border-color:#4285F4; background:white; }
        .saveBtn { background:#4285F4; color:white; padding:8px 18px; font-size:13px; border-radius:15px; font-weight:600; }
        .cancelBtn { padding:8px 18px; font-size:13px; border-radius:15px; font-weight:500; }
        .redBtn { padding:8px 18px; font-size:13px; border-radius:15px; font-weight:600; color:#EA4335; border:1px solid #EA4335; }
      `}</style>
    </div>
  );
}
