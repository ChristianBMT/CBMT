"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [postDate, setPostDate] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    setPostDate(
      `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`
    );
  }, []);

  return (
    <div className="min-h-100dvh p-3">
      <main className="flex flex-col mx-auto max-w-[500px] px-2 py-2">
        <h1 className="font-bold text-4xl">
          Transforming your walk with Christ
        </h1>
        <h6 className="font-semibold text-xl">Start your journey today!</h6>
        <div className="relative my-5">
          <Image
            className="w-full rounded-lg shadow-xl aspect-[3/2] object-cover"
            src="/DailyImage.webp"
            width={100}
            height={100}
            alt="today"
          />
          <div className="absolute top-0 left-0 p-4 text-white text-left">
            <div className="text-2xl font-bold">Today's Devotion</div>
            <div className="text-xl">Read and be encouraged</div>
          </div>
          <div className="absolute p-4 bottom-0 right-0">
            <Button
              onClick={() => router.push(`/devotions/${postDate}`)}
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
                  width={100}
                  height={100}
                  alt="today"
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
