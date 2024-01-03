import { NextResponse } from "next/server";

import { db } from "@/lib/db";

type DevotionPageParams = {
  params: {
    devotionID: string;
  };
};

export async function GET(req: Request, { params }: DevotionPageParams) {
  try {
    const devotion = await db.devotion.findUnique({
      where: {
        id: params.devotionID,
      },
    });
    return NextResponse.json(devotion);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
