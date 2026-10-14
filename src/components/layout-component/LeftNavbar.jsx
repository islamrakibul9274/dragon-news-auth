'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftNavbar = () => {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/news/categories")
      .then((result) => result.json())
      .then((data) => {
        if (data?.data?.news_category) {
          setCategories(data.data.news_category);
        }
      })
      .catch((error) => console.error("Error loading categories:", error));
  }, []);

  return (
    <div>
      <h2 className="font-semibold text-lg mb-3">All Category ({categories.length})</h2>
      <div className="flex flex-col gap-2">
        {categories.map((category) => {
          const isActive =
            pathname === `/category/${category.category_id}` ||
            (pathname === "/" && category.category_id === "01");

          return (
            <Link
              href={`/category/${category.category_id}`}
              key={category.category_id}
              className={`btn justify-start text-left normal-case border-none transition-all ${
                isActive
                  ? "bg-[#E7e7e7] text-black font-bold shadow-xs"
                  : "bg-transparent text-gray-500 hover:bg-gray-100"
              }`}
            >
              {category.category_name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default LeftNavbar;