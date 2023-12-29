import { NextResponse } from "next/server";

import { db } from "@/lib/db";

type DevotionPageParams = {
  params: {
    week: string;
  };
};

export async function GET(req: Request, { params }: DevotionPageParams) {
  try {
    const allDevotion = await db.devotion.findMany({
      where: {
        weekNo: {
          lte: parseInt(params.week),
        },
      },
      orderBy: [
        {
          weekNo: "desc",
        },
        {
          title: "asc",
        },
      ],
    });
    return NextResponse.json(allDevotion);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
