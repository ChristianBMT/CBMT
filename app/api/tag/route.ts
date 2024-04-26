import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const tag = await db.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(tag);
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
    let body: { tags: string[] } = await req.json();
    console.log(body);
    let tagBody = body["tags"].map((e) => {
      return {
        name: e,
      };
    });
    const tag = await db.tag.createMany({
      data: tagBody,
      skipDuplicates: true,
    });
    return NextResponse.json(tag);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
