"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasPartnerSession, hasSigninFlow, getSigninFlow } from "../lib/auth";

// Loading spinner component
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-400">Verifying access...</p>
      </div>
    </div>
  );
}

// Protected route for VIDEOS page (requires full partner session)
export function ProtectedVideosRoute({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (hasPartnerSession()) {
        setIsAuthorized(true);
        setIsLoading(false);
      } else {
        router.replace("/partner-net");
      }
    };

    // Small delay to ensure cookies are read properly
    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthorized) return null;
  
  return children;
}

// Protected route for SET-PASSWORD page
export function ProtectedSetPasswordRoute({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Already logged in? Go to videos
      if (hasPartnerSession()) {
        router.replace("/partner-net/videos");
        return;
      }

      // Check signin flow
      const signinFlow = getSigninFlow();
      
      if (!signinFlow) {
        router.replace("/partner-net");
        return;
      }

      // Must be in set-password mode
      if (signinFlow.mode !== "set-password") {
        router.replace("/partner-net/compare-password");
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthorized) return null;
  
  return children;
}

// Protected route for COMPARE-PASSWORD page
export function ProtectedComparePasswordRoute({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Already logged in? Go to videos
      if (hasPartnerSession()) {
        router.replace("/partner-net/videos");
        return;
      }

      // Check signin flow
      const signinFlow = getSigninFlow();
      
      if (!signinFlow) {
        router.replace("/partner-net");
        return;
      }

      // Must be in compare-password mode
      if (signinFlow.mode !== "compare-password") {
        router.replace("/partner-net/set-password");
        return;
      }

      setIsAuthorized(true);
      setIsLoading(false);
    };

    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [router]);

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthorized) return null;
  
  return children;
}
