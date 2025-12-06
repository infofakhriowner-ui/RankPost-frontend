"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "../../utils/api";
import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { LoadingButton, PageTransition } from "../../../components/ui";

export default function LoginPage() {
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 👉 Already logged in? redirect to dashboard
  useEffect(() => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("access_token");
    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  // 👉 Social Login Handlers
  const googleLogin = () => {
  window.location.href = process.env.NEXT_PUBLIC_GOOGLE_LOGIN_URL;
};

  const githubLogin = () => {
    window.location.href = `${BACKEND_URL}/api/v1/auth/github/login`;
  };

  const facebookLogin = () => {
    window.location.href = `${BACKEND_URL}/api/v1/auth/facebook/login`;
  };

  // 👉 Submit Login Form
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/login", { email, password });
      const { access_token, refresh_token } = res.data;

      localStorage.setItem("access_token", access_token);

      if (remember && refresh_token) {
        localStorage.setItem("refresh_token", refresh_token);
      }

      router.push("/dashboard");
      window.location.reload(); // 🔥 Menu instantly updates after login
    } catch (err) {
      setError(err?.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen grid lg:grid-cols-2 bg-white">

        {/* LEFT SECTION */}
        <div className="hidden lg:flex flex-col justify-center px-16 border-r border-slate-200">
          <h2 className="text-4xl font-bold text-slate-900 leading-tight">
            Welcome back 👋
          </h2>
          <p className="text-slate-600 mt-3 text-base">
            Sign in to continue publishing automatically and scaling your content.
          </p>

          <ul className="mt-8 space-y-3 text-slate-700 text-sm font-medium">
            <li>• Automate WordPress publishing</li>
            <li>• Create & publish 10x faster</li>
            <li>• Save 40+ hours every month</li>
          </ul>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center justify-center px-6 py-14">
          <div className="w-full max-w-md">

            <h1 className="text-3xl font-bold text-slate-900">Sign in</h1>
            <p className="text-slate-600 mt-2 text-sm">Continue where you left off.</p>

            {/* SOCIAL LOGINS */}
            <div className="space-y-3 mt-6">
              <button
                onClick={googleLogin}
                className="w-full h-11 rounded-xl border border-slate-200 flex items-center justify-center gap-3 text-sm font-medium hover:bg-slate-100 transition"
              >
                <FaGoogle className="text-red-500" /> Sign in with Google
              </button>

              <button
                onClick={facebookLogin}
                className="w-full h-11 rounded-xl border border-slate-200 flex items-center justify-center gap-3 text-sm font-medium hover:bg-slate-100 transition"
              >
                <FaFacebookF className="text-blue-600" /> Sign in with Facebook
              </button>

              <button
                onClick={githubLogin}
                className="w-full h-11 rounded-xl border border-slate-200 flex items-center justify-center gap-3 text-sm font-medium hover:bg-slate-100 transition"
              >
                <FaGithub /> Sign in with GitHub
              </button>
            </div>

            {/* DIVIDER */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-[1px] bg-slate-200 w-full" />
              <span className="text-xs text-slate-500">or</span>
              <div className="h-[1px] bg-slate-200 w-full" />
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded-xl p-3">
                {error}
              </div>
            )}

            {/* LOGIN FORM */}
            <form onSubmit={submit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none shadow-sm"
                />
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none shadow-sm"
                />
                <span
                  className="absolute right-4 top-[42px] text-slate-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                </span>
              </div>

              {/* REMEMBER ME + FORGOT */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="h-4 w-4"
                  />
                  Remember me
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-slate-900 font-medium hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* SUBMIT BUTTON */}
              <LoadingButton
                loading={loading}
                type="submit"
                className="w-full py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-md transition"
              >
                Sign In
              </LoadingButton>
            </form>

            {/* SIGNUP LINK */}
            <p className="text-center text-sm text-slate-600 mt-6">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-slate-900 font-semibold hover:underline">
                Create account
              </Link>
            </p>

          </div>
        </div>
      </div>
    </PageTransition>
  );
}
