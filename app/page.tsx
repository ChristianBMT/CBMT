"use client";

import React, { useState, useEffect } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Tag = { id: string; name: string };

export default function Home() {
  const router = useRouter();
  const [tagData, setTagData] = useState<Tag[]>([]);

  async function getTag() {
    let response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/tag");
    let data: Tag[] = await response.json();
    let tagName = data.map((e) => e.name);
    const index = tagName.indexOf("Enlistment");
    if (index > -1) {
      let pos = data.splice(index, 1)[0];
      data.unshift(pos);
    }
    setTagData(data);
  }

  useEffect(() => {
    if (document) {
      document.title = "Christ in BMT";
    }
    getTag();
  }, []);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] px-6 mb-6">
      <h1 className="font-bold text-3xl">Serving our Nation with Faith</h1>
      <h6 className="font-semibold text-xl mt-1">Devotions for BMT</h6>
      <div className="relative my-5">
        <Image
          className="w-full rounded-lg shadow-xl aspect-[3/2] object-cover bg-gray-500/50"
          src="/DailyImage.webp"
          width={500}
          height={500}
          alt="today"
          priority={true}
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
      <h3 className="font-semibold text-xl">Browse Devotion Topics</h3>
      <div className="grid grid-cols-2 my-3 gap-4">
        {tagData.map((value, idx) => {
          return (
            <div
              key={"DevotionImage" + idx}
              className="w-full h-full relative border rounded-lg dark:border-white/50 border-black/50 hover:cursor-pointer"
              onClick={() => router.push(`/devotions?tags=${value.name}`)}
            >
              <h5 className="w-full text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 font-bold text-white">
                {value.name}
              </h5>
              <Image
                className="blur-[1.5px] brightness-50 w-full rounded-lg shadow-xl aspect-[3/2] object-cover"
                src={`/Devotion${(idx % 4) + 1}.jpeg`}
                width={500}
                height={500}
                alt="today"
                priority={true}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
