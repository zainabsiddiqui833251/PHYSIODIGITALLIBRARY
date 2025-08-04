'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#fdf6fd] via-[#f8e6ff] to-[#edd8ff] text-[#6b4089] overflow-hidden transition-all duration-1000">
      {/* Glowing Logo */}
      <img
        src="/images/physioshelflogo.png"
        alt="Physiology Shelf"
        className="w-32 h-32 mb-4 animate-pulse drop-shadow-[0_0_12px_rgba(203,120,243,0.5)] transition-all duration-1000"
      />

      {/* Animated Text */}
      <h1 className="text-4xl font-bold opacity-0 animate-fadeInUp tracking-wide">
        Physiology Shelf
      </h1>
    </div>
  );
}
