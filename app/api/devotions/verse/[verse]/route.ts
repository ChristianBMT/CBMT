import { NextResponse } from "next/server";

type VerseParams = {
  params: {
    verse: string;
  };
};

export async function GET(req: Request, { params }: VerseParams) {
  let verseID = '47001001'
  // const endpoint = `https://bible-go-api.rekplin.com/v1/verses/${verseID}?translation=${translation}`;
  const endpoint = `https://bible-go-api.rkeplin.com/v1/books/1/chapters/1/${verseID}?translation=NIV`;

  try {
    // Fetch the data from the API
    const response = await fetch(endpoint);
    console.log(response);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // Parse the response as JSON
    const data = await response.json();
    console.log(data);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // Log and return error response
    console.error("Fetching Bible verse failed", error);
    return new Response("Failed to fetch Bible verse", { status: 500 });
  }
}
