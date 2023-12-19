"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [devotionDate, setDevotionDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    setDevotionDate(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
    );
  }, []);

  return (
    <main className="min-h-100dvh flex flex-col mx-auto max-w-[500px] px-6">
      <h1 className="font-bold text-3xl"> Serving our Nation with Faith</h1>
      <h6 className="font-semibold text-xl mt-1">Devotions for BMT</h6>
      <div className="relative my-5">
        <Image
          className="w-full rounded-lg shadow-xl aspect-[3/2] object-cover"
          src="/DailyImage.webp"
          width={500}
          height={500}
          alt="today"
        />
        <div className="absolute top-0 left-0 p-4 text-white text-left">
          <div className="text-2xl font-bold">Today's Devotion</div>
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
        {[...new Array(4)].map((val, idx) => {
          return (
            <div className="">
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
      </div>
    </main>
  );
}
