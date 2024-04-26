import { NextResponse } from "next/server";

import { db } from "@/lib/db";

type WeekParams = {
  params: {
    weekNo: string;
  };
};

export async function PUT(req: Request, { params }: WeekParams) {
  try {
    let body: { name: string } = await req.json();

    const updateWeek = await db.week.update({
      where: {
        week: parseInt(params.weekNo),
      },
      data: { ...body },
    });

    return NextResponse.json(
      { message: "Week Updated", week: updateWeek },
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
