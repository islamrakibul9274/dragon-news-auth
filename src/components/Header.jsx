'use client';

import { useEffect, useState } from "react";
import moment from "moment";
import { Sparkles, Radio, Calendar } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    setCurrentDate(moment().format("dddd, MMMM Do YYYY"));
  }, []);

  return (
    <header className="bg-white text-gray-900 border-b border-gray-200 shadow-2xs">
      {/* Top Editorial Utility Bar */}
      <div className="w-11/12 mx-auto py-2.5 flex flex-wrap items-center justify-between text-[11px] text-gray-500 border-b border-gray-150">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-black uppercase tracking-wider text-white bg-red-600 px-2.5 py-0.5 rounded-full shadow-2xs">
            <Radio className="w-3 h-3 animate-pulse text-white" />
            Live Dispatch
          </span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span className="hidden sm:inline font-semibold text-gray-600">
            Issue #142 • Global Morning Edition
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-medium text-gray-600">
            <Calendar className="w-3.5 h-3.5 text-red-600" />
            <span>{currentDate || "Loading edition date..."}</span>
          </div>

          <Link
            href="/pricing"
            className="hidden md:inline-flex items-center gap-1.5 font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Become a Pro Member</span>
          </Link>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="w-11/12 mx-auto py-7 sm:py-9 flex flex-col items-center justify-center text-center">
        <div className="mb-2">
          <Link href="/" className="inline-block group">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-950 font-serif uppercase group-hover:text-red-600 transition-colors drop-shadow-2xs">
              The Dragon Dispatch
            </h1>
          </Link>
        </div>

        <p className="text-xs sm:text-sm font-semibold tracking-widest text-gray-500 uppercase mt-1">
          Investigative Journalism <span className="text-red-600">•</span> Intelligent Analysis <span className="text-red-600">•</span> Without Fear or Favour
        </p>
      </div>
    </header>
  );
};

export default Header;