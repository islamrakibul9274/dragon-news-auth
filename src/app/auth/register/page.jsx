'use client';

import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "../../../provider/AuthProvider";

export default function RegisterPage() {
  const { createNewUser, setUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError({});
    const form = new FormData(e.target);
    const name = form.get("name")?.toString().trim();
    const photo = form.get("photo")?.toString().trim() || "";
    const email = form.get("email")?.toString().trim();
    const password = form.get("password")?.toString();

    if (!name || name.length < 5) {
      setError({ name: "Name must be at least 5 characters long." });
      return;
    }

    if (!password || password.length < 6) {
      setError({ password: "Password must be at least 6 characters long." });
      return;
    }

    setLoading(true);

    try {
      const result = await createNewUser(email, password);
      const user = result.user;
      setUser(user);

      if (updateUserProfile) {
        await updateUserProfile({ displayName: name, photoURL: photo });
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setError({ general: err.message || "Failed to create account" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center py-8">
      <form
        onSubmit={handleRegister}
        className="p-8 md:p-10 w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-lg"
      >
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Register your Account
        </h3>
        <hr className="border-gray-200 mb-6" />

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Your Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white"
              placeholder="Enter your full name"
            />
            {error.name && (
              <p className="text-xs text-red-500 mt-1">{error.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-semibold text-gray-700 mb-1">
              Photo URL (Optional)
            </label>
            <input
              id="photo"
              name="photo"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black text-gray-900 bg-white"
              placeholder="Create a strong password"
            />
            {error.password && (
              <p className="text-xs text-red-500 mt-1">{error.password}</p>
            )}
          </div>

          {error.general && (
            <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
              {error.general}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-neutral-900 hover:bg-black text-white font-medium rounded transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-600 pt-2">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-red-500 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
