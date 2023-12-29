"use client";

import { useState, useEffect } from "react";
import DevotionCard from "@/components/devotion/DevotionCard";
import { Devotion } from "@/types";

export default function AllDevotion() {
  const [allDevotion, setAllDevotion] = useState<Devotion[]>([]);

  async function getData() {
    let weekResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/week`
    );
    let weekData = await weekResponse.json();

    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/devotions/${weekData.currentWeek}`
    );
    let data = await response.json();
    setAllDevotion(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="min-h-100dvh flex flex-col mx-auto max-w-[500px] px-6">
      <h1 className="font-semibold text-xl text-center">All Devotions</h1>
      <div className="grid grid-cols-2 mx-auto gap-3 my-2 justify-start place-items-start">
        {allDevotion.map((data, idx) => {
          return (
            <DevotionCard
              key={"allDevotion-" + idx}
              id={data.id}
              imageSrc={data.image}
              weekNo={data.weekNo}
              title={data.title}
            />
          );
        })}
      </div>
    </main>
  );
}
