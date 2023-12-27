"use client";
import React, { useState } from "react";

interface Book {
  id: number;
  name: string;
  testament: string;
}

interface VerseData {
  id: number;
  book: Book;
  chapterId: number;
  verseId: number;
  verse: string;
}

function App() {
  const [verse, setVerse] = useState<VerseData | null>(null);

  const fetchVerse = async () => {
    const verseID = "47012009";
    const translation = "NIV";

    console.log("hi");

    /*
    trail:1 Access to fetch at 'https://bible-go-api.rkeplin.com/v1/books/1/chapters/1?translation=NIV' from origin 'http://localhost:3000' has been blocked by CORS policy: 
    The 'Access-Control-Allow-Origin' header has a value 'https://bible-ui.rkeplin.com' that is not equal to the supplied origin. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    */

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/devotions/verse/2 Timothy 2:3`);
      // if (!response.ok) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
      console.log(response);
      const data: VerseData = await response.json();
      console.log(data);
      setVerse(data);
    } catch (error) {
      console.error("Failed to fetch verse", error);
    }
  };
  return (
    <div>
      <button onClick={fetchVerse}>Fetch Verse</button>
      {verse && (
        <div>
          <h3>
            {verse.book.name} {verse.chapterId}:{verse.verseId}
          </h3>
          <p>{verse.verse}</p>
        </div>
      )}
    </div>
  );
}

export default App;
