"use client";

import { Shield, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links array
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/solutions" },
    { name: "Services", href: "/services" },
    { name: "Partner Net", href: "/partner-net" },
    { name: "Contact", href: "/contact" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <nav className="w-full bg-white shadow-lg">
      <div className="max-w-[1280px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-[#ff6b35] rounded-xl p-2 flex items-center justify-center shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ThreatCure</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-gray-700 hover:text-[#ff6b35] transition-all font-medium hover:scale-[1.05]"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="border border-[#ff6b35] text-[#ff6b35] px-5 py-2 rounded-xl hover:bg-[#ff6b35] hover:text-white transition-all shadow-sm">
              <Link href={"/signin"}>Sign In</Link>
            </button>
            <button className="bg-[#ff6b35] text-white px-6 py-2 rounded-xl hover:bg-[#ff5722] transition-all shadow-md">
          <Link href={"/signup"}>Sign Up</Link>
            </button>
            <button className="bg-white border border-[#ff6b35] text-[#ff6b35] px-5 py-2 rounded-xl hover:bg-[#ff6b35] hover:text-white transition-all shadow-sm">
         <Link href={"/demo"}>Demo</Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className="text-gray-700 hover:text-[#ff6b35] transition-all font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <button className="border border-[#ff6b35] text-[#ff6b35] px-5 py-2 rounded-xl hover:bg-[#ff6b35] hover:text-white transition-all shadow-sm w-full">
              <Link href={"/signin"} onClick={() => setMobileMenuOpen(false)}>
                Sign In
              </Link>
            </button>
            <button className="bg-[#ff6b35] text-white px-6 py-2 rounded-xl hover:bg-[#ff5722] transition-all  cursor-pointer shadow-md w-full">
             <Link href={"/signup"} onClick={() => setMobileMenuOpen(false)}>
                Sign Up
              </Link>
            </button>
            <button className="bg-white border border-[#ff6b35] text-[#ff6b35] px-5 py-2 rounded-xl hover:bg-[#ff6b35] hover:text-white transition-all shadow-sm w-full">
              Demo
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}