"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../utils/api";
import {
  Globe,
  FileText,
  Zap,
  Rocket,
  BarChart3,
  CalendarDays,
  ExternalLink,
  Wallet,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalSites: 0,
    totalPosts: 0,
    postsToday: 0,
  });

  const [credits, setCredits] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [sites, setSites] = useState([]);
  const [posts, setPosts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const token = localStorage.getItem("access_token");

  // 🔒 HARD GUARD
  if (!token) {
    router.replace("/login");
    return;
  }

  fetchDashboardData();
}, []);


  const fetchDashboardData = async () => {
    try {
      const [sitesRes, postsRes] = await Promise.all([
        api.get("/sites"),
        api.get("/posts"),
      ]);

      const sitesData = sitesRes.data || [];
      const postsData = postsRes.data || [];

      const totalSites = sitesData.length;
      const totalPosts = postsData.length;

      // ===== Posts Today without timezone issues =====
      const todayString = new Date().toLocaleDateString();
      const postsToday = postsData.filter(
        (p) => new Date(p.created_at).toLocaleDateString() === todayString
      ).length;

      // ===== Chart data last 30 days =====
      const last30 = {};
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toLocaleDateString();
        last30[key] = 0;
      }

      postsData.forEach((p) => {
        const d = new Date(p.created_at).toLocaleDateString();
        if (last30[d] !== undefined) last30[d]++;
      });

      const chart = Object.entries(last30).map(([date, posts]) => ({
        date,
        posts,
      }));

      postsData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setStats({ totalSites, totalPosts, postsToday });
      setChartData(chart);
      setSites(sitesData);
      setPosts(postsData);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Rocket className="w-7 h-7 text-[#4285F4]" /> Welcome Back 👋
          </h1>
          <span className="text-gray-500 text-sm">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* ===== STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
          <StatCard color="#4285F4" icon={<Globe />} label="Total Sites" value={stats.totalSites} />
          <StatCard color="#EA4335" icon={<FileText />} label="Total Posts" value={stats.totalPosts} />
          <StatCard color="#FBBC05" icon={<Zap />} label="Posts Today" value={stats.postsToday} />
          <StatCard
            color="#34A853"
            icon={<BarChart3 />}
            label="Growth Rate"
            value={
              stats.totalPosts > 0
                ? ((stats.postsToday / stats.totalPosts) * 100).toFixed(1) + "%"
                : "0%"
            }
          />
          <StatCard color="#7E57C2" icon={<Wallet />} label="Credits Left" value={`🔥 ${credits}`} />
        </div>

        {/* ===== CHART ===== */}
        <div className="bg-white rounded-3xl shadow p-6 min-h-[400px]">
          <h2 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
            <BarChart3 className="text-[#4285F4]" /> Posts Overview (Last 30 Days)
          </h2>

          <div className="w-full h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="#777" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="posts" stroke="#4285F4" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ===== CONNECTED SITES ===== */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items:center gap-2">
            <Globe className="text-[#34A853]" /> Connected Sites
          </h2>
{console.log("SITES SAMPLE:", sites[0])}
{console.log("POSTS SAMPLE:", posts[0])}


          {sites.length === 0 ? (
            <p className="text-gray-500">No connected sites yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{sites.map((site) => {
  const sitePosts = posts.filter(
  (p) => p.site_name === site.site_name
);


  const postCount = sitePosts.length;

  const addedDate =
  sitePosts.length > 0
    ? new Date(sitePosts[0].created_at).toLocaleDateString()
    : site.created_at
      ? new Date(site.created_at).toLocaleDateString()
      : "N/A";


  return (
    <div key={site.id} className="bg-gray-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="font-semibold text-[#4285F4] text-lg">{site.site_name}</div>

      <div className="text-sm text-gray-600 mt-1 truncate">
        URL:
        <a href={site.wp_url} target="_blank" className="text-[#EA4335] hover:underline">
          {" "}{site.wp_url.replace(/^https?:\/\//, "")}
        </a>
      </div>

      <div className="mt-3 flex justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <FileText className="w-3 h-3 text-[#34A853]" /> Posts: {postCount}
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="w-3 h-3 text-[#FBBC05]" /> Added: {addedDate}
        </span>
      </div>
    </div>
  );
})}

            </div>
          )}
        </div>

        {/* ===== RECENT ACTIVITY ===== */}
        <div className="bg-white rounded-3xl shadow p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            📰 Recent Activity
          </h2>

          {posts.length === 0 ? (
            <p className="text-gray-500">No posts found.</p>
          ) : (
            <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {posts.slice(0, visibleCount).map((p) => (
                <div key={p.id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-[#4285F4]">{p.title}</h4>
                      <p className="text-sm text-gray-600">
                        Site: <span className="font-medium text-[#34A853]">{p.site_name}</span> | Style:{" "}
                        <span className="text-[#FBBC05]">{p.style}</span>
                      </p>
                      <p className="text-xs text-gray-400">{new Date(p.created_at).toLocaleString()}</p>
                    </div>
                    <a
                      href={p.wp_post_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#EA4335] hover:underline flex items-center gap-1 text-sm"
                    >
                      View <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function StatCard({ color, icon, label, value }) {
  return (
    <div
      className="text-white rounded-2xl shadow p-5 flex flex-col justify-between"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-center gap-2 mb-2 opacity-90 text-sm">
        {icon} {label}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}
