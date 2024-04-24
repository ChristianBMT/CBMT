import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Devotion, DevotionExcel, DevotionAudioBody } from "@/types";

type Tag = { id: string; name: string };

export async function GET(req: Request) {
  try {
    const output: { [key: string]: Devotion[] } = {};
    const allDevotion: Devotion[] = await db.devotion.findMany({
      where: {
        hide: false,
      },
      orderBy: [
        {
          title: "asc",
        },
        {
          weekNo: "asc",
        },
      ],
    });
    for await (let devotion of allDevotion) {
      let devotionId = devotion.id;
      const allDevotionWithTag = await db.Devotion_Tag.findMany({
        select: {
          Devotion: false,
          tag: true,
        },
        where: {
          Devotion: {
            id: devotionId,
          },
        },
        orderBy: [
          {
            Devotion: {
              title: "asc",
            },
          },
          {
            Devotion: {
              weekNo: "asc",
            },
          },
        ],
      });
      devotion["tag"] = allDevotionWithTag.map((e: { tag: Tag }) => e.tag);
    }
    return NextResponse.json(allDevotion);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    let body: DevotionExcel = await req.json();
    console.log(body);
    let finalDevotion: Devotion = { ...body };

    if (finalDevotion.verse_id) {
      let bibleResponseBody: { verse: string } = {
        verse: finalDevotion.verse_id,
      };
      console.log(bibleResponseBody);
      let bibleResponse = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL + "/api/devotions/verse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bibleResponseBody),
        }
      );
      let bibleData = await bibleResponse.json();
      console.log(bibleData);
      finalDevotion.bible_verse = bibleData ? bibleData.verse : "";
    }

    let audioData;

    let audioResponseBody: DevotionAudioBody = {
      content: finalDevotion.content,
      author: finalDevotion.author,
      prayer: finalDevotion.prayer,
      title: finalDevotion.title,
      verse_id: finalDevotion.verse_id,
      bible_verse: finalDevotion.bible_verse,
    };

    let audioResponse = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/api/devotions/audio",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(audioResponseBody),
      }
    );
    audioData = await audioResponse.json();

    finalDevotion.audio_file =
      audioData !== undefined
        ? (audioData as { audio_file?: string })?.audio_file || ""
        : "";
    finalDevotion.docs = "";
    const newDevotion = await db.devotion.create({
      data: { ...finalDevotion },
    });

    return NextResponse.json(
      { message: "Devotion Created", devotion: newDevotion },
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
