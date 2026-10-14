'use client';

import Marquee from "react-fast-marquee";
import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultNews } from "../data/newsData";

const LatestNews = () => {
  const [headlines, setHeadlines] = useState(
    defaultNews.slice(0, 5).map((n) => ({ id: n._id, title: n.title }))
  );

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/news/category/01")
      .then((res) => res.json())
      .then((data) => {
        if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
          setHeadlines(
            data.data.slice(0, 6).map((item) => ({
              id: item._id,
              title: item.title,
            }))
          );
        }
      })
      .catch((err) => console.error("Using default ticker:", err));
  }, []);

  return (
    <div className="flex items-center gap-3 bg-red-50/70 border-2 border-red-200/80 p-2.5 rounded-2xl shadow-2xs">
      <span className="bg-red-600 text-white px-3.5 py-1.5 font-black text-xs uppercase tracking-wider rounded-xl shadow-sm flex-shrink-0">
        Breaking
      </span>

      <Marquee pauseOnHover={true} speed={65} className="space-x-12 text-gray-900 font-semibold text-xs sm:text-sm">
        {headlines.map((item, index) => (
          <Link
            key={index}
            href={`/news/${item.id}`}
            className="hover:text-red-600 transition-colors mx-6 flex items-center gap-2"
          >
            <span>•</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default LatestNews;