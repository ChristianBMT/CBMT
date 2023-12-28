"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type DevotionPageParams = {
  params: {
    devotionID: string;
  };
};

type DevotionObject = {
  id: string;
  title: string;
  author: string;
  authorAbout: string;
  audio_file: string;
  content: string | string[];
  prayer: string;
};

export default function DevotionPage({ params }: DevotionPageParams) {
  const [devotionObj, setDevotionObj] = useState<DevotionObject>({
    id: "",
    title: "",
    author: "",
    authorAbout: "",
    audio_file: "",
    content: "",
    prayer: "",
  });

  async function getDevotionData() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${params.devotionID}`
    );
    const data = await response.json();
    console.log(data);
  }
  useEffect(() => {
    getDevotionData();
  }, []);
}
