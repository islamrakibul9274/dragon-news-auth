'use client';

import { useContext, useEffect } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import Loading from "./Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || !user.email)) {
      router.push(`/auth/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <Loading />;
  }

  if (user && user.email) {
    return children;
  }

  return <Loading />;
};

export default PrivateRoute;
