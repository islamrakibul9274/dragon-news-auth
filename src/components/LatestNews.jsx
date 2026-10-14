'use client';

import Marquee from "react-fast-marquee";
import Link from "next/link";
import { useEffect, useState } from "react";

const LatestNews = () => {
  const [headlines, setHeadlines] = useState([
    {
      id: "0282e0e58a5c404fbd15261f11c2ab6a",
      title: "Biden Pledges Nearly $3 Billion To Ukraine In Largest U.S. Military Aid Package Yet",
    },
    {
      id: "1",
      title: "Tucker Carlson Swears Vladimir Putin Is Winning The War In Ukraine",
    },
    {
      id: "2",
      title: "Global Tech Giants Announce Major Breakthroughs in Clean Energy AI",
    },
  ]);

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
      .catch((err) => console.error("Ticker fetch error:", err));
  }, []);

  return (
    <div className="flex gap-2 justify-center items-center bg-base-300 p-3">
      <p className="bg-[#D72050] text-white px-3 py-1 font-semibold text-sm">
        Latest
      </p>

      <Marquee pauseOnHover={true} speed={70} className="space-x-10 text-gray-800 font-medium">
        {headlines.map((item, index) => (
          <Link
            key={index}
            href={`/news/${item.id}`}
            className="hover:text-[#D72050] transition-colors mx-4"
          >
            {item.title}
          </Link>
        ))}
      </Marquee>
    </div>
  );
};

export default LatestNews;