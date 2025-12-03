"use client";
import { useEffect, useRef, useState } from "react";
import VANTA from "vanta/dist/vanta.fog.min"; 
import * as THREE from "three";
import { Shield } from "lucide-react";

export default function SignInPage() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        VANTA({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xffa726,
          midtoneColor: 0xffffff,
          lowlightColor: 0x0a0a0a,
          baseColor: 0x000000,
          blurFactor: 0.45,
          speed: 1.5,
          zoom: 1.2
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="h-screen w-full flex items-center flex-col space-y-4 justify-center relative"
    >
      {/* Logo */}
      <div className="flex justify-center gap-3">
        <div className="bg-[#ff6b35] rounded-xl p-2 flex items-center justify-center shadow-sm">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <span className="text-5xl font-bold text-white">ThreatCure</span>
      </div>

      {/* SIGN IN CARD */}
      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/20 w-[380px] z-10">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Sign In
        </h1>

        <form className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Partner Net Id"
            className="p-3 rounded-lg bg-white/10 text-white outline-none border border-white/20 placeholder-gray-300 focus:border-orange-400 transition-colors"
          />

          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white/10 text-white outline-none border border-white/20 placeholder-gray-300 focus:border-orange-400 transition-colors"
          />

          {/* <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/10 text-white outline-none border border-white/20 placeholder-gray-300 focus:border-orange-400 transition-colors"
          /> */}

          {/* Confirm Password */}
          {/* <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 rounded-lg bg-white/10 text-white outline-none border border-white/20 placeholder-gray-300 focus:border-orange-400 transition-colors"
          /> */}

          {/* Terms Checkbox */}
          <label className="flex items-center gap-3 text-gray-300 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 accent-orange-500 cursor-pointer"
            />
            I agree to the&nbsp;
            <span className="text-orange-400 underline cursor-pointer">
              Terms & Conditions
            </span>
          </label>

          <button className="bg-orange-500 hover:bg-orange-400 text-white font-semibold p-3 rounded-lg transition-colors shadow-lg hover:shadow-orange-500/25">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
