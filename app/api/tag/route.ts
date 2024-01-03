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
