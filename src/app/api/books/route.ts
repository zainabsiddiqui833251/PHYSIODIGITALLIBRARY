import { NextResponse } from 'next/server';

interface DescriptionType {
  state: string;
  value: string | null;
  isStale: boolean;
}

interface AirtableFields {
  Title: string;
  Author: string;
  DriveLink: string;
  Dowloadlink?: string; // ✅ Updated field name
  Subject?: string;
  Tags?: string[];
  Description?: DescriptionType;
  Language?: string;
  Edition?: string;
  Category?: string[];
  Level?: string;
  CoverImage?: { url: string }[];
}

interface AirtableRecord {
  id: string;
  fields: AirtableFields;
}

export async function GET() {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = 'BooksManagement';

    const res = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('❌ Airtable response not OK:', res.status);
      return NextResponse.json({ error: 'Failed to fetch data from Airtable' }, { status: 500 });
    }

    const airtableData = (await res.json()) as { records: AirtableRecord[] };

    const books = airtableData.records.map((record) => ({
      id: record.id,
      title: record.fields.Title,
      author: record.fields.Author,
      driveLink: record.fields.DriveLink,
      downloadLink: record.fields.Dowloadlink || record.fields.DriveLink, // ✅ use correct field
      subject: record.fields.Subject || '',
      tags: record.fields.Tags || [],
      description: record.fields.Description?.value ?? '',
      language: record.fields.Language || '',
      edition: record.fields.Edition || '',
      category: record.fields.Category || [],
      level: record.fields.Level || '',
      thumbnail: record.fields.CoverImage?.[0]?.url || '',
    }));

    return NextResponse.json(books);
  } catch (error) {
    console.error('❌ Error fetching Airtable data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Airtable' }, { status: 500 });
  }
}
