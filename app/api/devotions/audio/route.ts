import { NextResponse } from "next/server";
const ElevenLabs = require("elevenlabs-node");
import * as fs from "fs";

const voice = new ElevenLabs({
  apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
  voiceId: "onwK4e9ZLuTAKqWW03F9",
});

type DevotionAudioBody = {
  content: string;
  author: string;
  prayer?: string;
  title: string;
  verse_id?: string;
  bible_verse?: string;
};

export async function POST(req: Request) {
  try {
    const {
      content,
      author,
      prayer,
      title,
      verse_id,
      bible_verse,
    }: DevotionAudioBody = await req.json();
    const fileName = `./public/test.mp3`;
    let speakString = `${title}
By ${author}
.
.`;

    if (verse_id) {
      const verseRegex = /^(\d?\s?[A-Za-z ]+?)\s(\d+):(\d+)(-(\d+))?$/;
      const match = verse_id.match(verseRegex);
      if (!match) {
        return NextResponse.json(
          { message: "Invalid Format" },
          { status: 403 }
        );
      }
      let verse_id_split = verse_id.split(" ");
      let book = match[1].trim();
      let chapter = match[2];
      let verse;
      const startVerse = match[3];
      if (match[5]) {
        verse = `${startVerse} to ${match[5]}`;
      } else {
        verse = startVerse;
      }
      speakString += `Today's devotion is taken from ${book} Chapter ${chapter} Verse ${verse}.
.
.
.
.
.
"${bible_verse}"`;
    }

    speakString += `.
.
.
.
.
.
.
${content}`;

    if (prayer) {
      speakString += `.
.
.
.
.
.
.
Let's Pray!
${prayer}`;
    }

    const voiceResponse = await voice.textToSpeech({
      fileName: fileName,
      textInput: speakString,
      stability: 0.4,
      similarityBoost: 0.8,
    });

    if (voiceResponse.status != "ok") {
      return NextResponse.json(
        { message: "ElevenLabs Error" },
        { status: 500 }
      );
    }

    // Assume that voice created is the last thing on history
    const historyResponse = await fetch(
      "https://api.elevenlabs.io/v1/history/",
      {
        method: "GET",
        headers: {
          "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || "",
        },
      }
    );

    const historyData = await historyResponse.json();

    let audioRecord = historyData.history[0]["history_item_id"];

    fs.unlinkSync(fileName);

    return NextResponse.json(
      {
        message: "Audio successfully created!",
        audio_file: audioRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
