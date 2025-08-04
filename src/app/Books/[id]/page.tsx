'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { notFound } from 'next/navigation';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string[];
  tags: string[];
  description: string;
  driveLink: string;
  downloadLink: string;
  thumbnail: string;
  language?: string;
  edition?: string;
  subject?: string;
  level?: string;
}

export default function BookInfoPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Login/session check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const access = sessionStorage.getItem('access_granted');
      const expiry = parseInt(sessionStorage.getItem('access_expires') || '0');

      if (access !== 'true' || Date.now() > expiry) {
        router.push('/Login');
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch('/api/books');
        const data: Book[] = await res.json();
        const match = data.find((b) => b.id === params.id);
        setBook(match || null);
      } catch (err) {
        console.error('❌ Failed to fetch book:', err);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [params.id]);

  if (loading) return <p className="text-center mt-10 text-purple-700">Loading book...</p>;
  if (!book) return notFound();

  return (
    <section className="min-h-screen bg-[#fdf6fd] px-4 md:px-10 py-10 text-gray-800 animate-fade-in">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-xl border border-purple-100 transition-all duration-300">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 text-sm text-purple-600 underline hover:text-purple-800 transition"
        >
          ← Go Back
        </button>

        {/* Thumbnail */}
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-sm"
        />

        {/* Book Info */}
        <h1 className="text-3xl font-bold text-[#6b4089] mb-2">{book.title}</h1>
        <p className="text-md text-gray-600 mb-1"><strong>Author:</strong> {book.author}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Category:</strong> {book.category.join(', ')}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Edition:</strong> {book.edition}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Language:</strong> {book.language}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Level:</strong> {book.level}</p>
        <p className="text-sm text-gray-600 mb-1"><strong>Subject:</strong> {book.subject}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-md text-gray-700 leading-relaxed mb-6">{book.description}</p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href={book.driveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#c084fc] hover:bg-[#a855f7] text-white px-6 py-2 rounded-full shadow transition duration-200 hover:scale-105"
          >
            📖 Read Now
          </a>
          <a
            href={book.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="bg-white border border-[#c084fc] text-[#6b4089] hover:bg-[#f4e8ff] px-6 py-2 rounded-full shadow transition duration-200 hover:scale-105"
          >
            ⬇️ Download
          </a>
        </div>
      </div>
    </section>
  );
}
