import { NextResponse } from "next/server";
const ElevenLabs = require("elevenlabs-node");
import { db } from "@/lib/db";

const voice = new ElevenLabs({
  apiKey: process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
  voiceId: "onwK4e9ZLuTAKqWW03F9",
});

type DevotionAudioBody = {
  title: string;
  content: string;
  id: string;
  devotion_date: string;
};

export async function POST(req: Request) {
  try {
    const { title, content, id, devotion_date }: DevotionAudioBody =
      await req.json();
    let cleanedTitle = title
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " ");
    const fileName = `./public/${devotion_date}_${cleanedTitle}.mp3`;
    const voiceResponse = await voice.textToSpeech({
      fileName: fileName,
      textInput: content,
      stability: 0.5,
      similarityBoost: 0.75,
    });
    console.log(voiceResponse);
    if (voiceResponse.status != "ok") {
      return new NextResponse("ElevenLabs Error", { status: 500 });
    }
    await db.devotion.update({
      where: {
        id: id,
      },
      data: {
        audio_file: fileName,
      },
    });
    return NextResponse.json(
      {
        message: "Audio successfully created!",
        audio_file: fileName,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
