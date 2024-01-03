import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const week = await db.week.findMany({
      orderBy: [
        {
          week: "asc",
        },
      ],
    });
    return NextResponse.json(week);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
