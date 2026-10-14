'use client';

import { useState, useEffect } from "react";
import { Search, X, ArrowRight, Clock, Loader2 } from "lucide-react";
import Link from "next/link";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch("https://openapi.programming-hero.com/api/news/category/01");
        const data = await res.json();
        if (data?.data) {
          const q = query.toLowerCase();
          const filtered = data.data.filter(
            (item) =>
              item.title?.toLowerCase().includes(q) ||
              item.details?.toLowerCase().includes(q)
          );
          setResults(filtered.slice(0, 6));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-150 overflow-hidden">
        {/* Search Input */}
        <div className="relative flex items-center px-4 border-b border-gray-150">
          <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, topics, executive briefings..."
            className="w-full py-4 text-base bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400"
          />
          {loading && <Loader2 className="w-4 h-4 text-red-600 animate-spin mr-2" />}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto p-3">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item) => (
                <Link
                  key={item._id}
                  href={`/news/${item._id}`}
                  onClick={onClose}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <img
                    src={item.image_url || "/assets/demo-card-thumbnail.png"}
                    alt={item.title}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0 bg-gray-100"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                      {item.details}
                    </p>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {item.author?.published_date || "Today"}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-colors flex-shrink-0 mt-2" />
                </Link>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="py-8 text-center text-sm text-gray-400">
              No articles found matching &quot;{query}&quot;
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-gray-400">
              Type at least 2 characters to search across all stories...
            </div>
          )}
        </div>

        <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span>Tip: Press ESC to close</span>
          <span>The Dragon Dispatch Intelligence Archive</span>
        </div>
      </div>
    </div>
  );
}
