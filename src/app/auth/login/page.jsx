'use client';

import { useContext, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "../../../provider/AuthProvider";

function LoginForm() {
  const { loginUser, isFirebaseConfigured } = useContext(AuthContext);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError({});
    setLoading(true);

    try {
      await loginUser(email, password);
      router.push(redirectUrl);
    } catch (err) {
      console.error(err);
      setError({ login: err.message || err.code || "Failed to login" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center py-8">
      <form
        onSubmit={handleLogin}
        className="p-8 md:p-10 w-full max-w-md bg-white border border-gray-200 shadow-sm rounded-lg"
      >
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
          Login your Account
        </h3>

        {!isFirebaseConfigured && (
          <div className="mb-5 p-3 bg-amber-50 border border-amber-200/90 rounded-xl text-amber-900 text-xs flex items-start gap-2.5">
            <span className="text-sm">⚡</span>
            <div>
              <p className="font-bold text-[11px] uppercase tracking-wider text-amber-800">
                Instant Sandbox Auth
              </p>
              <p className="text-amber-800 text-[11px] leading-relaxed mt-0.5">
                Sign in with any credentials to test immediately. To link your live Firebase cloud project, add your keys to <code className="bg-amber-100/80 px-1 py-0.5 rounded font-mono text-[10px]">.env.local</code>.
              </p>
            </div>
          </div>
        )}

        <hr className="border-gray-200 mb-6" />

        <div className="space-y-4">
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
              placeholder="Enter your password"
            />
          </div>

          {error.login && (
            <p className="text-xs text-red-600 bg-red-50 p-2 rounded">
              {error.login}
            </p>
          )}

          <div className="text-sm">
            <a href="#" className="text-gray-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-neutral-900 hover:bg-black text-white font-medium rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600 pt-2">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-red-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
