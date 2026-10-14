'use client';

import { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthContext } from "../provider/AuthProvider";
import { Search, Bookmark, Sparkles, LogOut, Menu, X, Crown } from "lucide-react";
import SearchModal from "./SearchModal";
import BookmarksModal from "./BookmarksModal";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("dragon_bookmarks") || "[]");
        setBookmarkCount(saved.length);
      } catch {
        setBookmarkCount(0);
      }
    };
    updateCount();
    window.addEventListener("storage", updateCount);
    return () => window.removeEventListener("storage", updateCount);
  }, [isBookmarksOpen]);

  const navLinks = [
    { name: "Top Stories", href: "/" },
    { name: "AI Studio", href: "/studio", highlight: true },
    { name: "Membership", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Careers", href: "/career" },
  ];

  return (
    <>
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-gray-150 transition-all shadow-2xs">
        <div className="w-11/12 mx-auto flex items-center justify-between h-14">
          {/* Left Brand / Nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="font-serif font-black text-xl tracking-tight text-gray-950 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block animate-pulse"></span>
              <span>THE DISPATCH</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                      link.highlight
                        ? "text-amber-800 bg-amber-100/70 hover:bg-amber-200/80"
                        : isActive
                        ? "bg-red-50 text-red-600 font-extrabold"
                        : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
                    }`}
                  >
                    {link.highlight && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center gap-2 transition-colors border border-gray-200"
              title="Search news (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-gray-600" />
              <span className="hidden sm:inline text-gray-600">Search</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-gray-300 text-gray-500">
                ⌘K
              </kbd>
            </button>

            {/* Reading List Trigger */}
            <button
              onClick={() => setIsBookmarksOpen(true)}
              className="relative p-2 rounded-xl text-gray-700 hover:text-gray-950 hover:bg-gray-100 transition-colors"
              title="Saved reading list"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* VIP Pro Pill - Vibrant Light Accent */}
            <Link
              href="/pricing"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs shadow-md shadow-amber-500/25 transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>Go Pro</span>
            </Link>

            {/* User Auth */}
            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <img
                  src={user.photoURL || "/assets/user.png"}
                  alt={user.displayName || "User"}
                  className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/user.png";
                  }}
                />
                <button
                  onClick={logOut}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-gray-100 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/25"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-150 bg-white p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-100"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-bold text-amber-700 bg-amber-50"
            >
              👑 Dragon Pro Membership
            </Link>
          </div>
        )}
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <BookmarksModal isOpen={isBookmarksOpen} onClose={() => setIsBookmarksOpen(false)} />
    </>
  );
};

export default Navbar;