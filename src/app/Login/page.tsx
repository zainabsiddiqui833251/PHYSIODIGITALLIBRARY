'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [codeInput, setCodeInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect to /Home if already logged in and session is valid
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessGranted = sessionStorage.getItem('access_granted');
      const expiry = parseInt(sessionStorage.getItem('access_expires') || '0');

      if (accessGranted === 'true' && Date.now() < expiry) {
        router.push('/Home');
      } else {
        sessionStorage.removeItem('access_granted');
        sessionStorage.removeItem('access_expires');
      }
    }
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_LOGIN_CODE_URL as string, { cache: 'no-store' });
      const latestCode = (await res.text()).trim();

      if (codeInput.trim() === latestCode.trim()) {
        sessionStorage.setItem('access_granted', 'true');

        // Set session expiration time (30 minutes)
        const expiry = new Date().getTime() + 30 * 60 * 1000;
        sessionStorage.setItem('access_expires', expiry.toString());

        router.push('/Home');
      } else {
        setError('❌ Invalid access code.');
      }
    } catch (err) {
      console.error(err);
      setError('⚠️ Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf6fd] animate-fade-in">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#6b4089]">🔐 Monthly Access Code</h2>

        <input
          value={codeInput}
          onChange={(e) => {
            setCodeInput(e.target.value);
            setError('');
          }}
          className="w-full border border-purple-300 px-4 py-2 rounded mb-4"
          placeholder="ACCESS CODE"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`bg-[#c084fc] hover:bg-[#a855f7] text-white font-semibold px-4 py-2 rounded w-full transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {loading ? 'Checking...' : 'Login'}
        </button>

        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>
    </div>
  );
}
