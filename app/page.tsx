"use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DevotionCard from "@/components/devotion/DevotionCard";
import { Devotion } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const router = useRouter();
  const [thisWeekDevotion, setThisWeekDevotion] = useState<Devotion[]>([]);
  const [allDevotion, setAllDevotion] = useState<Devotion[]>([]);
  const [week, setWeek] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  async function getData() {
    let weekResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/week`
    );
    let weekData = await weekResponse.json();
    setWeek(weekData.currentWeek);
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
    setThisWeekDevotion(
      allDevotion.filter((e) => {
        return e.weekNo == week;
      })
    );
  }, [allDevotion, week]);

  useEffect(() => {
    setLoading(false);
  }, [allDevotion, week, thisWeekDevotion]);

  return (
    <main className="min-h-100dvh flex flex-col mx-auto max-w-[500px] px-6">
      <h1 className="font-bold text-3xl">Serving our Nation with Faith</h1>
      <h2 className="font-semibold text-xl mt-1">Devotions for BMT</h2>
      <div className="flex flex-col gap-2 my-2 md:my-3">
        <h3 className="font-bold">This Week</h3>
        <div className="flex overflow-x-scroll gap-3 h-[189px]">
          {thisWeekDevotion.length == 0 || loading
            ? [...new Array(3)].map((_, idx) => (
                <div
                  className={"flex flex-col min-w-[125px] w-[125px] gap-1"}
                  key={"thisSkeleton" + idx}
                >
                  <Skeleton className="aspect-square w-full object-cover object-center rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            : thisWeekDevotion.map((data, idx) => {
                return (
                  <DevotionCard
                    key={"weekDevotion-" + idx}
                    id={data.id}
                    imageSrc={data.image}
                    weekNo={data.weekNo}
                    title={data.title}
                    className="w-[125px]"
                  />
                );
              })}
        </div>
      </div>
      <div className="flex flex-col gap-2 my-2 md:my-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Past Devotions</h3>
          <div className="text-xs" onClick={() => router.push("/devotions")}>
            SEE ALL &gt;
          </div>
        </div>
        <div className="flex overflow-x-scroll gap-3  h-[189px]">
          {loading || allDevotion.length == 0
            ? [...new Array(5)].map((_, idx) => (
                <div
                  className={"flex flex-col min-w-[125px] w-[125px] gap-1"}
                  key={"allSkeleton" + idx}
                >
                  <Skeleton className="aspect-square w-full object-cover object-center rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            : allDevotion
                .slice(0, Math.min(allDevotion.length, 5))
                .map((data, idx) => {
                  return (
                    <DevotionCard
                      key={"allDevotion-" + idx}
                      id={data.id}
                      imageSrc={data.image}
                      weekNo={data.weekNo}
                      title={data.title}
                      className="w-[125px]"
                    />
                  );
                })}
        </div>
      </div>
    </main>
  );
}
