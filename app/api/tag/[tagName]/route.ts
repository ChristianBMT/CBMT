import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { Devotion } from "@/types";

type TagDevotionPageParams = {
  params: {
    tagName: string;
  };
};

export async function GET(req: Request, { params }: TagDevotionPageParams) {
  try {
    const allDevotionWithTag = await db.Devotion_Tag.findMany({
      select: {
        Devotion: true,
        tag: true,
      },
      where: {
        tag: {
          name: params.tagName,
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
    const allDevotion = allDevotionWithTag.map(
      (e: { Devotion: Devotion; tag: { id: string; name: string } }) => {
        return e.Devotion;
      }
    );
    return NextResponse.json(allDevotion);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: TagDevotionPageParams) {
  try {
    console.log(params.tagName);
    const deleteTag = await db.tag.delete({
      where: {
        name: params.tagName,
      },
    });
    return NextResponse.json(
      { message: "Delete Successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
