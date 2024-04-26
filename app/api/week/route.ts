import { NextResponse } from "next/server";

import { db } from "@/lib/db";

import { WeekType } from "@/types";

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

export async function POST(req: Request) {
  try {
    let body: { weeks: WeekType[] } = await req.json();
    console.log(body);
    let weekBody = body["weeks"];
    const newWeek = await db.week.createMany({
      data: { ...weekBody },
      skipDuplicates: true,
    });

    return NextResponse.json(
      { message: "Week Created", week: newWeek },
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
