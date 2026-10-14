'use client';

import { createContext, useEffect, useState } from "react";
import auth, { isFirebaseConfigured } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const LOCAL_STORAGE_KEY = "dragon_auth_user";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial session restoration & Firebase listener
  useEffect(() => {
    // 1. Check local session storage first
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // storage unavailable
    }

    // 2. If valid Firebase is configured, listen to real Firebase auth
    let unsubscribe = () => {};
    if (isFirebaseConfigured) {
      try {
        unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
            try {
              localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify({
                  uid: currentUser.uid,
                  email: currentUser.email,
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL,
                })
              );
            } catch {}
          } else {
            try {
              const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
              if (!stored) setUser(null);
            } catch {}
          }
          setLoading(false);
        });
      } catch {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const createNewUser = async (email, password) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        return await createUserWithEmailAndPassword(auth, email, password);
      }
      throw new Error("LocalMode");
    } catch (err) {
      const isInvalidKey =
        !isFirebaseConfigured ||
        err?.code === "auth/api-key-not-valid" ||
        err?.code === "auth/invalid-api-key" ||
        err?.message?.includes("api-key-not-valid") ||
        err?.message === "LocalMode";

      if (isInvalidKey) {
        const localUser = {
          uid: "usr_" + Math.random().toString(36).substring(2, 10),
          email,
          displayName: email.split("@")[0],
          photoURL: "/assets/user.png",
          isLocalDemo: true,
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localUser));
        } catch {}
        setUser(localUser);
        return { user: localUser };
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        return await signInWithEmailAndPassword(auth, email, password);
      }
      throw new Error("LocalMode");
    } catch (err) {
      const isInvalidKey =
        !isFirebaseConfigured ||
        err?.code === "auth/api-key-not-valid" ||
        err?.code === "auth/invalid-api-key" ||
        err?.message?.includes("api-key-not-valid") ||
        err?.message === "LocalMode";

      if (isInvalidKey) {
        let existingUser = null;
        try {
          const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.email === email) existingUser = parsed;
          }
        } catch {}

        const localUser = existingUser || {
          uid: "usr_" + Math.random().toString(36).substring(2, 10),
          email,
          displayName: email.split("@")[0],
          photoURL: "/assets/user.png",
          isLocalDemo: true,
        };

        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localUser));
        } catch {}
        setUser(localUser);
        return { user: localUser };
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        return await signInWithPopup(auth, googleProvider);
      }
      throw new Error("LocalMode");
    } catch (err) {
      const isInvalidKey =
        !isFirebaseConfigured ||
        err?.code === "auth/api-key-not-valid" ||
        err?.code === "auth/invalid-api-key" ||
        err?.code === "auth/popup-closed-by-user" ||
        err?.message?.includes("api-key-not-valid") ||
        err?.message === "LocalMode";

      if (isInvalidKey) {
        const localUser = {
          uid: "usr_google_" + Date.now(),
          email: "reader.google@dragonnews.com",
          displayName: "Google Reader",
          photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
          isLocalDemo: true,
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localUser));
        } catch {}
        setUser(localUser);
        return { user: localUser };
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        return await signInWithPopup(auth, githubProvider);
      }
      throw new Error("LocalMode");
    } catch (err) {
      const isInvalidKey =
        !isFirebaseConfigured ||
        err?.code === "auth/api-key-not-valid" ||
        err?.code === "auth/invalid-api-key" ||
        err?.code === "auth/popup-closed-by-user" ||
        err?.message?.includes("api-key-not-valid") ||
        err?.message === "LocalMode";

      if (isInvalidKey) {
        const localUser = {
          uid: "usr_github_" + Date.now(),
          email: "dev.github@dragonnews.com",
          displayName: "GitHub Reader",
          photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
          isLocalDemo: true,
        };
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localUser));
        } catch {}
        setUser(localUser);
        return { user: localUser };
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setUser(null);
      if (isFirebaseConfigured) {
        await signOut(auth);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      if (auth.currentUser && isFirebaseConfigured) {
        await updateProfile(auth.currentUser, updatedData);
      }
    } catch {}

    setUser((prev) => {
      const next = { ...(prev || {}), ...updatedData };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const authInfo = {
    user,
    loading,
    setUser,
    createNewUser,
    loginUser,
    googleLogin,
    githubLogin,
    logOut,
    updateUserProfile,
    isFirebaseConfigured,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;