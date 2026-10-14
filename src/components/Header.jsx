'use client';

import { useEffect, useState } from "react";
import moment from "moment";
import { Sparkles, Radio, Calendar, Flame } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(moment().format("dddd, MMMM Do YYYY"));
  }, []);

  return (
    <div className="border-b border-gray-150 bg-white">
      {/* Top Editorial Utility Bar */}
      <div className="w-11/12 mx-auto py-2 flex flex-wrap items-center justify-between text-[11px] text-gray-500 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
            <Radio className="w-3 h-3 animate-pulse text-red-600" />
            Live Dispatch
          </span>
          <span className="hidden sm:inline text-gray-400">•</span>
          <span className="hidden sm:inline font-medium">Issue #142 • Global Morning Edition</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{currentDate || "Loading edition date..."}</span>
          </div>

          <Link
            href="/pricing"
            className="hidden md:inline-flex items-center gap-1 font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Become a Pro Member</span>
          </Link>
        </div>
      </div>

      {/* Main Masthead */}
      <div className="w-11/12 mx-auto py-6 sm:py-8 flex flex-col items-center justify-center text-center">
        <div className="mb-2">
          <Link href="/" className="inline-block group">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-950 font-serif uppercase group-hover:text-red-600 transition-colors">
              The Dragon Dispatch
            </h1>
          </Link>
        </div>

        <p className="text-xs sm:text-sm font-medium tracking-wide text-gray-500 uppercase">
          Investigative Journalism • Intelligent Analysis • Without Fear or Favour
        </p>
      </div>
    </div>
  );
};

export default Header;