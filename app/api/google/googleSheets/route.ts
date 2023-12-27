import { GoogleSpreadsheet } from "google-spreadsheet";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";
import { google, docs_v1 } from "googleapis";
import { db } from "@/lib/db";

function getDocsID(link: string): string {
  return link.split("/d/")[1].split("/edit")[0];
}

export async function POST(req: Request) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_EMAIL,
      key: process.env.GOOGLE_SERVICE_PRIVATE_KEY,
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    // Link to Excel Admin Panel
    const excelSheet = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEETS_ID || "",
      serviceAccountAuth
    );

    await excelSheet.loadInfo();

    let tagSheet = excelSheet.sheetsByTitle["Tags"];
    let tagRows = await tagSheet.getRows();

    let tagInsertData = [];
    let tagMap: { [key: number]: { name: string; tableID?: string } } = {};
    for (let row of tagRows) {
      tagInsertData.push({ name: row.get("Name") });
      tagMap[row.get("ID")] = { name: row.get("Name") };
    }

    const createManyTag = await db.tag.createMany({
      data: tagInsertData,
      skipDuplicates: true,
    });

    const tagData = await db.tag.findMany();

    tagData.forEach((element: { id: string; name: string }) => {
      for (let tag in tagMap) {
        if (tagMap[tag]["name"] == element["name"]) {
          tagMap[tag]["tableID"] = element["id"];
          break;
        }
      }
    });

    let devotionTag: { [key: number]: { date: string; tableID?: string } } = {};
    let devotionInsertData = [];
    let devotionSheet = excelSheet.sheetsByTitle["Devotions"];
    let devotionRows = await devotionSheet.getRows();
    for (let row of devotionRows) {
      let googleDocsID = getDocsID(row.get("Content Docs"));
      let response = await fetch(
        process.env.NEXT_PUBLIC_SERVER_URL +
          "/api/google/googleDocs/" +
          googleDocsID,
        {
          method: "GET",
        }
      );
      let data = await response.json();
      devotionInsertData.push({
        ...data,
        docs: googleDocsID,
        devotion_date: row.get("Date"),
        bible_verse: "Hi",
      });
      devotionTag[row.get("Tag")] = { date: row.get("Date") };
    }
    const createManyDevotion = await db.devotion.createMany({
      data: devotionInsertData,
      skipDuplicates: true,
    });

    let devotionTagInsertData = [];
    for (let i in devotionTag) {
      let date = devotionTag[i]["date"];
      let output = await db.devotion.findUnique({
        where: {
          devotion_date: date,
        },
      });
      devotionTagInsertData.push({
        devotion_id: output.id,
        tag_id: tagMap[i]["tableID"],
      });
    }

    const createManyDevotionTag = await db.devotion_Tag.createMany({
      data: devotionTagInsertData,
      skipDuplicates: true,
    });

    return NextResponse.json({ message: "" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
