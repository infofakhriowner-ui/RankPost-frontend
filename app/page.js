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

export default function Page() {
  return (
    <div className="font-inter min-h-screen bg-slate-50 text-slate-900">
      {/* ===== HERO (UPDATED) ===== */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-gradient-to-tr from-[#4285F4]/15 via-[#34A853]/10 to-[#FBBC05]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-[-120px] h-72 w-72 rounded-full bg-gradient-to-tr from-slate-200/60 via-slate-100 to-transparent blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 grid gap-12 lg:grid-cols-[1.1fr,1.1fr] items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#4285F4]/10 text-[#4285F4]">
                <Sparkles className="h-3 w-3" />
              </span>
              AI-powered WordPress auto publishing
            </div>

            <h1 className="text-[2.6rem] md:text-[3rem] font-bold leading-tight tracking-tight">
              Automate your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05]">
                WordPress publishing
              </span>{" "}
              in seconds.
            </h1>

            <p className="text-lg text-slate-800 max-w-xl">
              Create SEO articles, images and publish automatically — without
              wasting hours copy-pasting into WordPress.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full 
                  px-7 py-3 text-sm font-semibold text-white 
                  bg-[#4285F4] shadow-md 
                  hover:bg-[#FBBC05] hover:text-[#111827]
                  active:bg-[#F2A800]
                  transition duration-200"
              >
                Start free — no credit card
              </Link>

              <Link
                href="#demo"
                className="inline-flex items-center justify-center rounded-full 
                px-6 py-3 text-sm font-semibold text-[#111827]
                bg-white border border-[#D0D7DF] 
                hover:bg-[#FBBC05] active:bg-[#D9E8FF]
                transition duration-200"
              >
                Watch demo
              </Link>
            </div>

            <div className="flex items-center gap-4 pt-4 text-xs text-slate-500">
              <div className="flex -space-x-2">
                <span className="h-7 w-7 rounded-full bg-[#4285F4]/10 border border-white" />
                <span className="h-7 w-7 rounded-full bg-[#EA4335]/10 border border-white" />
                <span className="h-7 w-7 rounded-full bg-[#34A853]/10 border border-white" />
              </div>
              <p>🚀 Trusted by 1,200+ publishers saving 40+ hours every month.</p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-sm p-3">
              <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#EA4335]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FBBC05]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#34A853]" />
                  <span className="ml-3 text-[11px] font-medium text-slate-500">
                    RankPost — Dashboard
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Auto publishing · ON
                </span>
              </div>

              <div className="p-3">
                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <Image
                    src="/dashboard-preview.png"
                    alt="RankPost dashboard preview"
                    width={900}
                    height={550}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ===== FEATURES (UPDATED PREMIUM WITH EFFECTS) ===== */}
<section id="features" className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Everything you need to automate WordPress content.
          </h2>
          <p className="text-lg text-slate-800 max-w-2xl">
            RankPost handles writing, visuals, scheduling and publishing — so
            you focus on growth.
          </p>

          {/* TRUST BADGE */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700">
            ⚡ Used by 1,200+ publishers worldwide
          </div>

          <div className="grid gap-8 md:grid-cols-3 mt-12">
            {[
              {
                title: "AI-written SEO articles",
                text: "Create long-form structured content that ranks on Google.",
                icon: <Bot className="h-9 w-9 text-white drop-shadow-md" />,
                color: "bg-[#4285F4]",
              },
              {
                title: "Auto featured images",
                text: "Automatically generated visuals matched to keywords.",
                icon: <Globe2 className="h-9 w-9 text-white drop-shadow-md" />,
                color: "bg-[#34A853]",
              },
              {
                title: "1-click WordPress publish",
                text: "Push posts to multiple sites instantly.",
                icon: <Rocket className="h-9 w-9 text-white drop-shadow-md" />,
                color: "bg-[#FBBC05] text-slate-900",
              },
              {
                title: "Bulk article generator",
                text: "Create 10–20 articles at once in seconds.",
                icon: <Sparkles className="h-9 w-9 text-white drop-shadow-md" />,
                color: "bg-[#EA4335]",
              },
              {
                title: "Scheduling & Automation",
                text: "Auto-publish using custom schedules.",
                icon: <Bot className="h-9 w-9 text-white drop-shadow-md" />,
                color: "bg-[#4285F4]",
              },
              {
                title: "Multi-site Management",
                text: "Add unlimited WordPress sites.",
                icon: <Globe2 className="h-9 w-9 text-white drop-shadow-md" />,
                color: "bg-[#34A853]",
              },
              {
                title: "SEO Optimization Insights",
                text: "Improve ranking with structure and scoring.",
                icon: <Rocket className="h-9 w-9 text-white drop-shadow-md" />,
                color: "bg-[#FBBC05] text-slate-900",
              },
              {
                title: "Team Access & Approvals",
                text: "Work with teams and review content.",
                icon: <Sparkles className="h-9 w-9 text-white drop-shadow-md" />,
                color: "bg-[#EA4335]",
              },
              {
                title: "Analytics Dashboard",
                text: "Track performance & time saved.",
                icon: <Bot className="h-9 w-9 text-white drop-shadow-md" />,
                color: "bg-[#4285F4]",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`rounded-2xl p-6 text-white shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:border-white/40 border-transparent border transition-all duration-200 h-full ${f.color}`}
              >
                <div className="h-14 w-14 mb-4 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-[2px]">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold mb-1">{f.title}</h3>
                <p className="text-sm opacity-95">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DEMO IMPROVED BOX (UPDATED) ===== */}
      <section id="demo" className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20 grid gap-16 lg:grid-cols-2 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xs font-bold tracking-wider text-[#2457C5] uppercase">
              HOW RANKPOST WORKS
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-snug">
              From keyword to live WordPress post
              <br />
              in under a minute.
            </h2>

            <ol className="space-y-3 text-[17px] text-slate-800 font-medium leading-relaxed">
              <li>
                ➤ Add your WordPress sites using secure application passwords.
              </li>
              <li>➤ Enter keywords, choose tone & article length.</li>
              <li>➤ Let AI draft the article and generate a featured image.</li>
              <li>➤ Publish to WordPress with one click.</li>
            </ol>

            <p className="text-sm text-slate-600">
              Auto-save drafts, publish history and performance stats are all
              tracked in your dashboard.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md
        shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]
        hover:-translate-y-1 transition-all duration-200 p-6 space-y-5"
            >
              {/* KEYWORD */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block uppercase">
                  Keyword
                </label>
                <input
                  type="text"
                  defaultValue="best air purifier for small rooms"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm
            focus:ring-2 focus:ring-[#4285F4] outline-none"
                />
              </div>

              {/* Tone + Length */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block uppercase">
                    Tone
                  </label>
                  <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm">
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Neutral</option>
                    <option>Bold</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block uppercase">
                    Length
                  </label>
                  <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm">
                    <option>1200–1600 words</option>
                    <option>1600–2000 words</option>
                    <option>2000–2600 words</option>
                  </select>
                </div>
              </div>

              {/* SITE SELECT */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block uppercase">
                  Target site
                </label>
                <select className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm shadow-sm">
                  <option>homegadgetsblog.com — Connected</option>
                </select>
              </div>

              {/* BUTTON */}
              <button
                className="w-full rounded-full bg-[#4285F4] py-3 text-sm font-semibold text-white shadow-md
          hover:bg-[#FBBC05] hover:text-[#111827] active:bg-[#F2A800]
          transition duration-200"
              >
                Generate & preview article
              </button>
            </div>

            {/* Tooltip Badge */}
            <div className="absolute -right-4 -bottom-8 hidden md:block rounded-2xl border border-slate-200 bg-white shadow px-5 py-3 text-xs text-slate-700 max-w-[240px]">
              “This used to take me 2 hours manually. RankPost does it in 40
              seconds.”
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== LIVE AUTOMATION DEMO SECTION (ANIMATED) ===== */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-20 grid gap-16 lg:grid-cols-2 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-snug">
              See RankPost create a full post automatically — <br />
              in just seconds.
            </h2>

            <p className="text-lg text-slate-700 font-medium max-w-xl">
              Experience real automation. Watch how RankPost turns a keyword
              into a complete, ready-to-publish WordPress article without
              touching the editor.
            </p>

            <ul className="space-y-2 text-base text-slate-800 font-medium">
              <li>⚡ AI writes a full SEO article</li>
              <li>🎨 Featured image generated automatically</li>
              <li>🚀 1-click WordPress publishing</li>
              <li>📈 Saves 40+ hours every month</li>
            </ul>

            <div className="pt-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-[#4285F4] px-7 py-3
          text-sm font-semibold text-white shadow-md
          hover:bg-[#FBBC05] hover:text-[#111827] active:bg-[#F2A800]
          transition duration-200"
              >
                Try it free — generate your first article now
              </Link>
            </div>
          </motion.div>

          {/* RIGHT ANIMATED SIMULATION BOX */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
            viewport={{ once: true }}
            className="relative"
          >
            <LiveAutomationCard />

            {/* Tooltip quote */}
            <div className="absolute -right-4 -bottom-10 hidden md:block rounded-2xl border border-slate-200 bg-white shadow px-5 py-3 text-xs text-slate-700 max-w-[240px]">
              “This used to take me 2 hours manually. RankPost does it in 40
              seconds.”
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <p className="text-xs font-semibold tracking-wide text-[#4285F4] uppercase">
              Testimonials
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-1">
              Loved by niche site owners and agencies.
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Real results from real users publishing faster with RankPost.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <TestimonialCard
              name="Ali Raza"
              role="Digital Agency Owner"
              quote="RankPost turned 2 hours of manual posting into a 40-second automated workflow."
              imageSrc="/user1.png"
              accent="blue"
            />
            <TestimonialCard
              name="Sarah Khan"
              role="Niche Site Publisher"
              quote="Managing 12 affiliate sites manually was painful — now everything is automated."
              imageSrc="/user2.png"
              accent="red"
            />
            <TestimonialCard
              name="Usman Malik"
              role="Affiliate Marketer"
              quote="Our content publishing cost went down by 80% — RankPost is a game changer."
              imageSrc="/user3.png"
              accent="green"
            />
          </div>
        </div>
      </section>
{/* ===== PRICING — ENTERPRISE LEVEL (UPDATED) ===== */}
<section id="pricing" className="bg-white border-b border-slate-200 py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">

    {/* Heading */}
    <h2 className="text-4xl font-bold text-slate-900">
      Simple, transparent pricing
    </h2>
    <p className="text-lg text-slate-700 mt-2">
      Pay only for what you publish — 1 credit = 1 full article (text + image).
    </p>

    {/* Trust Badge */}
    <div className="mt-4 inline-flex items-center gap-2 bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
      🔒 7-day money-back guarantee — try 100% risk-free
    </div>

    {/* Pricing Cards */}
    <div className="grid md:grid-cols-3 gap-8 mt-14">

      {/* STARTER */}
      <div className="rounded-2xl border border-slate-200 p-8 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
        <h3 className="text-lg font-bold text-slate-900">Starter</h3>
        <p className="text-4xl font-extrabold mt-2">$27</p>
        <p className="text-sm text-slate-500 mt-1">Perfect for beginners & new publishers</p>

        <ul className="mt-6 space-y-2 text-sm text-slate-700">
          <li>✓ 30 AI-written articles</li>
          <li>✓ Text + Image included</li>
          <li>✓ SEO-optimized formatting</li>
          <li>✓ 1-click WordPress publish</li>
          <li>✓ Multi-language support</li>
          <li>✓ Basic analytics</li>
          <li>✓ Standard support</li>
        </ul>

        <button className="w-full rounded-full bg-[#4285F4] mt-8 py-3 text-sm font-semibold text-white shadow hover:bg-[#3367D6] transition">
          Choose Starter
        </button>
      </div>

      {/* PRO */}
      <div className="rounded-2xl p-8 text-left shadow-xl border-2 border-[#4285F4] scale-105 relative bg-white/80 backdrop-blur-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

        {/* Ribbon */}
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-[#4285F4] text-white shadow">
          Most popular
        </span>

        <h3 className="text-lg font-bold text-slate-900">Pro</h3>
        <p className="text-4xl font-extrabold mt-2">$57</p>
        <p className="text-sm text-slate-600 mt-1">Best for teams & serious publishers</p>

        <ul className="mt-6 space-y-2 text-sm text-slate-700">
          <li>✓ 100 AI articles</li>
          <li>✓ Text + Image auto-generation</li>
          <li>✓ Blogging Automation </li>
          <li>✓ Auto-publish to multiple sites</li>
          <li>✓ Keyword suggestions & rewriting</li>
          <li>✓ Bulk article creation</li>
          <li>✓ Advanced SEO optimization</li>
          <li>✓ Draft manager & history</li>
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
        <p className="text-sm text-slate-500 mt-1">Built for agencies & enterprise scaling</p>

        <ul className="mt-6 space-y-2 text-sm text-slate-700">
          <li>✓ 300 premium articles</li>
          <li>✓ Text + multiple images</li>
          <li>✓ Multi-site auto publishing</li>
          <li>✓ Team accounts & approvals</li>
          <li>✓ API access & automation</li>
          <li>✓ Bulk generation mode</li>
          <li>✓ Commercial publishing license</li>
          <li>✓ White-label & client export formats</li>
          <li>✓ Dedicated high-speed servers</li>
          <li>✓ Traffic & ranking analytics</li>
          <li>✓ Success manager</li>
          <li>✓ VIP premium support</li>
        </ul>

        <button className="w-full rounded-full border border-slate-300 mt-8 py-3 text-sm font-semibold hover:bg-slate-100 transition">
          Contact sales
        </button>
      </div>

    </div>
  </div>
</section>
{/* ===== WHO IS RANKPOST FOR ===== */}
<section className="bg-white border-b border-slate-200 py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
      Who is RankPost built for?
    </h2>
    <p className="text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
      Whether you’re publishing content for yourself or for clients, RankPost automates everything
      so you can scale without stress.
    </p>

    <div className="grid md:grid-cols-3 gap-8 mt-14">

      {/* CARD 1 */}
      <div className="rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200">
        <div className="h-14 w-14 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white text-2xl font-bold mb-5">
          ✍️
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Bloggers & Niche Site Owners</h3>
        <p className="text-sm text-slate-600">
          Create and publish SEO-optimized articles without hiring writers or wasting hours manually.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200">
        <div className="h-14 w-14 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#EA4335] to-[#FBBC05] text-white text-2xl font-bold mb-5">
          🏢
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Agencies & Teams</h3>
        <p className="text-sm text-slate-600">
          Manage unlimited WordPress sites, collaborate with clients, schedule posts and track performance.
        </p>
      </div>

      {/* CARD 3 */}
      <div className="rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-200">
        <div className="h-14 w-14 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#34A853] to-[#4285F4] text-white text-2xl font-bold mb-5">
          💸
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Affiliate Marketers & SEO</h3>
        <p className="text-sm text-slate-600">
          Scale publishing speed, get more organic traffic and focus on monetization instead of posting.
        </p>
      </div>
    </div>

    <div className="mt-10">
      <Link
        href="/signup"
        className="inline-flex items-center justify-center rounded-full bg-[#4285F4] px-8 py-3 text-sm font-semibold text-white shadow-md
        hover:bg-[#3367D6] transition"
      >
        Start free — no credit card
      </Link>
    </div>
  </div>
</section>

{/* ===== ABOUT SECTION ===== */}
<section id="about" className="bg-white border-b border-slate-200 py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
      About RankPost
    </h2>
    <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">
      RankPost is built for bloggers, niche site owners, agencies and affiliate
      marketers who want to publish high-quality WordPress articles faster and
      scale without hiring large teams. Automation saves hours so you can focus
      on growing traffic and revenue.
    </p>

    <div className="grid md:grid-cols-3 gap-8 mt-14">
      <div className="p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition">
        <h3 className="text-xl font-bold text-[#4285F4] mb-2">Our Mission</h3>
        <p className="text-sm text-slate-600">
          To make publishing content effortless and help creators scale using AI.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition">
        <h3 className="text-xl font-bold text-[#34A853] mb-2">Our Vision</h3>
        <p className="text-sm text-slate-600">
          Empower millions of WordPress publishers with automation and smart tools.
        </p>
      </div>

      <div className="p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition">
        <h3 className="text-xl font-bold text-[#FBBC05] mb-2">Our Values</h3>
        <p className="text-sm text-slate-600">
          Simplicity • Speed • Innovation • Customer-first approach.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* ===== FAQ ===== */}
<section id="faq" className="bg-white border-b border-slate-200">
  <div className="max-w-6xl mx-auto px-6 py-16">
    <div className="text-center max-w-2xl mx-auto mb-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
        Questions you might have.
      </h2>
      <p className="text-sm text-slate-500 mt-2">
        If you're serious about growing your sites, RankPost is built to
        remove every excuse not to publish.
      </p>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <FaqItem
        question="Will AI content created with RankPost actually rank in Google?"
        answer="Yes — RankPost is designed for SEO structure: headings, internal linking opportunities and natural language."
      />
      <FaqItem
        question="Do I need to be technical or know WordPress deeply?"
        answer="No. If you can log into WordPress, you can use RankPost."
      />
      <FaqItem
        question="Is my WordPress site safe when I connect it?"
        answer="RankPost uses official WordPress application passwords and never stores your main credentials."
      />
      <FaqItem
        question="Can I cancel or downgrade anytime?"
        answer="Yes. No contracts, no hidden fees."
      />
      <FaqItem
        question="Does RankPost work with multiple sites?"
        answer="Yes. Even on Pro you can connect multiple sites."
      />
      <FaqItem
        question="What if I'm not happy with the results?"
        answer="Cancel any time, no risk."
      />
    </div>
  </div>
</section>

{/* ===== CONTACT SECTION ===== */}
<section id="contact" className="bg-slate-50 border-b border-slate-200 py-24">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
      Contact us anytime
    </h2>
    <p className="text-lg text-slate-600 mt-3 max-w-2xl mx-auto">
      Have questions? We’re here to help. Our team usually responds within 30 minutes.
    </p>

    <div className="grid md:grid-cols-3 gap-8 mt-14">
      <div className="p-6 rounded-2xl border border-slate-200 bg-white text-center shadow-sm hover:shadow-lg transition">
        <h3 className="text-lg font-bold text-slate-900">💬 Live Chat</h3>
        <p className="text-sm text-slate-600 mt-2">Chat with support instantly</p>
        <p className="text-sm font-semibold mt-2 text-[#4285F4]">Available 24/7</p>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 bg-white text-center shadow-sm hover:shadow-lg transition">
        <h3 className="text-lg font-bold text-slate-900">📧 Email Support</h3>
        <a href="mailto:rankpostofficial@gmail.com" className="text-sm mt-2 block text-[#4285F4]">
          rankpostofficial@gmail.com
        </a>
      </div>

      <div className="p-6 rounded-2xl border border-slate-200 bg-white text-center shadow-sm hover:shadow-lg transition">
        <h3 className="text-lg font-bold text-slate-900">📱 WhatsApp</h3>
        <a
          href="https://wa.me/+923262791819"
          target="_blank"
          className="text-sm mt-2 block text-[#34A853]"
        >
          +923262791819
        </a>
      </div>
    </div>
  </div>
</section>


      {/* ===== FINAL CTA ===== */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Stop wasting hours posting manually.
          </h2>
          <p className="text-base text-slate-600 mt-3 max-w-xl mx-auto">
            Focus on growth — let RankPost handle the publishing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-[#4285F4] px-7 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#3367D6] transition"
            >
              Start free no credit card
            </Link>
            <span className="text-xs text-slate-500">
              It takes less than 60 seconds to connect your first site.
            </span>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ===== COMPONENTS ===== */

function TestimonialCard({ name, role, quote, imageSrc, accent }) {
  const accentRing =
    accent === "blue"
      ? "ring-[#4285F4]/40"
      : accent === "red"
      ? "ring-[#EA4335]/40"
      : accent === "green"
      ? "ring-[#34A853]/40"
      : "ring-slate-200";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between"
    >
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm leading-none">
            ★
          </span>
        ))}
      </div>

      <p className="text-sm text-slate-700 mb-4">{quote}</p>

      <div className="flex items-center gap-3 mt-2">
        <div className={`rounded-full ring-2 ${accentRing} p-[2px]`}>
          <Image
            src={imageSrc}
            alt={name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{name}</h4>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

function PricingCard({ title, price, subtext, features, popular, button }) {
  const colors = {
    Free: {
      bg: "bg-[#F3F4F6]",
      hover: "hover:bg-[#E5E7EB]",
      btn: "bg-[#111827] hover:bg-[#374151] text-white",
    },
    Pro: {
      bg: "bg-[#4285F4]",
      hover: "hover:bg-[#3367D6]",
      btn: "bg-white text-[#111827] hover:bg-[#FBBC05] hover:text-[#111827]",
    },
    Agency: {
      bg: "bg-[#34A853]",
      hover: "hover:bg-[#2E8C46]",
      btn: "bg-white text-[#111827] hover:bg-[#FBBC05] hover:text-[#111827]",
    },
  };

  const style = colors[title] ?? colors.Free;

  return (
    <div
      className={`rounded-2xl p-6 flex flex-col shadow-sm border border-transparent 
      transition-all duration-300 cursor-pointer
      ${style.bg} ${style.hover}
      hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)]`}
    >
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-xs font-semibold px-3 py-1 rounded-full">
          Most popular
        </span>
      )}

      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-4xl font-bold mt-2 text-white">{price}</p>
      <p className="text-sm text-white/90 mb-4">{subtext}</p>

      <ul className="space-y-2 text-sm text-white/95 flex-1">
        {features.map((f, i) => (
          <li key={i}>✓ {f}</li>
        ))}
      </ul>

      <button
        className={`mt-6 w-full py-2.5 rounded-full text-sm font-semibold transition duration-200 ${style.btn}`}
      >
        {button}
      </button>
    </div>
  );
}

function LiveAutomationCard() {
  const [mounted, setMounted] = useState(false);

  const steps = [
    { title: "Generating outline", subtitle: "Planning SEO headings and sections.", progress: 10 },
    { title: "Researching structure", subtitle: "Optimizing flow for search intent.", progress: 35 },
    { title: "Writing content", subtitle: "Creating 1200–1600 words of SEO content.", progress: 65 },
    { title: "Creating image", subtitle: "Designing a relevant featured image.", progress: 85 },
    { title: "Publishing", subtitle: "Pushing the post live to WordPress.", progress: 100 },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [dots, setDots] = useState(".");
  const [progress, setProgress] = useState(steps[0].progress);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % steps.length;
        setProgress(steps[next].progress);
        return next;
      });

      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 1400);

    return () => clearInterval(interval);
  }, [mounted]);

  if (!mounted) return null;

  const current = steps[currentStep];

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md
      shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.22)]
      hover:-translate-y-1 transition-all duration-200 p-6 space-y-5"
    >
      <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>
          Live simulation · Step {currentStep + 1} of {steps.length}
        </span>
        <span>{progress}%</span>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">
          {current.title}
          <span className="inline-block w-4">{dots}</span>
        </p>
        <p className="text-xs text-slate-600 mt-1">{current.subtitle}</p>
      </div>

      <div className="space-y-2 text-xs">
        {steps.map((step, index) => {
          const done = index < currentStep;
          const active = index === currentStep;

          return (
            <div
              key={step.title}
              className={`flex items-center gap-2 ${
                done ? "text-[#34A853]" : active ? "text-slate-900" : "text-slate-400"
              }`}
            >
              <span
                className={`h-4 w-4 rounded-full flex items-center justify-center text-[9px] border ${
                  done
                    ? "bg-[#34A853] text-white border-[#34A853]"
                    : active
                    ? "border-[#4285F4]"
                    : "border-slate-300"
                }`}
              >
                {done ? "✓" : index + 1}
              </span>
              <span className="truncate">{step.title}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 w-full h-2 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC05] transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-[11px] text-slate-500 font-medium pt-1">
        Turning a single keyword into a live WordPress article in under 40 seconds.
      </p>
    </div>
  );
}
/* ===== COMPONENTS ===== */

// FaqItem yahan rakhna hai, upar sab ke saath
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-900">{question}</h4>
        <span className="text-xl font-bold text-[#4285F4]">
          {open ? "−" : "+"}
        </span>
      </div>

      {open && (
        <p className="text-sm text-slate-600 mt-2">{answer}</p>
      )}
    </div>
  );
}
