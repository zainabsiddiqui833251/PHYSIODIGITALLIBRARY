import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = 'Books'; // replace if needed

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
    
const airtableData = (await res.json()) as {
  records: {
    id: string;
    fields: {
      Title: string;
      Author: string;
      DriveLink: string;
      "Download link"?: string; // ✅ add this with quotes
      Subject?: string;
      Tags?: string[];
      Description?: any;
      Language?: string;
      Edition?: string;
      Category?: string[];
      Level?: string;
      CoverImage?: string;
    };
  }[];
};

    const books = airtableData.records.map((record) => ({
      id: record.id,
      title: record.fields.Title,
      author: record.fields.Author,
      driveLink: record.fields['Download link'] || record.fields.DriveLink,
      subject: record.fields.Subject || '',
      tags: record.fields.Tags || [],
      description:
        typeof record.fields.Description === 'object' && record.fields.Description?.value
          ? record.fields.Description.value
          : '',
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
