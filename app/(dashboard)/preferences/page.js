"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  Rocket,
  Monitor,
  Bell,
} from "lucide-react";

export default function PreferencesPage() {
  const [language, setLanguage] = useState("en");
  const [writingStyle, setWritingStyle] = useState("professional");
  const [defaultLength, setDefaultLength] = useState("medium");
  const [autoPublish, setAutoPublish] = useState(true);
  const [autoImage, setAutoImage] = useState(true);
  const [theme, setTheme] = useState("system");
  const [notifyPublished, setNotifyPublished] = useState(true);
  const [notifyErrors, setNotifyErrors] = useState(true);
  const [notifyBilling, setNotifyBilling] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => setSaving(false), 1200);
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`inline-flex h-6 w-11 items-center rounded-full border transition ${
        checked ? "bg-[#34A853] border-[#34A853]" : "bg-slate-200 border-slate-300"
      }`}
    >
      <span
        className={`h-4 w-4 rounded-full bg-white shadow-sm transform transition ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-10">
        <div className="text-sm text-slate-500 mb-1">
          Settings <span className="mx-1">/</span>
          <span className="font-medium text-slate-700">Preferences</span>
        </div>

        <h1 className="text-3xl font-semibold text-slate-900 tracking-tight">
          Preferences
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Customize how RankPost writes, publishes and notifies you.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="max-w-6xl mx-auto px-6 space-y-6 mt-10"
      >
        {/* Content Defaults */}
        <section className="relative bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#4285F4]" />
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-[#4285F4]" />
            <h2 className="text-sm font-semibold text-slate-900">Content defaults</h2>
          </div>

          <p className="text-xs text-slate-500">
            Default settings used every time you create a new article.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Language */}
            <div>
              <label className="label">Language</label>
              <select
                className="input"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="ur">Urdu + English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>

            {/* Writing style */}
            <div>
              <label className="label">Writing Style</label>
              <select
                className="input"
                value={writingStyle}
                onChange={(e) => setWritingStyle(e.target.value)}
              >
                <option value="professional">Professional</option>
                <option value="conversational">Conversational</option>
                <option value="technical">Technical SEO</option>
                <option value="storytelling">Storytelling</option>
              </select>
            </div>

            {/* Article length */}
            <div>
              <label className="label">Default length</label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs">
                {["short", "medium", "long"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setDefaultLength(size)}
                    className={`flex-1 rounded-lg px-2 py-1 capitalize border text-[11px] font-medium transition ${
                      defaultLength === size
                        ? "bg-[#4285F4] text-white border-[#4285F4]"
                        : "border-transparent text-slate-600 hover:bg-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Publishing workflow */}
        <section className="relative bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#FBBC05]" />
          <div className="flex items-center gap-2">
            <Rocket size={20} className="text-[#FBBC05]" />
            <h2 className="text-sm font-semibold text-slate-900">Publishing workflow</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Auto publish articles
                </p>
                <p className="text-xs text-slate-500">
                  Publish directly instead of draft mode.
                </p>
              </div>
              <Toggle checked={autoPublish} onChange={setAutoPublish} />
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Auto featured image
                </p>
                <p className="text-xs text-slate-500">
                  AI generated image using article topic.
                </p>
              </div>
              <Toggle checked={autoImage} onChange={setAutoImage} />
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="relative bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#34A853]" />
          <div className="flex items-center gap-2">
            <Monitor size={20} className="text-[#34A853]" />
            <h2 className="text-sm font-semibold text-slate-900">Appearance</h2>
          </div>

          <div className="flex gap-2">
            {["light", "dark", "system"].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTheme(mode)}
                className={`flex-1 rounded-xl border px-3 py-2 transition ${
                  theme === mode
                    ? "border-[#34A853] bg-[#34A853]/10 font-semibold"
                    : "border-slate-200 bg-slate-50 hover:bg-white"
                }`}
              >
                <span className="block text-[12px] capitalize">{mode}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Notifications */}
        <section className="relative bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-5">
          <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-[#EA4335]" />
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-[#EA4335]" />
            <h2 className="text-sm font-semibold text-slate-900">Notifications</h2>
          </div>

          <div className="space-y-4">
            <Item
              title="Post published"
              desc="Email when article successfully published."
              checked={notifyPublished}
              onChange={setNotifyPublished}
              Toggle={Toggle}
            />
            <Item
              title="Errors"
              desc="Notify if WP API or content generation fails."
              checked={notifyErrors}
              onChange={setNotifyErrors}
              Toggle={Toggle}
            />
            <Item
              title="Billing & usage"
              desc="Alerts when limits reached or invoices issued."
              checked={notifyBilling}
              onChange={setNotifyBilling}
              Toggle={Toggle}
            />
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end gap-2 pt-2">
          <button className="cancelBtn">Reset defaults</button>
          <button className="saveBtn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </form>

      <style>{`
        .label { font-size: 11px; font-weight: 500; color: #475569; margin-bottom: 6px; display: block; }
        .input { width: 100%; padding: 10px 14px; border-radius: 12px; border: 1px solid #e2e8f0; background:#f8fafc; font-size: 14px; outline: none; transition: .2s; }
        .input:focus { border-color:#4285F4; background:white; }
        .saveBtn { background:#34A853; color:white; padding:10px 22px; font-size:13px; border-radius:15px; font-weight:600; }
        .cancelBtn { padding:10px 22px; font-size:13px; border-radius:15px; font-weight:500; }
      `}</style>
    </div>
  );

  function Item({ title, desc, checked, onChange, Toggle }) {
    return (
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
        <Toggle checked={checked} onChange={onChange} />
      </div>
    );
  }
}
