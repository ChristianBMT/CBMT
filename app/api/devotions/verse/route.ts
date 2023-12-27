import { NextResponse } from 'next/server';
import fetch from 'node-fetch'; // Ensure 'node-fetch' is installed for Node.js environments

export async function GET(req: Request) {
  // Parse the incoming request URL
  const url = new URL(req.url);
  const verseID = url.searchParams.get('verseID');
  const translation = url.searchParams.get('translation') || 'NIV';
  
  // Check if verseID is provided
  if (!verseID) {
    return new Response('Verse ID is required', { status: 400 });
  }

  // const endpoint = `https://bible-go-api.rekplin.com/v1/verses/${verseID}?translation=${translation}`;
  const endpoint = `https://bible-go-api.rekplin.com/v1/books/chapters/verses/${verseID}?translation=${translation}`
  
  try {
    // Fetch the data from the API
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Parse the response as JSON
    const data = await response.json();
    console.log(data);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Log and return error response
    console.error('Fetching Bible verse failed', error);
    return new Response('Failed to fetch Bible verse', { status: 500 });
  }
}