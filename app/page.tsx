"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-100dvh flex flex-col mx-auto max-w-[500px] px-6">
      <h1 className="font-bold text-3xl">Serving our Nation with Faith</h1>
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
          <div
            className="text-2xl font-bold"
            style={{ textShadow: "2px 2px 5px rgba(0,0,0,50)" }}
          >
            Today&apos;s Devotion
          </div>
          <div
            className="text-xl"
            style={{ textShadow: "0px 0px 5px rgba(0,0,0,50)" }}
          >
            Read and be encouraged
          </div>
        </div>
        <div className="absolute p-4 bottom-0 right-0">
          <Button onClick={() => router.push("/devotions")} variant={"outline"}>
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
      </div>
    </main>
  );
}
