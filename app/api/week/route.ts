import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    let today = new Date();
    const getCurrentWeek = await db.week.findMany({
      where: {
        date: {
          lt: today,
        },
      },
      orderBy: [
        {
          date: "desc",
        },
      ],
    });
    return NextResponse.json({ currentWeek: getCurrentWeek[0].week });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
