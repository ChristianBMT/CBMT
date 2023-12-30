"use client";

import { useState, useEffect } from "react";
import DevotionCard from "@/components/devotion/DevotionCard";
import { Devotion } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function AllDevotion() {
  const [allDevotion, setAllDevotion] = useState<Devotion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    setLoading(false);
  }, [allDevotion]);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] px-6">
      <h1 className="font-semibold text-xl text-center">All Devotions</h1>
      <div className="grid grid-cols-2 mx-auto gap-3 my-2 justify-start place-items-start w-full">
        {loading || allDevotion.length == 0
          ? [...new Array(4)].map((_, idx) => (
              <div
                className={"flex flex-col w-full max-w-[150px] gap-1"}
                key={"allSkeleton" + idx}
              >
                <Skeleton className="aspect-square w-full object-cover object-center rounded-lg" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))
          : allDevotion.map((data, idx) => {
              return (
                <DevotionCard
                  key={"allDevotion-" + idx}
                  id={data.id}
                  imageSrc={data.image}
                  weekNo={data.weekNo}
                  title={data.title}
                  className="min-w-0"
                />
              );
            })}
      </div>
    </main>
  );
}
