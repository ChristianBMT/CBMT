import { google, docs_v1 } from "googleapis";
import { NextResponse } from "next/server";
import { JWT } from "google-auth-library";

type GooglePageParams = {
  params: {
    googleDocsID: string;
  };
};

export async function GET(req: Request, { params }: GooglePageParams) {
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

    const docsClient: docs_v1.Docs = google.docs({
      version: "v1",
      auth: serviceAccountAuth,
    });

    const response = await docsClient.documents.get({
      documentId: params.googleDocsID,
    });

    const docsBody = response.data.body?.content || [];

    let output: string[] = [];

    for (let body of docsBody) {
      for (let elements of body.table?.tableRows || []) {
        for (let cellIdx in elements.tableCells || []) {
          if (
            elements.tableCells &&
            parseInt(cellIdx) == elements.tableCells?.length - 1
          ) {
            let cell = elements.tableCells[cellIdx];
            let tempString = "";
            for (let e of cell.content || []) {
              for (let para of e.paragraph?.elements || []) {
                tempString += para.textRun?.content || "";
              }
            }
            output.push(tempString);
          }
        }
      }
    }

    let outputDict: {
      title: string;
      author: string;
      author_about: string;
      verse_id: string;
      content: string;
      prayer: string;
    } = {
      title: output[0].trim(),
      author: output[1].trim(),
      author_about: output[2].trim(),
      verse_id: output[3].trim(),
      content: output[4].trim().split("\n").join("  "),
      prayer: output[5].trim(),
    };
    return NextResponse.json(outputDict);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
