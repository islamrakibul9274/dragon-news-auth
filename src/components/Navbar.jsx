'use client';

import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center py-2">
      <div className="text-sm font-medium text-gray-600">
        {user?.displayName || user?.email || ""}
      </div>

      <div className="nav space-x-6 text-gray-700 font-medium">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <Link href="/about" className="hover:text-black transition-colors">
          About
        </Link>
        <Link href="/career" className="hover:text-black transition-colors">
          Career
        </Link>
      </div>

      <div className="login flex gap-3 items-center">
        <div>
          {user && (user.photoURL || user.email) ? (
            <div className="flex items-center gap-2">
              <img
                className="w-10 h-10 rounded-full object-cover border border-gray-300"
                src={user.photoURL || "/assets/user.png"}
                alt={user.displayName || "User"}
                onError={(e) => {
                  e.currentTarget.src = "/assets/user.png";
                }}
              />
              <span className="text-sm font-semibold hidden md:inline">
                {user.displayName || user.email.split("@")[0]}
              </span>
            </div>
          ) : (
            <img
              className="w-10 h-10 rounded-full"
              src="/assets/user.png"
              alt="Default User"
            />
          )}
        </div>

        {user ? (
          <button
            onClick={logOut}
            className="btn btn-neutral rounded-none text-white px-6"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/auth/login"
            className="btn btn-neutral rounded-none text-white px-6"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;