"use client";

import { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  Loader2,
  Globe,
  FileText,
  Image as ImgIcon,
  CalendarDays,
  Search,
  Filter,
} from "lucide-react";

export default function PostHistory() {
  const [posts, setPosts] = useState([]);
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [selectedSite, setSelectedSite] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsRes, sitesRes] = await Promise.all([
        api.get("/posts"),
        api.get("/sites"),
      ]);
      setPosts(postsRes.data || []);
      setSites(sitesRes.data || []);
    } catch (e) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const totalSites = sites.length;
  const totalPosts = posts.length;
  const postsWithImages = posts.filter((p) => p.has_image).length;
  const postsWithoutImages = totalPosts - postsWithImages;

  // Filtered Posts
  const filteredPosts = posts.filter((p) => {
    const matchesSite =
      !selectedSite || String(p.site_id) === String(selectedSite);
    const matchesStyle =
      !selectedStyle || p.style?.toLowerCase() === selectedStyle.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.keyword.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSite && matchesStyle && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ===== HEADER ===== */}
        <div className="bg-[#4285F4] text-white rounded-3xl shadow-lg p-10">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <FileText className="w-7 h-7" /> Post History
          </h1>
          <p className="text-sm opacity-90 max-w-2xl">
            Explore your published articles across multiple connected sites with filters and insights.
          </p>
        </div>

        {/* ===== SUMMARY ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <h4 className="text-gray-500 text-sm">Total Sites</h4>
            <p className="text-2xl font-semibold text-[#EA4335]">{totalSites}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <h4 className="text-gray-500 text-sm">Total Posts</h4>
            <p className="text-2xl font-semibold text-[#4285F4]">{totalPosts}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <h4 className="text-gray-500 text-sm">With Images</h4>
            <p className="text-2xl font-semibold text-[#34A853]">{postsWithImages}</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-5 text-center">
            <h4 className="text-gray-500 text-sm">Without Images</h4>
            <p className="text-2xl font-semibold text-[#FBBC05]">{postsWithoutImages}</p>
          </div>
        </div>

        {/* ===== FILTER BAR ===== */}
        <div className="bg-white rounded-3xl shadow p-6 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Filter className="w-4 h-4 text-[#4285F4]" />
            Filters
          </div>

          <select
            value={selectedSite}
            onChange={(e) => setSelectedSite(e.target.value)}
            className="border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#4285F4] outline-none"
          >
            <option value="">All Sites</option>
            {sites.map((s) => (
              <option key={s.id} value={s.id}>
                {s.site_name}
              </option>
            ))}
          </select>

          <select
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
            className="border rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#FBBC05] outline-none"
          >
            <option value="">All Styles</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="seo">SEO Optimized</option>
            <option value="storytelling">Storytelling</option>
          </select>

          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by title or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border rounded-xl pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#34A853] outline-none"
            />
          </div>
        </div>

        {/* ===== POSTS ===== */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 text-[#4285F4] animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-white">
            <p className="text-gray-600 mb-3">No posts found.</p>
            <p className="text-sm text-gray-400">
              Try changing your filters or search term.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl shadow-md p-5 hover:shadow-xl transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {p.title}
                  </h3>
                  <a
                    href={p.wp_post_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#4285F4] hover:underline text-sm font-medium"
                  >
                    Open
                  </a>
                </div>

                <p className="text-sm text-gray-500 mb-3">
                  Keyword:{" "}
                  <span className="font-medium text-gray-700">{p.keyword}</span>
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mt-3 border-t pt-3">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#EA4335]" />{" "}
                    {p.site_name || "Unknown Site"}
                  </span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3 text-[#FBBC05]" />
                    {new Date(p.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="px-2 py-1 text-xs rounded-full bg-[#FBBC051A] text-[#FBBC05] capitalize">
                    {p.style || "Formal"}
                  </span>
                  {p.has_image ? (
                    <span className="flex items-center gap-1 text-[#34A853] text-xs font-medium">
                      <ImgIcon className="w-3 h-3" /> Image Included
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                      <ImgIcon className="w-3 h-3" /> No Image
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== HELP SECTION ===== */}
        <div className="p-8 rounded-3xl bg-[#34A853] text-white shadow-lg mt-10">
          <h4 className="font-semibold text-lg mb-2">Need help analyzing your post data?</h4>
          <p className="text-sm opacity-90">
            Learn how filters and post stats can help you track content performance across sites.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="/docs/post-stats-guide"
              className="text-sm px-3 py-2 bg-white text-[#34A853] rounded-md font-medium shadow hover:shadow-md transition"
            >
              View Guide
            </a>
            <a
              href="/support"
              className="text-sm px-3 py-2 bg-[#EA4335] text-white rounded-md font-medium shadow hover:bg-[#C5221F] transition"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}