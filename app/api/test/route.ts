import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Devotion } from "@/types";

type Tag = { id: string; name: string };

export async function GET(req: Request) {
  try {
    const output: { [key: string]: Devotion[] } = {};
    const allDevotion: Devotion[] = await db.devotion.findMany({
      orderBy: [
        {
          title: "asc",
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
      });
      // output[devotionId] = allDevotionWithTag.map(
      //   (e: { Devotion: Devotion; tag: Tag }) => {
      //     return { ...e.Devotion, tag: e.tag };
      //   }
      // );
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
