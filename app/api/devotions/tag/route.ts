import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Devotion } from "@/types";

type Tag = { id: string; name: string };

export async function GET(req: Request) {
  try {
    const output: { [key: string]: Devotion[] } = {};
    const allTag: Tag[] = await db.tag.findMany({
      orderBy: [
        {
          name: "asc",
        },
      ],
    });
    for await (let tag of allTag) {
      let tagName = tag.name;
      const allDevotionWithTag = await db.Devotion_Tag.findMany({
        select: {
          Devotion: true,
          tag: true,
        },
        where: {
          tag: {
            name: tagName,
          },
        },
        orderBy: [
          {
            Devotion: { weekNo: "asc" },
          },
          {
            Devotion: { title: "asc" },
          },
        ],
      });
      output[tagName] = allDevotionWithTag.map(
        (e: { Devotion: Devotion; tag: Tag }) => {
          return e.Devotion;
        }
      );
    }
    return NextResponse.json(output);
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
