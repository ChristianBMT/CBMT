"use client";

// import Image from "next/image";
// import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DevotionCard from "@/components/devotion/DevotionCard";

export default function Home() {
  const router = useRouter();
  const [thisWeekDevotion, setThisWeekDevotion] = useState([]);
  const [allDevotion, setAllDevotion] = useState([]);

  useEffect(() => {}, []);

  return (
    <main className="min-h-100dvh flex flex-col mx-auto max-w-[500px] px-6">
      <h1 className="font-bold text-3xl"> Serving our Nation with Faith</h1>
      <h2 className="font-semibold text-xl mt-1">Devotions for BMT</h2>
      <div className="flex flex-col gap-2 my-2">
        <h3 className="font-bold">This Week</h3>
        <div className="flex overflow-x-scroll gap-3">
          <DevotionCard
            id={"idk"}
            imageSrc={"/DailyImage.webp"}
            weekNo={1}
            title={"Finding Strength in Trusting God"}
          />
          <DevotionCard
            id={"idk"}
            imageSrc={"/DailyImage.webp"}
            weekNo={2}
            title={"You are God's Soldier"}
          />
          <DevotionCard
            id={"idk"}
            imageSrc={"/DailyImage.webp"}
            weekNo={3}
            title={"Letting God Lead"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 my-2">
        <div className="flex justify-between items-center">
          <h3 className="font-bold">Past Devotions</h3>
          <div className="text-xs" onClick={() => router.push("/test")}>
            SEE ALL &gt;
          </div>
        </div>
        <div className="flex overflow-x-scroll gap-3">
          <DevotionCard
            id={"idk"}
            imageSrc={"/DailyImage.webp"}
            weekNo={1}
            title={"Finding Strength in Trusting God"}
          />
          <DevotionCard
            id={"idk"}
            imageSrc={"/DailyImage.webp"}
            weekNo={2}
            title={"You are God's Soldier"}
          />
          <DevotionCard
            id={"idk"}
            imageSrc={"/DailyImage.webp"}
            weekNo={3}
            title={"Letting God Lead"}
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
