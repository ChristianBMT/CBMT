import { NextResponse } from "next/server";
const ElevenLabs = require("elevenlabs-node");
import { db } from "@/lib/db";
import * as fs from "fs";

const voice = new ElevenLabs({
  apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
  voiceId: "onwK4e9ZLuTAKqWW03F9",
});

type DevotionAudioBody = {
  id: string;
  content: string;
  author: string;
  prayer: string;
  title: string;
  devotion_date: string;
  verse_id: string;
  bible_verse: string;
};

export async function POST(req: Request) {
  try {
    const {
      id,
      content,
      author,
      prayer,
      title,
      devotion_date,
      verse_id,
      bible_verse,
    }: DevotionAudioBody = await req.json();
    let cleanedTitle = title
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " ");

    const fileName = `./public/${devotion_date}_${cleanedTitle}.mp3`;
    let verse_id_split = verse_id.split(" ");
    const book = verse_id_split.slice(0, verse_id_split.length - 1).join(" ");
    const chapter_verse = verse_id_split[verse_id_split.length - 1];
    const [chapter, verse] = chapter_verse.split(":");
    const voiceResponse = await voice.textToSpeech({
      fileName: fileName,
      textInput: `${title}
By ${author}
.
.
Today's devotion is taken from ${book} Chapter ${chapter} Verse ${verse}.
.
.
.
.
.
.
.
"${bible_verse}"
.
.
.
.
.
.
.
${content}
.
.
.
.
.
.
.
Let's Pray!
${prayer}`,
      stability: 0.4,
      similarityBoost: 0.8,
    });
    if (voiceResponse.status != "ok") {
      return new NextResponse("ElevenLabs Error", { status: 500 });
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

    await db.devotion.update({
      where: {
        id: id,
      },
      data: {
        audio_file: audioRecord,
      },
    });

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
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
