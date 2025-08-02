'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/Login');
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf6fd] text-[#6b4089] overflow-hidden">
      {/* Logo animation */}
      <img
        src="/images/physioshelflogo.png"
        alt="Physiology Shelf"
        className="w-32 h-32 mb-4 animate-[bounce_1.5s_ease-in-out]"
      />

      {/* Text animation */}
      <h1 className="text-4xl font-bold opacity-0 animate-fadeInUp">
        Physiology Shelf
      </h1>
    </div>
  );
}
