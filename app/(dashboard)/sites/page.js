"use client";

import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useRouter } from "next/navigation";
import { Globe, FileText, Zap, ShieldCheck } from "lucide-react";

// Small spinner
function SpinnerSmall() {
  return (
    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}

// Stat Card
function StatCard({ title, value, subtitle, color, icon: Icon }) {
  return (
    <div
      className={`relative bg-white border border-gray-200 shadow-md hover:shadow-xl rounded-2xl p-5 flex items-center gap-4 transition-all hover:-translate-y-1`}
    >
      <div
        className={`p-3 rounded-xl ${color} flex items-center justify-center shadow`}
      >
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-xs text-gray-400">{subtitle}</div>
      </div>
    </div>
  );
}

// Add/Edit Site Modal
function SiteFormModal({ open, onClose, onSaved, existing }) {
  const [siteName, setSiteName] = useState("");
  const [wpUrl, setWpUrl] = useState("");
  const [wpUser, setWpUser] = useState("");
  const [wpAppPass, setWpAppPass] = useState("");
  const [style, setStyle] = useState("classic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (open) {
      setSiteName(existing?.site_name || "");
      setWpUrl(existing?.wp_url || "");
      setWpUser(existing?.wp_user || "");
      setWpAppPass("");
      setStyle(existing?.style || "classic");
      setError(null);
      setSuccess(null);
    }
  }, [open, existing]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (existing?.id) {
        await api.patch(`/sites/${existing.id}`, {
          site_name: siteName,
          wp_url: wpUrl,
          wp_user: wpUser,
          wp_app_pass_enc: wpAppPass || undefined,
          style,
        });
        setSuccess("Site updated successfully!");
        onSaved && onSaved();
      } else {
        await api.post("/sites/add", {
          site_name: siteName,
          wp_url: wpUrl,
          wp_user: wpUser,
          wp_app_pass_enc: wpAppPass,
          style,
        });
        setSuccess("Site added successfully!");
        setSiteName("");
        setWpUrl("");
        setWpUser("");
        setWpAppPass("");
        setStyle("classic");
        onSaved && onSaved();
      }
    } catch (err) {
      setError(err?.response?.data?.detail || "Failed to save site");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onClose()}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#4285F4]">
            {existing?.id ? "Edit Site" : "Add WordPress Site"}
          </h2>
          <button
            onClick={() => onClose()}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 text-sm text-green-600 bg-green-50 border border-green-100 rounded-md p-3">
            {success}
          </div>
        )}

        <form onSubmit={submit} className="mt-5 space-y-4">
          <input
            type="text"
            placeholder="Site Name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
          />
          <input
            type="url"
            placeholder="WordPress URL"
            value={wpUrl}
            onChange={(e) => setWpUrl(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#EA4335]"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="WP User"
              value={wpUser}
              onChange={(e) => setWpUser(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FBBC05]"
            />
            <input
              type="password"
              placeholder="WP App Password"
              value={wpAppPass}
              onChange={(e) => setWpAppPass(e.target.value)}
              required={!existing}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#34A853]"
            />
          </div>

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285F4]"
          >
            <option value="classic">Classic</option>
            <option value="modern">Modern</option>
          </select>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="py-3 px-5 bg-[#4285F4] text-white rounded-xl font-semibold shadow-md hover:bg-[#357AE8] transition-all flex items-center gap-2"
            >
              {loading && <SpinnerSmall />}
              {existing?.id
                ? loading
                  ? "Saving..."
                  : "Save Changes"
                : loading
                ? "Adding..."
                : "Add Site"}
            </button>

            <button
              type="button"
              onClick={() => onClose()}
              className="py-3 px-4 border rounded-xl text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Page
export default function SitesPage() {
  const router = useRouter();
  const [sites, setSites] = useState([]);
  const [stats, setStats] = useState({ total: 0, posts_published: 0 });
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

const fetchAll = async () => {
  setLoading(true);
  setError(null);

  try {
    const [sitesRes, postsRes] = await Promise.all([
      api.get("/sites"),
      api.get("/posts"),
    ]);

    const sitesData = sitesRes.data || [];
    const posts = postsRes.data || [];

    // Merge: count posts per site using site_name
    const updatedSites = sitesData.map((s) => {
      const sitePosts = posts.filter((p) => p.site_name === s.site_name);
      return { ...s, posts_published: sitePosts.length };
    });

    const total = updatedSites.length;
    const posts_published = posts.length;

    setSites(updatedSites);
    setStats({ total, posts_published });
  } catch (err) {
    setError("Failed to load sites");
  } finally {
    setLoading(false);
  }
};


  const openAddModal = () => {
    setEditingSite(null);
    setModalOpen(true);
  };

  const openEditModal = (site) => {
    setEditingSite(site);
    setModalOpen(true);
  };

  const handleSaved = async () => {
    setModalOpen(false);
    await fetchAll();
    setToast("Saved successfully");
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (site) => {
    if (!confirm(`Delete site "${site.site_name}"?`)) return;
    try {
      setActionLoadingId(site.id);
      await api.delete(`/sites/${site.id}`);
      await fetchAll();
      setToast("Site deleted");
      setTimeout(() => setToast(null), 2500);
    } catch {
      alert("Failed to delete site");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 bg-[#4285F4] text-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Connected Sites</h1>
            <p className="text-sm opacity-90 max-w-md">
              Manage and connect all your WordPress websites for automated posting and seamless control.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="mt-5 md:mt-0 py-3 px-6 bg-white text-[#4285F4] font-semibold rounded-xl shadow hover:bg-gray-100 transition"
          >
            + Add New Site
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard title="Total Sites" value={stats.total} subtitle="All connected" color="bg-[#4285F4]" icon={Globe} />
          <StatCard title="Posts Published" value={stats.posts_published} subtitle="All-time" color="bg-[#EA4335]" icon={FileText} />
          <StatCard title="Active" value={stats.total} subtitle="Currently linked" color="bg-[#34A853]" icon={ShieldCheck} />
          <StatCard title="Failed" value="0" subtitle="No failed connections" color="bg-[#FBBC05]" icon={Zap} />
        </div>

        {/* Error & Toast */}
        {error && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-md p-3">{error}</div>}
        {toast && <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-100 rounded-md p-3">{toast}</div>}

        {/* Sites List */}
        {loading ? (
          <div className="py-8 text-center text-gray-500">Loading sites...</div>
        ) : sites.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-white">
            <p className="text-gray-600 mb-4">No sites connected yet.</p>
            <button onClick={openAddModal} className="py-2 px-4 bg-[#4285F4] text-white rounded-xl shadow hover:bg-[#357AE8] transition">
              Add your first site
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl border hover:border-[#4285F4]/40 shadow p-5 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{s.site_name}</h3>
                    <a href={s.wp_url} target="_blank" rel="noreferrer" className="text-sm text-[#4285F4] hover:underline">
                      {s.wp_url}
                    </a>
                    <div className="mt-3 text-sm text-gray-500">
                      Posts: <span className="font-medium text-gray-700">{s.posts_published ?? 0}</span>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 shadow-sm">
                    Connected
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <button onClick={() => openEditModal(s)} className="px-3 py-2 bg-[#4285F41A] text-[#4285F4] rounded-xl text-sm hover:bg-[#4285F433] transition">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s)}
                    className="px-3 py-2 bg-[#EA43351A] text-[#EA4335] rounded-xl text-sm hover:bg-[#EA433533] transition"
                    disabled={actionLoadingId === s.id}
                  >
                    {actionLoadingId === s.id ? "..." : "Delete"}
                  </button>
                  <button
                    onClick={() => router.push(`/sites/${s.id}`)}
                    className="ml-auto px-3 py-2 bg-[#34A853] text-white rounded-xl text-sm hover:bg-[#2E7D3C] transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-10 p-6 rounded-2xl bg-[#EA4335] text-white shadow-lg">
          <h4 className="font-semibold text-lg mb-2">Need help connecting your WordPress site?</h4>
          <p className="text-sm opacity-90">
            Follow our quick setup guide or contact support if your connection fails.
          </p>
          <div className="mt-4 flex gap-3">
            <a href="/docs/sites-setup" className="text-sm px-3 py-2 bg-white text-[#EA4335] rounded-md font-medium shadow hover:shadow-md transition">
              View Setup Guide
            </a>
            <a href="/support" className="text-sm px-3 py-2 bg-[#FBBC05] text-white rounded-md font-medium shadow hover:bg-[#E5A900] transition">
              Contact Support
            </a>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-10 p-6 text-center rounded-2xl bg-[#34A853] text-white shadow-lg">
          <h3 className="font-semibold text-lg">🚀 Ready to automate your posting?</h3>
          <p className="text-sm opacity-90 mt-1">Upgrade your plan and unlock unlimited auto-posting power.</p>
        </div>
      </div>

      {/* Modal */}
      <SiteFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
        existing={editingSite}
      />
    </div>
  );
}