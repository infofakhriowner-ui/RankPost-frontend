"use client";

import { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  Loader2,
  Zap,
  Globe,
  FileText,
  Image as ImgIcon,
  CheckCircle,
  Brain,
  Rocket,
} from "lucide-react";

export default function Articles() {
  const [sites, setSites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [credits, setCredits] = useState(0);
  const [form, setForm] = useState({
    keyword: "",
    site_id: "",
    style: "formal",
    with_image: true,
  });

  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [progressText, setProgressText] = useState("");
  const [publishedUrl, setPublishedUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSites();
    fetchRecentPosts();
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const res = await api.get("/users/me");
      setCredits(res.data.credits || 0);
    } catch (err) {
      console.error("Failed to fetch credits:", err);
    }
  };

  const fetchSites = async () => {
    try {
      const res = await api.get("/sites");
      setSites(res.data);
      if (res.data[0]) {
        setForm((prev) => ({ ...prev, site_id: res.data[0].id }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const res = await api.get("/posts");
      const data = res.data || [];
      setPosts(
        data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 5)
      );
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  const autoPublish = async (e) => {
    e.preventDefault();

    if (credits <= 0) {
      return setShowModal(true);
    }

    if (!form.keyword) return alert("Enter a keyword");
    if (!form.site_id) return alert("Select a site");

    setLoading(true);
    setPublishedUrl("");
    setProgressStep(0);
    setProgressText("🚀 Starting auto-publish...");

    const steps = [
      "✍️ Generating article content...",
      "🧠 Optimizing for SEO...",
      "🖼️ Creating featured image...",
      "📤 Publishing to WordPress...",
    ];

    let currentStep = 0;
    const progressInterval = setInterval(() => {
      currentStep++;
      setProgressStep(currentStep);
      setProgressText(steps[Math.min(currentStep - 1, steps.length - 1)]);
    }, 1500);

    try {
      const res = await api.post("/content/auto-publish", {
        keyword: form.keyword,
        style: form.style,
        site_id: Number(form.site_id),
        with_image: form.with_image,
      });

      clearInterval(progressInterval);
      setProgressStep(steps.length + 1);
      setProgressText("✅ Published successfully!");
      setPublishedUrl(res.data.url);

      setCredits((prev) => prev - 1);
      fetchRecentPosts();
    } catch (err) {
      clearInterval(progressInterval);

      if (err?.response?.data?.detail === "NOT_ENOUGH_CREDITS") {
        return setShowModal(true);
      }

      setProgressText(
        "❌ Failed: " + (err?.response?.data?.detail || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* ===== HEADER ===== */}
        <div className="bg-[#4285F4] text-white rounded-3xl shadow-xl p-10">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Rocket className="w-7 h-7" /> Create & Auto Publish Post
          </h1>
          <p className="text-sm opacity-90 max-w-2xl">
            Let AI generate unique, SEO-optimized articles and instantly publish them to your connected WordPress sites.
          </p>

          <p className="mt-3 inline-block bg-white text-[#4285F4] font-semibold px-4 py-1.5 rounded-full shadow text-sm">
            🔥 Credits Remaining: {credits}
          </p>
        </div>

        {/* ===== HOW IT WORKS ===== */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <Brain className="text-[#34A853]" /> How Auto Publishing Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-center">
            <div className="p-4 rounded-xl border border-gray-200 hover:border-[#4285F4] transition">
              <Zap className="w-8 h-8 mx-auto text-[#4285F4]" />
              <h4 className="mt-3 font-medium">1. Enter Keyword</h4>
              <p className="text-sm text-gray-500">Tell AI what to write about.</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 hover:border-[#EA4335] transition">
              <FileText className="w-8 h-8 mx-auto text-[#EA4335]" />
              <h4 className="mt-3 font-medium">2. Generate Article</h4>
              <p className="text-sm text-gray-500">AI creates a unique article in seconds.</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 hover:border-[#FBBC05] transition">
              <ImgIcon className="w-8 h-8 mx-auto text-[#FBBC05]" />
              <h4 className="mt-3 font-medium">3. Add Image</h4>
              <p className="text-sm text-gray-500">Auto-generate featured image.</p>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 hover:border-[#34A853] transition">
              <Globe className="w-8 h-8 mx-auto text-[#34A853]" />
              <h4 className="mt-3 font-medium">4. Publish</h4>
              <p className="text-sm text-gray-500">Post goes live instantly on WordPress.</p>
            </div>
          </div>
        </div>

        {/* ===== FORM ===== */}
        <div className="bg-white rounded-3xl shadow-md p-8 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Zap className="text-[#4285F4]" /> Step 1: Configure Your Article
          </h2>

          <form onSubmit={autoPublish} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Main Keyword
              </label>
              <input
                required
                placeholder="e.g. Best Budget Laptops"
                value={form.keyword}
                onChange={(e) => setForm({ ...form, keyword: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#4285F4] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Select Site
              </label>
              <select
                value={form.site_id}
                onChange={(e) => setForm({ ...form, site_id: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#EA4335] outline-none"
              >
                <option value="">Choose site</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.site_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Writing Style
              </label>
              <select
                value={form.style}
                onChange={(e) => setForm({ ...form, style: e.target.value })}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#FBBC05] outline-none"
              >
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
                <option value="seo">SEO Optimized</option>
                <option value="storytelling">Storytelling</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={form.with_image}
                onChange={(e) => setForm({ ...form, with_image: e.target.checked })}
                className="accent-[#34A853] w-4 h-4"
              />
              Generate featured image
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#4285F4] text-white font-semibold rounded-xl shadow hover:bg-[#357AE8] transition flex justify-center items-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Publishing..." : "Auto Publish"}
            </button>
          </form>
        </div>

        {/* ===== PROGRESS BOX ===== */}
        {progressText && (
          <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100">
            <div className="flex items-center gap-2 mb-3 text-gray-700">
              {progressText.includes("✅") ? (
                <CheckCircle className="text-[#34A853]" />
              ) : progressText.includes("❌") ? (
                <Zap className="text-[#EA4335]" />
              ) : (
                <Loader2 className="text-[#4285F4] animate-spin" />
              )}
              <p className="font-medium">{progressText}</p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden relative">
              <div
                className={`absolute left-0 top-0 h-full transition-all duration-[1200ms] ease-in-out ${
                  progressText.includes("✅")
                    ? "bg-[#34A853]"
                    : progressText.includes("❌")
                    ? "bg-[#EA4335]"
                    : "bg-gradient-to-r from-[#4285F4] via-[#FBBC05] to-[#34A853]"
                }`}
                style={{
                  width: `${Math.min((progressStep / 5) * 100, 100)}%`,
                }}
              />
            </div>

            {publishedUrl && (
              <p className="mt-4 text-green-600 text-sm">
                View Post:{" "}
                <a
                  href={publishedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold"
                >
                  {publishedUrl}
                </a>
              </p>
            )}
          </div>
        )}

        {/* ===== RECENT POSTS ===== */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            📰 Recently Published Articles
          </h2>

          {posts.length === 0 ? (
            <p className="text-gray-500 text-sm">No recent posts yet.</p>
          ) : (
            <ul className="space-y-3 text-sm text-gray-600">
              {posts.map((p) => (
                <li key={p.id} className="border-b border-gray-100 pb-2">
                  ✅ “{p.title}” – posted on{" "}
                  <strong>{p.site_name}</strong>
                  <br />
                  <a
                    href={p.wp_post_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#4285F4] hover:underline text-xs"
                  >
                    {p.wp_post_url}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ===== HELP / SUPPORT ===== */}
        <div className="p-8 rounded-3xl bg-[#EA4335] text-white shadow-lg">
          <h4 className="font-semibold text-lg mb-2">
            Need help with auto-publishing?
          </h4>
          <p className="text-sm opacity-90">
            Follow our quick setup guide or contact support if your publishing fails.
          </p>
          <div className="mt-4 flex gap-3 flex-wrap">
            <a
              href="/docs/auto-publish-guide"
              className="text-sm px-3 py-2 bg-white text-[#EA4335] rounded-md font-medium shadow hover:shadow-md transition"
            >
              View Setup Guide
            </a>
            <a
              href="/support"
              className="text-sm px-3 py-2 bg-[#34A853] text-white rounded-md font-medium shadow hover:bg-[#2E7D3C] transition"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* ===== MODAL ===== */}
        {showModal && (
          <div className="fixed inset-0 bg.black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm mx-auto">
              <h2 className="text-xl font.bold text-gray-900">⛔ Out of Credits</h2>
              <p className="text-gray-600 text-sm mt-2">
                You don’t have enough credits to publish this article.
              </p>

              <div className="mt-6 flex gap-3 justify-center">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold"
                >
                  Close
                </button>
                <button
                  onClick={() => (window.location.href = "/pricing")}
                  className="px-4 py-2 bg-[#4285F4] text-white rounded-lg font-semibold shadow hover:bg-[#357AE8]"
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
