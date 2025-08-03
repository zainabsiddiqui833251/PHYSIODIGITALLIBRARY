import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const TABLE_NAME = 'BooksManagement'; // Change if needed

export async function GET() {
  try {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const text = await res.text(); // 🔍 Get full response as text for debugging
    console.log('📦 Airtable raw response:', text); // ✅ Log in terminal or Vercel logs

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch data from Airtable' }, { status: 500 });
    }

    const data = JSON.parse(text); // 🔁 Convert text to JSON after logging
    return NextResponse.json(data.records);
  } catch (err) {
    console.error('❌ Error fetching Airtable:', err);
    return NextResponse.json({ error: 'Airtable API failed' }, { status: 500 });
  }
}
