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
  'Download link'?: string;
  Subject?: string;
  Tags?: string[];
  Description?: DescriptionType;
  Language?: string;
  Edition?: string;
  Category?: string[];
  Level?: string;
  CoverImage?: string;
}

interface AirtableRecord {
  id: string;
  fields: AirtableFields;
}

export async function GET() {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = 'Books'; // Update if your table name is different

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
      driveLink: record.fields['Download link'] || record.fields.DriveLink,
      subject: record.fields.Subject || '',
      tags: record.fields.Tags || [],
      description: record.fields.Description?.value ?? '',
      language: record.fields.Language || '',
      edition: record.fields.Edition || '',
      category: record.fields.Category || [],
      level: record.fields.Level || '',
      thumbnail: record.fields.CoverImage || '',
    }));

    return NextResponse.json(books);
  } catch (error) {
    console.error('❌ Error fetching Airtable data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Airtable' }, { status: 500 });
  }
}
