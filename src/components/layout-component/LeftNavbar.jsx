'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Layers, Sparkles, TrendingUp } from "lucide-react";
import { defaultCategories } from "../../data/newsData";

const categoryIcons = {
  "01": "⚡",
  "02": "📰",
  "03": "🌍",
  "04": "🏆",
  "05": "🎬",
  "06": "🎨",
  "07": "🏛️",
  "08": "🌐",
};

const LeftNavbar = () => {
  const [categories, setCategories] = useState(defaultCategories);
  const pathname = usePathname();

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((result) => result.json())
      .then((data) => {
        if (data?.data?.news_category && Array.isArray(data.data.news_category)) {
          setCategories(data.data.news_category);
        }
      })
      .catch((error) => console.error("Using default categories:", error));
  }, []);

  return (
    <div className="space-y-6">
      {/* Category Navigation */}
      <div className="bg-white rounded-2xl p-4 border-2 border-gray-200/80 shadow-xs">
        <div className="flex items-center gap-2 mb-3 px-2">
          <Layers className="w-4 h-4 text-red-600" />
          <h3 className="font-bold text-gray-950 text-sm tracking-tight">
            Editorial Sections
          </h3>
        </div>

        <div className="flex flex-col gap-1">
          {categories.map((category) => {
            const isActive =
              pathname === `/category/${category.category_id}` ||
              (pathname === "/" && category.category_id === "01");

            const icon = categoryIcons[category.category_id] || "📌";

            return (
              <Link
                href={`/category/${category.category_id}`}
                key={category.category_id}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-red-600 text-white shadow-sm shadow-red-600/30"
                    : "text-gray-700 hover:text-black hover:bg-gray-100"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{icon}</span>
                  <span>{category.category_name}</span>
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Trending Newsroom Tags */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-2.5 px-1">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider">
            Trending Threads
          </h4>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {["#AIRevolutions", "#GlobalElections", "#EnergyTransition", "#VenturePulse", "#Semiconductors", "#DeepSeek"].map(
            (tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-red-400 hover:text-red-600 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Dispatch Schedule Badge - Light Card */}
      <div className="p-4 bg-gradient-to-br from-red-50 to-amber-50/70 border border-red-200/80 rounded-2xl text-xs text-gray-900">
        <div className="flex items-center gap-2 mb-1.5 text-red-700 font-bold">
          <Sparkles className="w-4 h-4 text-red-600" />
          <span>Daily Dispatch Cycle</span>
        </div>
        <p className="text-gray-600 text-[11px] leading-relaxed">
          Morning Edition drops at <strong className="text-gray-900">6:00 AM EST</strong>. Evening Intelligence Briefing at <strong className="text-gray-900">5:30 PM EST</strong>.
        </p>
      </div>
    </div>
  );
};

export default LeftNavbar;