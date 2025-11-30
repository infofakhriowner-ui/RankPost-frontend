"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Bot, Rocket, Globe2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export default function PricingPage() {
  return (
    <div className="font-inter min-h-screen bg-slate-50 text-slate-900">
      
      {/* ===== PRICING HEADER ===== */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-700 mt-3 max-w-2xl mx-auto">
            Pay only for what you publish — 1 credit = 1 full article with image.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
            🔒 7-day money-back guarantee — try 100% risk-free
          </div>
        </div>
      </header>

      {/* ===== PRICING CARDS ===== */}
      <section className="bg-white border-b border-slate-200 py-20">
        <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">
          
          {/* STARTER */}
          <div className="rounded-2xl border border-slate-200 p-8 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <h3 className="text-lg font-bold text-slate-900">Starter</h3>
            <p className="text-4xl font-extrabold mt-2">$27</p>
            <p className="text-sm text-slate-500 mt-1">Perfect for beginners & new publishers</p>

            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>✓ 30 AI-written articles</li>
              <li>✓ Image + SEO optimized</li>
              <li>✓ WordPress auto publish</li>
              <li>✓ Basic analytics</li>
              <li>✓ Standard support</li>
            </ul>

            <button className="w-full rounded-full bg-[#4285F4] mt-8 py-3 text-sm font-semibold text-white shadow hover:bg-[#3367D6] transition">
              Choose Starter
            </button>
          </div>

          {/* PRO */}
          <div className="relative rounded-2xl p-8 text-left border-2 border-[#4285F4] shadow-xl bg-white/80 backdrop-blur-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold bg-[#4285F4] text-white shadow">
              Most popular
            </span>

            <h3 className="text-lg font-bold text-slate-900">Pro</h3>
            <p className="text-4xl font-extrabold mt-2">$57</p>
            <p className="text-sm text-slate-600 mt-1">Best for teams & publishers</p>

            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>✓ 100 AI articles</li>
              <li>✓ Bulk generation</li>
              <li>✓ Advanced SEO optimization</li>
              <li>✓ Auto-publish multiple sites</li>
              <li>✓ Analytics & insights</li>
              <li>✓ Priority support</li>
            </ul>

            <button className="w-full rounded-full bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] mt-8 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 transition">
              Upgrade to Pro
            </button>
          </div>

          {/* AGENCY */}
          <div className="rounded-2xl border border-slate-200 p-8 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <h3 className="text-lg font-bold text-slate-900">Agency</h3>
            <p className="text-4xl font-extrabold mt-2">$147</p>
            <p className="text-sm text-slate-500 mt-1">For agencies & enterprise</p>

            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>✓ 300 AI premium articles</li>
              <li>✓ Team access & approvals</li>
              <li>✓ White-label exports</li>
              <li>✓ API & advanced automation</li>
              <li>✓ VIP priority support</li>
            </ul>

            <button className="w-full rounded-full border border-slate-300 mt-8 py-3 text-sm font-semibold hover:bg-slate-100 transition">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-slate-500">
            Need custom high-volume plan?{" "}
            <Link href="/contact" className="text-[#4285F4] font-semibold hover:underline">
              Talk to us
            </Link>
          </p>
        </div>
      </section>

    </div>
  );
}