"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OAuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Backend se yahi param aa raha hota hai:
    const token = params.get("token");

    if (token) {
      // Token ko localStorage me save karo
      localStorage.setItem("access_token", token);

      // Refresh token backend abhi nahi bhej raha
      localStorage.setItem("refresh_token", "");

      // Dashboard me redirect
      router.push("/dashboard");
    } else {
      // Agar token nahi mila to login page pe bhejo
      router.push("/login?error=OAuthFailed");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg font-semibold">Logging you in…</p>
    </div>
  );
}
