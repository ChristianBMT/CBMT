import { NextResponse } from "next/server";

import { db } from "@/lib/db";

import { Devotion, Tag, DevotionAudioBody } from "@/types";

type DevotionPageParams = {
  params: {
    devotionID: string;
  };
};

export async function GET(req: Request, { params }: DevotionPageParams) {
  try {
    const devotion = await db.devotion.findUnique({
      where: {
        id: params.devotionID,
      },
    });
    return NextResponse.json(devotion);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export type DevotionExcel = {
  id: string;
  weekNo: number;
  title: string;
  author: string;
  author_about?: string;
  verse_id: string;
  content: string;
  prayer?: string;
  image: string;
  image_source: string;
  bible_verse?: string;
  audio_file?: string;
};

export async function PUT(req: Request, { params }: DevotionPageParams) {
  try {
    let body: DevotionExcel = await req.json();
    const originalDevotion: Devotion = await db.devotion.findUnique({
      where: {
        id: params.devotionID,
      },
    });
    let finalDevotion: Devotion = { ...body };

    let checkKeys: ("title" | "author" | "verse_id" | "content" | "prayer")[] =
      ["title", "author", "verse_id", "content", "prayer"];
    let hasChange = false;
    let verseChange = false;
    for (let key of checkKeys) {
      if (originalDevotion[key] != body[key]) {
        console.log(originalDevotion[key], body[key], key);
        hasChange = true;
        if (key == "verse_id") {
          verseChange = true;
        }
      }
    }

    // Fill up missing devotion details
    finalDevotion = { ...originalDevotion, ...finalDevotion };
    console.log(finalDevotion);

    let bibleData;
    if (verseChange) {
      if (body.verse_id) {
        let bibleResponseBody: { verse: string } = {
          verse: body.verse_id,
        };
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
        bibleData = await bibleResponse.json();
      } else {
        bibleData = "";
      }
      finalDevotion.bible_verse = bibleData ? bibleData.verse : "";
    }

    // let audioData;
    // if (hasChange) {
    //   let audioResponseBody: DevotionAudioBody = {
    //     content: finalDevotion.content,
    //     author: finalDevotion.author,
    //     prayer: finalDevotion.prayer,
    //     title: finalDevotion.title,
    //     verse_id: finalDevotion.verse_id,
    //     bible_verse: finalDevotion.bible_verse,
    //   };
    //   let audioResponse = await fetch(
    //     process.env.NEXT_PUBLIC_SERVER_URL + "/api/devotions/audio",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(audioResponseBody),
    //     }
    //   );
    //   audioData = await audioResponse.json();
    //   finalDevotion.audio_file =
    //     audioData !== undefined
    //       ? (audioData as { audio_file?: string })?.audio_file || ""
    //       : "";
    // }

    console.log(finalDevotion);

    const updateDevotion = await db.devotion.update({
      where: {
        id: params.devotionID,
      },
      data: { ...finalDevotion },
    });

    return NextResponse.json({ message: "Data Updated" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
