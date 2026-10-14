'use client';

import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const SocialLogin = () => {
  const { user, logOut, googleLogin, githubLogin } = useContext(AuthContext);

  const handleGoogle = () => {
    if (googleLogin) {
      googleLogin().catch((err) => console.error("Google Login error:", err));
    }
  };

  const handleGithub = () => {
    if (githubLogin) {
      githubLogin().catch((err) => console.error("GitHub Login error:", err));
    }
  };

  if (user) {
    return (
      <div className="bg-white p-5 rounded-3xl border-2 border-gray-200/80 shadow-xs">
        <h3 className="font-black text-gray-950 mb-3 text-sm tracking-tight flex items-center justify-between">
          <span>Active Reader Account</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user.photoURL || "/assets/user.png"}
            alt={user.displayName || "User"}
            className="w-10 h-10 rounded-full border-2 border-red-500 object-cover"
            onError={(e) => {
              e.currentTarget.src = "/assets/user.png";
            }}
          />
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-gray-900 text-sm truncate">
              {user.displayName || "Reader"}
            </h4>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logOut}
          className="btn w-full bg-gray-100 hover:bg-gray-200 text-gray-800 border-none rounded-xl text-xs font-bold py-2 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-3xl border-2 border-gray-200/80 shadow-xs">
      <h3 className="font-black text-gray-950 mb-3 text-sm tracking-tight">
        Instant Reader Sign-In
      </h3>

      <div className="space-y-2.5">
        {/* Google */}
        <button
          onClick={handleGoogle}
          className="btn w-full bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 rounded-xl flex items-center justify-center gap-2.5 shadow-2xs font-semibold text-xs py-2.5"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* GitHub */}
        <button
          onClick={handleGithub}
          className="btn w-full bg-gray-900 hover:bg-black text-white border-none rounded-xl flex items-center justify-center gap-2.5 shadow-sm font-semibold text-xs py-2.5"
        >
          <svg
            aria-label="GitHub logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
            ></path>
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;