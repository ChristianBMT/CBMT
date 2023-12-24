import { google, docs_v1 } from "googleapis";
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import http from "http";

type GooglePageParams = {
  params: {
    googleDocsID: string;
  };
};

export async function GET(req: Request, { params }: GooglePageParams) {
  try {
    // const auth = await google.auth.getClient({
    //   scopes: [
    //     "https://www.googleapis.com/auth/drive",
    //     "https://www.googleapis.com/auth/documents",
    //     "https://www.googleapis.com/auth/drive.file",
    //   ],
    // });
    // console.log(auth);
    // const docs = google.docs({ version: "v1", auth });

    // // const file = await fs.readFile("./CBMT_credentials.json", "utf8");
    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
    );
    console.log(oAuth2Client);
    try {
      const auth = await google.auth.getClient({
        scopes: [
          "https://www.googleapis.com/auth/documents",
          "https://www.googleapis.com/auth/documents.readonly",
          "https://www.googleapis.com/auth/drive",
          "https://www.googleapis.com/auth/drive.file",
          "https://www.googleapis.com/auth/drive.readonly",
        ],
      });
      const docsClient: docs_v1.Docs = google.docs({
        version: "v1",
        auth: auth,
      });
      const response = await docsClient.documents.get({
        documentId: params.googleDocsID,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    // const docsClient: docs_v1.Docs = google.docs({
    //   version: "v1",
    //   auth: oAuth2Client,
    // });
    // const response = await docsClient.documents.get({
    //   documentId: params.googleDocsID,
    // });
    // console.log(response.data);
    // console.log(
    //   await docsClient.documents.get()
    // https://docs.googleapis.com/v1/documents/{documentId}
    // );
    return NextResponse.json({ message: "hi" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
