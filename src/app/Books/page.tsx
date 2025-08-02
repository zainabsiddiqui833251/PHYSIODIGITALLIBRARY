'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  driveLink: string;
  thumbnail: string;
}

// 🔰 Sample data (replace later)
const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Guyton & Hall Physiology',
    author: 'John E. Hall',
    category: 'General',
    tags: ['Cardiovascular', 'Cell'],
    driveLink: 'https://drive.google.com/file/d/1',
    thumbnail: 'https://via.placeholder.com/400x200.png?text=Guyton+Book',
  },
  {
    id: '2',
    title: 'Neurophysiology Made Simple',
    author: 'Jane Doe',
    category: 'Neurophysiology',
    tags: ['Brain', 'Neurons'],
    driveLink: 'https://drive.google.com/file/d/2',
    thumbnail: 'https://via.placeholder.com/400x200.png?text=Neuro+Book',
  },
];

export default function BooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [filtered, setFiltered] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // 🔐 Route Protection with session timeout check
  useEffect(() => {
    const access = sessionStorage.getItem('access_granted');
    const expiry = sessionStorage.getItem('access_expires');

    if (access !== 'true' || !expiry || Number(expiry) < Date.now()) {
      sessionStorage.clear();
      router.push('/Login');
    }
  }, [router]);

  useEffect(() => {
    const data = sampleBooks;
    setBooks(data);
    setFiltered(data);
    setCategories([...new Set(data.map((b) => b.category))]);
    setTags([...new Set(data.flatMap((b) => b.tags))]);
  }, []);

  useEffect(() => {
    let updated = books;

    if (selectedCategory) {
      updated = updated.filter((b) => b.category === selectedCategory);
    }
    if (selectedTag) {
      updated = updated.filter((b) => b.tags.includes(selectedTag));
    }
    if (search) {
      updated = updated.filter((b) =>
        b.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(updated);
  }, [books, selectedCategory, selectedTag, search]);

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/Login');
  };

  return (
    <section className="py-10 px-4 md:px-12 bg-[#fdf6fd] min-h-screen text-gray-900 animate-fade-in">
      {/* Header + Logout */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#6b4089]">📚 All Books</h1>
        <button
          onClick={handleLogout}
          className="bg-red-100 text-red-700 font-semibold px-4 py-2 rounded shadow hover:bg-red-200 transition"
        >
          🚪 Logout
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full md:w-1/3 border border-purple-200 rounded shadow-sm"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-purple-200 rounded w-full md:w-1/4"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="px-4 py-2 border border-purple-200 rounded w-full md:w-1/4"
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* Book Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((book) => (
          <Link key={book.id} href={`/Books/${book.id}`}>
            <div className="bg-white border border-purple-100 shadow hover:shadow-xl transition-all rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-[1.02]">
              <img
                src={book.thumbnail}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#6b4089]">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-xs mt-1">
                  <strong>Category:</strong> {book.category}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
