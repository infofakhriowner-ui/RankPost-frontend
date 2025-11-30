"use client";

import { useEffect, useState } from "react";
import api from "../../../utils/api";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Globe,
  FileText,
  CheckCircle,
  Rocket,
  Edit,
  Trash2,
  ImageIcon,
} from "lucide-react";


export default function SiteDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [site, setSite] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);

  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [editURL, setEditURL] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [siteRes, postsRes] = await Promise.all([
        api.get(`/sites/${id}`),
        api.get("/posts"),
      ]);

      setSite(siteRes.data);
      const filteredPosts = postsRes.data.filter(
        (p) => p.site_name === siteRes.data.site_name
      );

      filteredPosts.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      setPosts(filteredPosts);
      setEditName(siteRes.data.site_name);
      setEditURL(siteRes.data.wp_url);
    } catch {
      toast.error("Site Not Found ❌");
    } finally {
      setLoading(false);
    }
  };

  const deleteSite = async () => {
    if (!confirm("Are you sure? This cannot be undone.")) return;

    try {
      await api.delete(`/sites/${id}`);
      toast.success("Site deleted successfully 🚀");
      router.push("/sites");
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  const updateSite = async () => {
    try {
      await api.put(`/sites/${id}`, {
        site_name: editName,
        wp_url: editURL,
      });
      toast.success("Site updated successfully 🎉");
      setEditOpen(false);
      loadData();
    } catch {
      toast.error("Update failed ❌");
    }
  };

  const showMore = () => setVisibleCount((prev) => prev + 5);

  if (loading)
    return <div className="p-10 text-center text-xl">Loading...</div>;
  if (!site)
    return <div className="p-10 text-center text-red-600 font-bold">Site not found ❌</div>;

  // Stats
  const totalPosts = posts.length;
  const todayString = new Date().toLocaleDateString();
  const postsToday = posts.filter(
    (p) => new Date(p.created_at).toLocaleDateString() === todayString
  ).length;

  const published = posts.filter(
    (p) => p.wp_post_url && p.wp_post_url !== ""
  ).length;

  const successRate =
    totalPosts > 0 ? Math.round((published / totalPosts) * 100) : 0;

  const avgPublishTime = "1 min 20 sec";

  return (
    <div className="bg-[#F9FAFB] min-h-screen p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-3xl shadow flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Globe className="text-[#4285F4]" /> {site.site_name}
            </h1>
            <a href={site.wp_url} target="_blank" className="text-[#EA4335] hover:underline">
              {site.wp_url}
            </a>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/articles")}
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:opacity-80 flex items-center gap-2"
            >
              Create New Post 🚀
            </button>

            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:opacity-80 gap-2 flex items-center"
              onClick={() => setEditOpen(true)}
            >
              <Edit size={18} /> Edit
            </button>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded-xl hover:opacity-80 flex items-center gap-2"
              onClick={deleteSite}
            >
              <Trash2 size={18} /> Delete
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">
          <StatCard color="#4285F4" icon={<FileText />} label="Total Posts" value={totalPosts} />
          <StatCard color="#34A853" icon={<CheckCircle />} label="Posts Today" value={postsToday} />
          <StatCard color="#EA4335" icon={<Rocket />} label="Success Rate" value={`${successRate}%`} />
          <StatCard color="#FBBC05" icon={<ImageIcon />} label="Avg Publish Time" value={avgPublishTime} />
        </div>

        {/* RECENT POSTS */}
        <div className="bg-white rounded-3xl shadow p-6 mt-10">
          <h2 className="text-xl font-semibold mb-4">📰 Recent Posts</h2>

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet.</p>
          ) : (
            posts.slice(0, visibleCount).map((p) => (
              <div
                key={p.id}
                className="p-4 border-b border-gray-200 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-[#4285F4]">{p.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(p.created_at).toLocaleString()}
                  </p>
                </div>
                <a
                  href={p.wp_post_url}
                  target="_blank"
                  className="text-[#EA4335] hover:underline font-medium"
                >
                  View →
                </a>
              </div>
            ))
          )}

          {visibleCount < posts.length && (
            <button
              onClick={showMore}
              className="mt-5 w-full bg-[#4285F4] text-white py-2 rounded-xl hover:opacity-80"
            >
              Load More Posts
            </button>
          )}
        </div>
      </div>

      {/* EDIT SITE MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-xl pointer-events-auto">
            <h2 className="text-xl font-bold mb-4">Edit Site</h2>

            <input
              type="text"
              className="w-full border p-3 rounded-xl mb-3"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <input
              type="text"
              className="w-full border p-3 rounded-xl mb-4"
              value={editURL}
              onChange={(e) => setEditURL(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-xl"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-xl"
                onClick={updateSite}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div
      className="text-white rounded-3xl shadow p-5 flex flex-col justify-between"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center gap-2 mb-2 text-sm opacity-80">
        {icon} {label}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
