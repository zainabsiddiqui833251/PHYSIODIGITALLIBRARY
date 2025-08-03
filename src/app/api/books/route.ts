import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const TABLE_NAME = 'BooksManagement'; // 🔁 change if your table is named differently

export async function GET() {
  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
    {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch data from Airtable' }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data.records);
}
