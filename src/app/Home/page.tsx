'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import About from '@/components/About';
import Hero from '@/components/Hero';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const access = sessionStorage.getItem('access_granted');
    if (access !== 'true') {
      router.push('/Login');
    }

    // 🔐 Auto-expire login after 30 minutes
    const timeout = setTimeout(() => {
      sessionStorage.removeItem('access_granted');
      router.push('/Login');
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearTimeout(timeout);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('access_granted');
    router.push('/Login');
  };

  return (
    <div className="bg-[#fdf6fd] min-h-screen text-[#6b4089] relative">

      {/* 🔓 Logout Button Top Right */}
      <div className="absolute top-6 right-6">
        <button
          onClick={handleLogout}
          className="group relative border border-[#c084fc] text-[#6b4089] font-medium px-5 py-2 rounded-full overflow-hidden transition duration-300 hover:bg-[#c084fc] hover:text-white"
        >
          Logout
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#6b4089] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
        </button>
      </div>

      {/* Hero */}
      <Hero />

      {/* Welcome Animation */}
      <div className="text-center mt-4 animate-fade-in">
        <h2 className="text-2xl font-semibold">Welcome to Physiology Shelf 📚</h2>
      </div>

      {/* About Section */}
      <About />

      {/* 📚 Show Books Button */}
      <div className="flex justify-end px-6 my-6">
        <Link href="/Books">
          <button className="group relative bg-[#c084fc] text-white font-medium px-6 py-3 rounded-full overflow-hidden transition duration-300 hover:bg-white hover:text-[#6b4089] border-2 border-[#c084fc]">
            Show All Books
            <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-[#6b4089] transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
          </button>
        </Link>
      </div>
    </div>
  );
}
