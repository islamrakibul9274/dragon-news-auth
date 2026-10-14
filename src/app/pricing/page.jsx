'use client';

import { useState, Suspense } from "react";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import { Check, Crown, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function PricingContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");
  const [loadingPlan, setLoadingPlan] = useState("");

  const handleCheckout = async (planKey) => {
    setLoadingPlan(planKey);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Unable to initiate Stripe checkout.");
      }
    } catch (err) {
      alert("Checkout error: " + err.message);
    } finally {
      setLoadingPlan("");
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-white text-gray-900 pb-20">
      <Header />
      <Navbar />

      <main className="w-11/12 max-w-6xl mx-auto pt-12">
        {/* Success Banner */}
        {success && (
          <div className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl flex items-center gap-4 text-emerald-900 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="font-black text-lg">
                Welcome to The Dragon Dispatch Pro!
              </h3>
              <p className="text-sm text-emerald-800">
                Your payment was successful. You now have unlimited AI executive briefings and full investigative access.
              </p>
            </div>
          </div>
        )}

        {canceled && (
          <div className="mb-8 p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl text-xs font-semibold text-amber-800">
            Checkout was canceled. Feel free to review our membership options anytime.
          </div>
        )}

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-extrabold uppercase tracking-wider mb-4">
            <Crown className="w-4 h-4 text-amber-600" />
            Independent Reader-Supported Journalism
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-950 font-serif tracking-tight mb-4">
            Invest in intelligence that cuts through the noise.
          </h1>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Choose the tier that matches your curiosity. Every subscription directly funds investigative reporting and high-speed AI synthesis.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Free Tier */}
          <div className="p-8 bg-gray-50 border-2 border-gray-200 rounded-3xl flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
                Free Edition
              </span>
              <h3 className="text-2xl font-black text-gray-950 mt-1 mb-2 font-serif">
                Curious Reader
              </h3>
              <p className="text-xs text-gray-600 mb-6 font-medium">
                Essential daily news curated every morning.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-gray-950">$0</span>
                <span className="text-xs text-gray-500 font-semibold">/forever</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-700 mb-8 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Daily Morning Intelligence Dispatch</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Standard headline access</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Join reader comment discussions</span>
                </li>
              </ul>
            </div>

            <button
              disabled
              className="w-full py-3.5 bg-gray-200 text-gray-600 font-bold text-xs rounded-2xl cursor-default"
            >
              Current Access
            </button>
          </div>

          {/* Pro Monthly Tier - Redesigned Light Card */}
          <div className="p-8 bg-gradient-to-b from-red-50/90 via-white to-red-50/40 text-gray-950 border-2 border-red-600 rounded-3xl flex flex-col justify-between relative shadow-xl scale-102">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-red-600 text-white font-extrabold text-[11px] uppercase tracking-wider rounded-full shadow-md">
              Most Popular
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-red-600">
                Pro Access
              </span>
              <h3 className="text-2xl font-black text-gray-950 mt-1 mb-2 font-serif">
                Dragon Insider
              </h3>
              <p className="text-xs text-gray-600 mb-6 font-medium">
                For founders, analysts, and decision-makers who need an edge.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-gray-950">$9</span>
                <span className="text-xs text-gray-600 font-semibold">/month</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-800 mb-8 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span><strong className="text-gray-950 font-bold">Unlimited Groq AI Executive Briefings</strong></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Instant Audio Narration (Text-To-Speech)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Weekly Investigative Deep Dives</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Ad-free distraction-free reader mode</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span>Access to AI Newsletter Studio</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout("pro_monthly")}
              disabled={loadingPlan === "pro_monthly"}
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 disabled:opacity-50"
            >
              {loadingPlan === "pro_monthly" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Subscribe with Stripe ($9/mo)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Founding Tier */}
          <div className="p-8 bg-gradient-to-br from-amber-50/80 via-white to-amber-100/50 border-2 border-amber-300 rounded-3xl flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
                Annual Patron
              </span>
              <h3 className="text-2xl font-black text-gray-950 mt-1 mb-2 font-serif">
                Founding Member
              </h3>
              <p className="text-xs text-gray-600 mb-6 font-medium">
                Direct patron supporting uncompromising journalism.
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-gray-950">$89</span>
                <span className="text-xs text-gray-600 font-semibold">/year (save 18%)</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-800 mb-8 font-medium">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>All Dragon Insider Pro benefits</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Founding Patron profile badge</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Quarterly live editorial strategy calls</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Annual print compendium of best investigations</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleCheckout("founding_yearly")}
              disabled={loadingPlan === "founding_yearly"}
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-2 shadow-md shadow-amber-600/20 disabled:opacity-50"
            >
              {loadingPlan === "founding_yearly" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Join as Founding Member</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading plans...</div>}>
      <PricingContent />
    </Suspense>
  );
}
