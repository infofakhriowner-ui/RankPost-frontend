"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Dashboard jaisi protected pages ke liye
export function useAuthGuard() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === "undefined") return // server-side pe skip karo

    const token = localStorage.getItem("access_token")
    if (!token) {
      router.replace("/login") // Agar login nahi hai to login bhej do
    }
  }, [router])
}

// Login / Signup pages ke liye (ulta guard)
export function useRedirectIfAuth() {
  const router = useRouter()

  useEffect(() => {
    if (typeof window === "undefined") return // server-side pe skip karo

    const token = localStorage.getItem("access_token")
    if (token) {
      router.replace("/dashboard") // Agar already login hai to dashboard bhej do
    }
  }, [router])
}
