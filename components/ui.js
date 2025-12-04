"use client";

import { useEffect, useState } from "react";

// =========================
// PAGE TRANSITION WRAPPER
// =========================
export function PageTransition({ children }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`transition-all duration-300 ${
        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      {children}
    </div>
  );
}

// =========================
// BASIC SKELETON (Loader)
// =========================
export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded-md ${className}`}></div>
  );
}

// =========================
// BUTTON WITH LOADING STATE
// =========================
export function LoadingButton({ loading, children, className, ...props }) {
  return (
    <button
      disabled={loading}
      {...props}
      className={`relative flex items-center justify-center gap-2 rounded-xl font-medium transition ${
        loading ? "opacity-80 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      ) : (
        children
      )}
    </button>
  );
}

// =========================
// DASHBOARD LOADING SKELETON
// =========================
export function DashboardSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-4 p-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-6 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <Skeleton className="h-5 w-24 mb-3" />
          <Skeleton className="h-10 w-20" />
        </div>
      ))}
    </div>
  );
}
