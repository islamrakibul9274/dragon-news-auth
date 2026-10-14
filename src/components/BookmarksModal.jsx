'use client';

import { useState, useEffect } from "react";
import { Bookmark, X, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BookmarksModal({ isOpen, onClose }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = JSON.parse(localStorage.getItem("dragon_bookmarks") || "[]");
        setBookmarks(saved);
      } catch {
        setBookmarks([]);
      }
    }
  }, [isOpen]);

  const handleRemove = (id) => {
    const filtered = bookmarks.filter((item) => item._id !== id);
    setBookmarks(filtered);
    localStorage.setItem("dragon_bookmarks", JSON.stringify(filtered));
  };

  const handleClearAll = () => {
    setBookmarks([]);
    localStorage.removeItem("dragon_bookmarks");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-150 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-150">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-red-100 text-red-600 rounded-lg">
              <Bookmark className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-gray-900 text-base">
              My Reading List ({bookmarks.length})
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {bookmarks.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4">
          {bookmarks.length > 0 ? (
            <div className="space-y-3">
              {bookmarks.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image_url || "/assets/demo-card-thumbnail.png"}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <Link
                        href={`/news/${item._id}`}
                        onClick={onClose}
                        className="text-sm font-semibold text-gray-900 hover:text-red-600 line-clamp-1 block transition-colors"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {item.author?.name || "By Editorial Desk"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/news/${item._id}`}
                      onClick={onClose}
                      className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-white transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-white transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-gray-400">
              <Bookmark className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p>Your reading list is empty.</p>
              <p className="text-xs mt-1 text-gray-400">
                Click the bookmark icon on any dispatch to save it for later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
