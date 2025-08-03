const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const TABLE_NAME = "BooksManagement";

interface AirtableAttachment {
  url: string;
  [key: string]: unknown;
}

interface AirtableRecord {
  id: string;
  fields: {
    Title?: string;
    Author?: string;
    DriveLink?: string;
    "Download link"?: string;
    Subject?: string;
    Tags?: string[];
    Description?: {
      value: string;
      [key: string]: unknown;
    };
    Language?: string;
    Edition?: string;
    Category?: string[];
    Level?: string;
    CoverImage?: string | AirtableAttachment[];
  };
}

export async function fetchBooks() {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`❌ Failed to fetch books: ${res.status}`);
  }

  const json = await res.json();
  const records: AirtableRecord[] = json.records;

  const books = records.map((record) => {
    const fields = record.fields;
    let thumbnail = '';

    if (Array.isArray(fields.CoverImage)) {
      thumbnail = fields.CoverImage[0]?.url ?? '';
    } else if (typeof fields.CoverImage === 'string') {
      thumbnail = fields.CoverImage;
    }

    return {
      id: record.id,
      title: fields.Title ?? 'Untitled',
      author: fields.Author ?? 'Unknown',
      driveLink: fields['Download link'] || fields.DriveLink || '',
      subject: fields.Subject || '',
      tags: fields.Tags || [],
      description: fields.Description?.value ?? '',
      language: fields.Language || '',
      edition: fields.Edition || '',
      category: fields.Category || [],
      level: fields.Level || '',
      thumbnail,
    };
  });

  return books;
}
