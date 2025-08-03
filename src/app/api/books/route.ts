// src/app/api/books/route.ts
import { NextResponse } from 'next/server';

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const TABLE_NAME = 'Books'; // double-check this matches your tab name

export async function GET() {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`,
      {
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        },
      }
    );

    const raw = await res.json();

    // ✅ Filter & map relevant book data
    const books = raw.records
      .filter((record: any) => record.fields?.Title && record.fields?.DriveLink) // remove empty entries
      .map((record: any) => ({
        id: record.id,
        title: record.fields.Title || '',
        author: record.fields.Author || '',
        category: record.fields.Category || [],
        tags: record.fields.Tags || [],
        driveLink: record.fields['Download link'] || '',
        thumbnail: record.fields.CoverImage || '',
        description: record.fields.Description?.value || '',
        language: record.fields.Language || '',
        level: record.fields.Level || '',
        edition: record.fields.Edition || '',
        subject: record.fields.Subject || '',
      }));

    return NextResponse.json(books);
  } catch (err) {
    console.error('❌ Airtable fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch data from Airtable' }, { status: 500 });
  }
}
