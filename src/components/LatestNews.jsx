'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { defaultNews } from "../data/newsData";

export default function LatestNews() {
  const [mounted, setMounted] = useState(false);
  const [headlines, setHeadlines] = useState(
    defaultNews.map((n) => ({ id: n._id, title: n.title }))
  );

  useEffect(() => {
    setMounted(true);
    fetch("https://openapi.programming-hero.com/api/news/category/01")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setHeadlines(
            data.data.slice(0, 8).map((item) => ({
              id: item._id,
              title: item.title,
            }))
          );
        }
      })
      .catch(() => {
        // Fallback already populated with defaultNews
      });
  }, []);

  return (
    <div className="flex items-center gap-3 bg-red-50/90 border-2 border-red-200/90 p-2 sm:p-2.5 rounded-2xl shadow-2xs w-full overflow-hidden">
      {/* Breaking Badge */}
      <div className="flex items-center gap-1.5 bg-[#D72050] text-white px-3.5 py-1.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-sm flex-shrink-0 z-10">
        <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block"></span>
        <span>Breaking</span>
      </div>

      {/* Marquee Loop Container - min-w-0 flex-1 is critical for flexbox overflow */}
      <div className="flex-1 min-w-0 overflow-hidden py-0.5">
        {mounted ? (
          <Marquee
            pauseOnHover={true}
            speed={65}
            gradient={false}
            autoFill={true}
            className="flex items-center overflow-hidden"
          >
            {headlines.map((item, index) => (
              <Link
                key={index}
                href={`/news/${item.id}`}
                className="hover:text-[#D72050] transition-colors mx-8 text-gray-900 font-bold text-xs sm:text-sm whitespace-nowrap inline-flex items-center gap-2.5"
              >
                <span className="text-[#D72050] text-base font-black">•</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </Marquee>
        ) : (
          <div className="flex items-center gap-8 whitespace-nowrap overflow-hidden text-xs sm:text-sm font-bold text-gray-900">
            {headlines.slice(0, 4).map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-2">
                <span className="text-[#D72050] font-black">•</span>
                <span>{item.title}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}