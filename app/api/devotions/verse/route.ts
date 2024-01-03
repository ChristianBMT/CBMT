import { NextResponse } from "next/server";

interface VerseData {
  id: number;
  book: {
    id: number;
    name: string;
    testament: string;
  };
  chapterId: number;
  verseId: number;
  verse: string;
}

const bookNumberMap: { [key: string]: number } = {
  Genesis: 1,
  Exodus: 2,
  Leviticus: 3,
  Numbers: 4,
  Deuteronomy: 5,
  Joshua: 6,
  Judges: 7,
  Ruth: 8,
  "1 Samuel": 9,
  "2 Samuel": 10,
  "1 Kings": 11,
  "2 Kings": 12,
  "1 Chronicles": 13,
  "2 Chronicles": 14,
  Ezra: 15,
  Nehemiah: 16,
  Esther: 17,
  Job: 18,
  Psalms: 19,
  Proverbs: 20,
  Ecclesiastes: 21,
  "Song of Solomon": 22,
  Isaiah: 23,
  Jeremiah: 24,
  Lamentations: 25,
  Ezekiel: 26,
  Daniel: 27,
  Hosea: 28,
  Joel: 29,
  Amos: 30,
  Obadiah: 31,
  Jonah: 32,
  Micah: 33,
  Nahum: 34,
  Habakkuk: 35,
  Zephaniah: 36,
  Haggai: 37,
  Zechariah: 38,
  Malachi: 39,
  Matthew: 40,
  Mark: 41,
  Luke: 42,
  John: 43,
  Acts: 44,
  Romans: 45,
  "1 Corinthians": 46,
  "2 Corinthians": 47,
  Galatians: 48,
  Ephesians: 49,
  Philippians: 50,
  Colossians: 51,
  "1 Thessalonians": 52,
  "2 Thessalonians": 53,
  "1 Timothy": 54,
  "2 Timothy": 55,
  Titus: 56,
  Philemon: 57,
  Hebrews: 58,
  James: 59,
  "1 Peter": 60,
  "2 Peter": 61,
  "1 John": 62,
  "2 John": 63,
  "3 John": 64,
  Jude: 65,
  Revelation: 66,
};

export async function POST(req: Request) {
  // Getting the request body
  const data = await req.json();

  // Regular expression to extract book name, chapter, and verse(s)
  const verseRegex = /^(\d?\s?[A-Za-z ]+?)\s(\d+):(\d+)(-(\d+))?$/;
  const match = data.verse.match(verseRegex);

  if (!match) {
    console.error("Invalid verse format");
    return NextResponse.json(
      { message: "Invalid verse format" },
      { status: 400 }
    );
  }

  const bookName = match[1].trim();
  const chapter = match[2];
  let startVerse = parseInt(match[3]);
  const endVerse = match[5] ? parseInt(match[5]) : startVerse;

  // Converting to numbers
  const bookNum = bookNumberMap[bookName];

  const verseCode = [];
  for (
    let chapterNum = parseInt(chapter);
    chapterNum <= parseInt(chapter);
    chapterNum++
  ) {
    const chapter = chapterNum.toString().padStart(3, "0");

    for (let verseNum = startVerse; verseNum <= endVerse; verseNum++) {
      const verse = verseNum.toString().padStart(3, "0");
      // verseCode.push(`${bookNum}${chapter}${verse}`);
      verseCode.push(bookNum + chapter + verse);
    }
  }

  const fetchPromises = verseCode.map((code) =>
    fetch(
      `https://bible-go-api.rkeplin.com/v1/books/1/chapters/1/${code}?translation=NIV`
    ).then((response) => response.json())
  );

  // try {
  //   const results: VerseData[] = await Promise.all(fetchPromises);

  //   // Concatenating all results into a single object
  //   const concatenatedResult = results.reduce((combined, result) => {
  //     combined.push(result);
  //     return combined;
  //   }, [] as VerseData[]);

  //   return new NextResponse(JSON.stringify(concatenatedResult), {
  //     status: 200,
  //   });
  // } catch (error) {
  //   console.error("Error fetching Bible verses", error);
  //   return new NextResponse("Failed to fetch Bible verses", { status: 500 });
  // }

  try {
    const results = await Promise.all(fetchPromises);

    // Concatenating verses with their number
    const concatenatedVerses = results.reduce(
      (combined, { verseId, verse }) => {
        // ${verseId}:
        return combined + " " + `${verse}`;
      },
      ""
    );

    return NextResponse.json(
      { verse: concatenatedVerses.trim() },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching Bible verses", error);
    return NextResponse.json(
      { message: "Failed to fetch Bible verses" },
      { status: 500 }
    );
  }
}
