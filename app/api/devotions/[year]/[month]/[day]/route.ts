import { NextResponse } from "next/server";

import { db } from "@/lib/db";

type DevotionPageParams = {
  params: {
    year: number;
    month: number;
    day: number;
  };
};

export async function GET(req: Request, { params }: DevotionPageParams) {
  try {
    let currentDate = new Date(`${params.year}-${params.month}-${params.day}`)
      .toISOString()
      .split("T")[0];
    const currentDevotion = await db.devotion.findMany({
      where: {
        devotion_date: currentDate,
      },
      include: {
        author: true,
      },
    });
    return NextResponse.json(currentDevotion[0]);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
