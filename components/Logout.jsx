"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { logout } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) return;
    
    setLoading(true);
    
    try {
      await logout();
      router.push("/partner-net");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <LogOut size={18} />
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
