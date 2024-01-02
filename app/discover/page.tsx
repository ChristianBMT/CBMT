"use client";

import { useState, useEffect } from "react";
import CategoryBtn from "@/components/CategoryBtn";
import { CategoryButton } from "@/components/CategoryButton";
import DevotionCard from "@/components/devotion/DevotionCard";
import { Skeleton } from "@/components/ui/skeleton";

type Tag = {
  id: string;
  name: string;
};

export default function discoverPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [tagData, setTagData] = useState<Tag[]>([]);
  const color = [
    "red",
    "violet",
    "blue",
    "yellow",
    "pink",
    "green",
    "purple",
    "orange",
    "indigo",
  ];

  async function getData() {
    let response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/tag");
    let data = await response.json();
    setTagData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [tagData]);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] px-6">
      <div className=" font-bold text-2xl">Discover</div>
      <div className="grid grid-rows-2 grid-flow-col justify-start items-center gap-4 overflow-auto w-full py-3">
        {loading
          ? [...new Array(8)].map((_, idx) => {
              return (
                <Skeleton
                  className="h-10 w-[125px] rounded-md"
                  key={"SkeletonKey" + idx}
                />
              );
            })
          : tagData.map((value, idx) => {
              console.log(idx);
              let btnColor = color[idx % color.length];
              return (
                <CategoryButton
                  color={btnColor}
                  text={value.name}
                  key={"Category" + idx}
                  href={value.id}
                />
              );
            })}
      </div>
      <div>
        <div className="font-semibold text-xl mb-5 mt-2">
          Browse Other Plans
        </div>
        <div className="flex flex-row space-x-7 overflow-x-auto whitespace-nowrap">
          {/* Multiple DevotionCard components are placed here */}
          <DevotionCard
            id={"idk1"}
            imageSrc={"/DailyImage.webp"}
            weekNo={1}
            title={"Finding Strength in Trusting God"}
          />
          <DevotionCard
            id={"idk2"}
            imageSrc={"/DailyImage.webp"}
            weekNo={2}
            title={"Embracing Hope in Times of Uncertainty"}
          />
          <DevotionCard
            id={"idk3"}
            imageSrc={"/DailyImage.webp"}
            weekNo={3}
            title={"Embracing Hope in Times of Uncertainty"}
          />
          <DevotionCard
            id={"idk4"}
            imageSrc={"/DailyImage.webp"}
            weekNo={4}
            title={"Embracing Hope in Times of Uncertainty"}
          />
          <DevotionCard
            id={"idk5"}
            imageSrc={"/DailyImage.webp"}
            weekNo={5}
            title={"Embracing Hope in Times of Uncertainty"}
          />
        </div>
      </div>
    </main>
  );
}
