"use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DevotionCard from "@/components/devotion/DevotionCard";
import { Devotion } from "@/types";

export default function Home() {
  const router = useRouter();
  const [thisWeekDevotion, setThisWeekDevotion] = useState<Devotion[]>([]);
  const [allDevotion, setAllDevotion] = useState<Devotion[]>([]);
  const [week, setWeek] = useState<number>(0);

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

  return (
    <main className="min-h-100dvh flex flex-col mx-auto max-w-[500px] px-6">
      <h1 className="font-bold text-3xl">Serving our Nation with Faith</h1>
      <h2 className="font-semibold text-xl mt-1">Devotions for BMT</h2>
      <div className="flex flex-col gap-2 my-2 md:my-3">
        <h3 className="font-bold">This Week</h3>
        <div className="flex overflow-x-scroll gap-3">
          {thisWeekDevotion.map((data, idx) => {
            return (
              <DevotionCard
                key={"weekDevotion-" + idx}
                id={data.id}
                imageSrc={"/DailyImage.webp"}
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
        <div className="flex overflow-x-scroll gap-3">
          {allDevotion.map((data, idx) => {
            return (
              <DevotionCard
                key={"allDevotion-" + idx}
                id={data.id}
                imageSrc={"/DailyImage.webp"}
                weekNo={data.weekNo}
                title={data.title}
                className="w-[125px]"
              />
            );
          })}
        </div>
      </div>
      {/* <div className="relative my-5">
        <Image
          className="w-full rounded-lg shadow-xl aspect-[3/2] object-cover"
          src="/DailyImage.webp"
          width={500}
          height={500}
          alt="today"
        />
        <div className="absolute top-0 left-0 p-4 text-white text-left">
          <div className="text-2xl font-bold">Today&apos;s Devotion</div>
          <div className="text-xl">Read and be encouraged</div>
        </div>
        <div className="absolute p-4 bottom-0 right-0">
          <Button
            onClick={() => router.push(`/devotions/${devotionDate}`)}
            variant={"outline"}
          >
            Read
          </Button>
        </div>
      </div>
      <h3 className="font-semibold text-xl">Browse Devotion Plans</h3>
      <div className="grid grid-cols-2 my-3 gap-4">
        {[...new Array(4)].map((_, idx) => {
          return (
            <div key={"DevotionImage" + idx}>
              <Image
                className="w-full rounded-lg shadow-xl aspect-[3/2] object-cover"
                src={`/Devotion${idx + 1}.jpeg`}
                width={500}
                height={500}
                alt="today"
              />
            </div>
          );
        })}
      </div> */}
    </main>
  );
}
