"use client";

import { useState, useEffect } from "react";
import DevotionCard from "@/components/devotion/DevotionCard";

export default function AllDevotion() {
  const [allDevotion, setAllDevotion] = useState([]);

  async function getData() {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/devotions`
    );
    let data = await response.json();
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="min-h-100dvh flex flex-col mx-auto max-w-[500px] px-6">
      <h1 className="font-semibold text-xl text-center">All Devotions</h1>
      <div className="grid grid-cols-2 mx-auto gap-3 my-2">
        <DevotionCard
          id={"idk"}
          imageSrc={"/DailyImage.webp"}
          weekNo={1}
          title={"Finding Strength in Trusting God"}
        />
        <DevotionCard
          id={"idk"}
          imageSrc={"/DailyImage.webp"}
          weekNo={1}
          title={"Finding Strength in Trusting God"}
        />
        <DevotionCard
          id={"idk"}
          imageSrc={"/DailyImage.webp"}
          weekNo={1}
          title={"Finding Strength in Trusting God"}
        />
        <DevotionCard
          id={"idk"}
          imageSrc={"/DailyImage.webp"}
          weekNo={1}
          title={"Finding Strength in Trusting God"}
        />
        <DevotionCard
          id={"idk"}
          imageSrc={"/DailyImage.webp"}
          weekNo={1}
          title={"Finding Strength in Trusting God"}
        />
      </div>
    </main>
  );
}
