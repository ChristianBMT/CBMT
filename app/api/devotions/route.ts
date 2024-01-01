import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const allDevotion = await db.devotion.findMany({
      orderBy: [
        {
          weekNo: "asc",
        },
        {
          title: "asc",
        },
      ],
    });
    return NextResponse.json(allDevotion);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
