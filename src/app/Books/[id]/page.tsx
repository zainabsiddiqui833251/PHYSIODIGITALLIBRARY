'use client';

import { notFound, useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  description: string;
  driveLink: string;
  thumbnail: string;
}

// Sample book data
const books: Book[] = [
  {
    id: '1',
    title: 'Guyton & Hall Physiology',
    author: 'John E. Hall',
    category: 'General',
    tags: ['Cardiovascular', 'Cell'],
    description:
      'A comprehensive explanation of human physiology focusing on cellular and cardiovascular systems.',
    driveLink: 'https://drive.google.com/file/d/1',
    thumbnail: 'https://via.placeholder.com/600x300.png?text=Guyton+Book',
  },
  {
    id: '2',
    title: 'Neurophysiology Made Simple',
    author: 'Jane Doe',
    category: 'Neurophysiology',
    tags: ['Brain', 'Neurons'],
    description: 'A student-friendly introduction to brain and neuron function.',
    driveLink: 'https://drive.google.com/file/d/2',
    thumbnail: 'https://via.placeholder.com/600x300.png?text=Neuro+Book',
  },
];

export default function BookInfoPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const book = books.find((b) => b.id === params.id);

  // 🔐 Session check
  useEffect(() => {
    const access = sessionStorage.getItem('access_granted');
    const expiry = sessionStorage.getItem('access_expires');
    if (access !== 'true' || !expiry || Number(expiry) < Date.now()) {
      sessionStorage.clear();
      router.push('/Login');
    }
  }, [router]);

  if (!book) return notFound();

  return (
    <section className="min-h-screen bg-[#fdf6fd] px-4 md:px-10 py-10 text-gray-800 animate-fade-in">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-xl border border-purple-100 transition-all duration-300">
        {/* Thumbnail */}
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-sm"
        />

        {/* Book Info */}
        <h1 className="text-3xl font-bold text-[#6b4089] mb-2">{book.title}</h1>
        <p className="text-md text-gray-600 mb-1">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Category:</strong> {book.category}
        </p>

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
            href={book.driveLink}
            target="_blank"
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
