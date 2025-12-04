"use client";

import { useState, useEffect } from "react";
import api from "../app/utils/api";
import ReloadLink from "../components/ReloadLink";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [credits, setCredits] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
    if (token) fetchUserCredits();

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // 🔥 Sync login state jab token change ho ya page focus ho
useEffect(() => {
  const syncAuth = () => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
    if (token) fetchUserCredits();
  };

  window.addEventListener("focus", syncAuth);
  window.addEventListener("storage", syncAuth);

  return () => {
    window.removeEventListener("focus", syncAuth);
    window.removeEventListener("storage", syncAuth);
  };
}, []);

  const fetchUserCredits = async () => {
    try {
      const res = await api.get("/users/me");
      setCredits(res.data.credits || 0);
    } catch (error) {
      console.log("Failed to fetch credits", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  const isActive = (path) =>
    typeof window !== "undefined" && window.location.pathname === path;

  return (
    <nav
      className={`w-full fixed top-0 left-0 backdrop-blur-xl bg-white/90 border-b border-gray-200 z-50 transition-all duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <ReloadLink href="/" className="flex items-center font-bold text-2xl tracking-tight select-none">
          <span className="text-[#4285F4]">R</span>
          <span className="text-[#EA4335]">a</span>
          <span className="text-[#FBBC05]">n</span>
          <span className="text-[#34A853]">k</span>
          <span className="text-[#4285F4]">P</span>
          <span className="text-[#EA4335]">o</span>
          <span className="text-[#FBBC05]">s</span>
          <span className="text-[#34A853]">t</span>
        </ReloadLink>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          {!isLoggedIn ? (
            <>
              <ReloadLink href="/" className={`hover:text-[#4285F4] ${isActive("/") && "font-bold text-[#4285F4]"}`}>Home</ReloadLink>
              <ReloadLink href="#features" className="hover:text-[#EA4335]">Features</ReloadLink>
              <ReloadLink href="#demo" className="hover:text-[#FBBC05]">Demo</ReloadLink>
              <ReloadLink href="/Pricing" className={`hover:text-[#34A853] ${isActive("/Pricing") && "font-bold text-[#34A853]"}`}>Pricing</ReloadLink>
              <ReloadLink href="#about" className="hover:text-[#4285F4]">About</ReloadLink>
              <ReloadLink href="#faq" className="hover:text-[#EA4335]">FAQ</ReloadLink>
              <ReloadLink href="#contact" className="hover:text-[#FBBC05]">Contact</ReloadLink>

              <div className="relative group">
                <button className="hover:text-[#34A853]">More ▾</button>
                <div className="absolute hidden group-hover:block transition-all duration-200 bg-white rounded-md shadow-md py-2 w-40">
                  <ReloadLink href="/Terms" className="block px-4 py-2 hover:bg-gray-100">Terms</ReloadLink>
                  <ReloadLink href="/Privacy" className="block px-4 py-2 hover:bg-gray-100">Privacy</ReloadLink>
                  <ReloadLink href="/Refund" className="block px-4 py-2 hover:bg-gray-100">Refund</ReloadLink>
                </div>
              </div>
            </>
          ) : (
            <>
              <ReloadLink href="/dashboard" className="hover:text-[#4285F4]">Dashboard</ReloadLink>
              <ReloadLink href="/sites" className="hover:text-[#EA4335]">Add Site</ReloadLink>
              <ReloadLink href="/articles" className="hover:text-[#FBBC05]">Create Post</ReloadLink>
              <ReloadLink href="/history" className="hover:text-[#34A853]">Post History</ReloadLink>
              <ReloadLink href="/billing" className="hover:text-[#34A853]">Billing</ReloadLink>
              <ReloadLink href="/profile" className="hover:text-[#4285F4]">Profile</ReloadLink>
              <ReloadLink href="/preferences" className="hover:text-[#EA4335]">Preferences</ReloadLink>
            </>
          )}
        </div>

        {/* DESKTOP RIGHT SIDE */}
        {!isLoggedIn ? (
          <div className="hidden md:flex items-center gap-4">
            <ReloadLink href="/login" className="font-semibold text-gray-700 hover:text-[#4285F4]">Login</ReloadLink>
            <ReloadLink href="/signup" className="px-4 py-2 font-semibold text-sm text-white bg-[#4285F4] hover:bg-[#357ae8] rounded-lg">
              Sign Up
            </ReloadLink>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-[#FBBC05]/20 text-[#d97706] font-semibold text-sm">🔥 {credits} Credits</span>
            <ReloadLink href="/billing" className="px-4 py-2 text-sm font-semibold rounded-lg text-white bg-[#34A853] hover:bg-[#2E7D3C]">Buy Credits</ReloadLink>
            <button onClick={handleLogout} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-[#EA4335]">Logout</button>
          </div>
        )}

        {/* MOBILE CONTROLS */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-3xl md:hidden">☰</button>

      </div>

      {/* MOBILE MENU */}
<div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-200 ${
  mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
}`}>
  <div className="flex flex-col gap-3 px-6 py-4 text-gray-700 font-medium">

    {/* NOT LOGGED IN MENU */}
    {!isLoggedIn && (
      <>
        <Link href="/" onClick={() => setMobileOpen(false)} className="hover:text-[#4285F4]">Home</Link>
        <Link href="#features" onClick={() => setMobileOpen(false)} className="hover:text-[#EA4335]">Features</Link>
        <Link href="#demo" onClick={() => setMobileOpen(false)} className="hover:text-[#FBBC05]">Demo</Link>
        <Link href="/Pricing" onClick={() => setMobileOpen(false)} className="hover:text-[#34A853]">Pricing</Link>
        <Link href="#about" onClick={() => setMobileOpen(false)} className="hover:text-[#4285F4]">About</Link>
        <Link href="#faq" onClick={() => setMobileOpen(false)} className="hover:text-[#EA4335]">FAQ</Link>
        <Link href="#contact" onClick={() => setMobileOpen(false)} className="hover:text-[#FBBC05]">Contact</Link>

        {/* More */}
        <button onClick={() => setShowMore(!showMore)} className="text-left w-full font-semibold hover:text-[#34A853]">
          More ▾
        </button>

        {showMore && (
          <div className="flex flex-col gap-2 pl-4 mt-1 border-l">
            <Link href="/Terms" onClick={() => setMobileOpen(false)} className="hover:text-[#34A853]">Terms</Link>
            <Link href="/Privacy" onClick={() => setMobileOpen(false)} className="hover:text-[#4285F4]">Privacy</Link>
            <Link href="/Refund" onClick={() => setMobileOpen(false)} className="hover:text-[#EA4335]">Refund</Link>
          </div>
        )}

        {/* Auth buttons */}
        <div className="pt-3 border-t flex flex-col gap-2">
          <Link href="/login" onClick={() => setMobileOpen(false)} className="hover:text-[#4285F4]">Login</Link>
          <Link href="/signup" onClick={() => setMobileOpen(false)} className="hover:text-[#34A853]">Sign Up</Link>
        </div>
      </>
    )}

    {/* LOGGED IN MENU */}
    {isLoggedIn && (
      <>
        <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="hover:text-[#4285F4]">Dashboard</Link>
        <Link href="/sites" onClick={() => setMobileOpen(false)} className="hover:text-[#EA4335]">Add Site</Link>
        <Link href="/articles" onClick={() => setMobileOpen(false)} className="hover:text-[#FBBC05]">Create Post</Link>
        <Link href="/history" onClick={() => setMobileOpen(false)} className="hover:text-[#34A853]">Post History</Link>
        <Link href="/billing" onClick={() => setMobileOpen(false)} className="hover:text-[#34A853]">Billing</Link>
        <Link href="/profile" onClick={() => setMobileOpen(false)} className="hover:text-[#4285F4]">Profile</Link>
        <Link href="/preferences" onClick={() => setMobileOpen(false)} className="hover:text-[#EA4335]">Preferences</Link>

        <button
          onClick={handleLogout}
          className="pt-3 border-t text-left font-semibold text-gray-700 hover:text-[#EA4335]"
        >
          Logout
        </button>
      </>
    )}

  </div>
</div>
