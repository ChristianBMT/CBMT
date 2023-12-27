'use client'
import React, { useState } from 'react';

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
    const verseID = '47012009';
    const translation = 'NIV'; 

    try {
      const response = await fetch(`https://bible-go-api.rkeplin.com/v1/books/1/chapters/1/47012009?translation=NIV`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: VerseData = await response.json();
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
          <h3>{verse.book.name} {verse.chapterId}:{verse.verseId}</h3>
          <p>{verse.verse}</p>
        </div>
      )}
    </div>
  );
}

export default App;
