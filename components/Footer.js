"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700">

        {/* BRANDING */}
        <div>
          <Link href="/" className="flex items-center font-bold text-2xl tracking-tight select-none">
            <span className="text-[#4285F4]">R</span>
            <span className="text-[#EA4335]">a</span>
            <span className="text-[#FBBC05]">n</span>
            <span className="text-[#34A853]">k</span>
            <span className="text-[#4285F4]">P</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">s</span>
            <span className="text-[#34A853]">t</span>
          </Link>

          <p className="mt-4 text-sm text-gray-600 leading-relaxed">
            AI-powered Auto Posting & Content Automation for WordPress & Social Media.
            Save time. Grow faster.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-[#4285F4]">Home</Link>
            <Link href="/Pricing" className="hover:text-[#34A853]">Pricing</Link>
            <Link href="#features" className="hover:text-[#EA4335]">Features</Link>
            <Link href="#contact" className="hover:text-[#FBBC05]">Contact</Link>
            <Link href="#faq" className="hover:text-[#4285F4]">FAQ</Link>
          </div>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/Terms" className="hover:text-[#34A853]">Terms & Conditions</Link>
            <Link href="/Privacy" className="hover:text-[#4285F4]">Privacy Policy</Link>
            <Link href="/Refund" className="hover:text-[#EA4335]">Refund Policy</Link>
          </div>
        </div>

        {/* CONTACT / SOCIAL */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm text-gray-600">info@rankpost.net</p>
        </div>

      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} <span className="font-semibold">RankPost</span>. All rights reserved.
      </div>
    </footer>
  );
}
