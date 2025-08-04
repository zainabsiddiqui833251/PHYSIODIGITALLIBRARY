'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string[];
  tags: string[];
  driveLink: string;
  thumbnail: string;
}

export default function BooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>([]);
  const [filtered, setFiltered] = useState<Book[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // ✅ Updated: Login/session check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const access = sessionStorage.getItem('access_granted');
      const expiry = parseInt(sessionStorage.getItem('access_expires') || '0');

      if (access !== 'true' || Date.now() > expiry) {
        router.push('/Login');
      }
    }
  }, [router]);

  // 🔁 Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/books');
        const data: Book[] = await res.json();

        setBooks(data);
        setFiltered(data);

        const allCategories = data.flatMap((b) => b.category ?? []);
        const allTags = data.flatMap((b) => b.tags ?? []);

        setCategories([...new Set(allCategories)]);
        setTags([...new Set(allTags)]);
      } catch (err) {
        console.error('❌ Failed to fetch books:', err);
      }
    };

    fetchBooks();
  }, []);

  // 🔍 Apply filters
  useEffect(() => {
    let updated = books;

    if (selectedCategory) {
      updated = updated.filter((b) => b.category.includes(selectedCategory));
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
      {/* Header */}
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
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="px-4 py-2 border border-purple-200 rounded w-full md:w-1/4"
        >
          <option value="">All Tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {/* Book Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((book) => (
          <Link key={book.id} href={`/Books/${book.id}`}>
            <div className="bg-white border border-purple-100 shadow hover:shadow-xl transition-all rounded-xl overflow-hidden cursor-pointer transform hover:-translate-y-1 hover:scale-[1.02]">
              <img
                src={book.thumbnail || 'https://via.placeholder.com/300x400?text=No+Image'}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-[#6b4089]">{book.title}</h2>
                <p className="text-sm text-gray-600">{book.author}</p>
                <p className="text-xs mt-1">
                  <strong>Category:</strong> {book.category?.join(', ') || 'Uncategorized'}
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
