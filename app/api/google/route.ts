import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let outputDict = db.devotion.create({
    data: {
      title: "Who Am I?2",
      author: "A Child of God",
      author_about:
        "A mother of 2, and a retired civil servant but most of all, a child of God.",
      verse_id: "Psalms 27:10",
      content:
        "2My husband and I sent off our son 13 years ago when he enlisted into NS. It was with pride and anxiety as we saw him in the hall at Pulau Tekong together with the new recruits. We know that it’s every male Singaporean’s rite of passage to serve in the NS but the mother in me could not help but be anxious. I could only pray for him daily but I knew that he would not probably share all his anxieties and fears with me. At times, he might even think that he was so alone. I would therefore always pray that he would constantly seek God himself, and depend on Him at all times.\n" +
        "\n" +
        `Perhaps this was how David might have felt when he wrote Psalm 27. In his moments of distress, he might even have thought his parents or those closest 
to him had abandoned him. But we take so much comfort as David did that no matter what, God will never forsake us and will always hold us close. Humans are 
unpredictable and the closest to us may sometimes unwittingly hurt us but God 
is unchangeable: He is a promise keeper and will keep His word.`,
      prayer:
        "Father God\n" +
        `I ask that You assure every person reading this that no matter their journey in NS, and even when they receive unflattering labels from others, that they will always remember who they are and whose they are: their identity is a child of God who belongs to You. You will never forsake them because each of them is Your precious child whom You knew even before they were formed in their mother's womb. In Jesus' most mighty name, Amen!`,
    },
  });
  return NextResponse.json(outputDict);
}
