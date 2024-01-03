"use client";

import { useState, useEffect, Suspense } from "react";
import { CategoryButton } from "@/components/CategoryButton";
import DevotionCard from "@/components/devotion/DevotionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Devotion } from "@/types";

type Tag = {
  id: string;
  name: string;
};

export default function DiscoverPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [tagData, setTagData] = useState<Tag[]>([]);
  const [devotionPlans, setDevotionPlans] = useState<{
    [key: string]: Devotion[];
  }>({});
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

  async function getDevotionData() {
    let response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/api/devotions/tag"
    );
    let data = await response.json();
    setDevotionPlans(data);
    // setDevotionPlans((prevState) => {
    //   let currentObj = { ...prevState };
    //   currentObj[tagName] = data;
    //   return currentObj;
    // });
  }

  useEffect(() => {
    getData();
    getDevotionData();
  }, []);

  // useEffect(() => {
  //   if (tagData) {
  //     for (let tag of tagData.filter((e) => !e.name.includes("Prayer for"))) {
  //       let tagName = tag.name;
  //       getDevotionData(tagName);
  //     }
  //   }
  // }, [tagData]);

  useEffect(() => {
    if (tagData && devotionPlans) {
      setLoading(false);
      // console.log(devotionPlans);
    }
  }, [tagData, devotionPlans]);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] px-6 gap-3">
      <h1 className=" font-bold text-2xl mt-2">Discover</h1>
      <h3 className="font-bold">Search by Topic</h3>
      <div className="grid grid-rows-2 grid-flow-col justify-start items-center gap-4 overflow-auto w-full">
        <Suspense
          fallback={
            <>
              {[...new Array(8)].map((_, idx) => {
                return (
                  <Skeleton
                    className="h-10 w-[125px] rounded-md"
                    key={"SkeletonKey" + idx}
                  />
                );
              })}
            </>
          }
        >
          {tagData
            .filter((e) => e.name.includes("Prayer for"))
            .map((value, idx) => {
              let btnColor = color[idx % color.length];
              return (
                <CategoryButton
                  color={btnColor}
                  text={value.name.replace("Prayer for", "")}
                  key={"Category" + value.id}
                  href={`/devotions/tag/${value.name}`}
                />
              );
            })}
        </Suspense>
        {/* {loading
          ? [...new Array(8)].map((_, idx) => {
              return (
                <Skeleton
                  className="h-10 w-[125px] rounded-md"
                  key={"SkeletonKey" + idx}
                />
              );
            })
          : tagData
              .filter((e) => e.name.includes("Prayer for"))
              .map((value, idx) => {
                let btnColor = color[idx % color.length];
                return (
                  <CategoryButton
                    color={btnColor}
                    text={value.name.replace("Prayer for", "")}
                    key={"Category" + value.id}
                    href={`/devotions/tag/${value.name}`}
                  />
                );
              })} */}
      </div>
      <div className="mt-3 flex flex-col gap-3 mb-5">
        <h3 className="font-semibold text-xl">Browse Devotion Plans</h3>
        {loading ? (
          <div className="flex flex-col gap-3 mb-2">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-full max-w-[100px]" />
              <div className="text-xs">SEE ALL &gt;</div>
            </div>
            <div className="flex overflow-x-scroll gap-3 h-[189px]">
              {[...new Array(5)].map((_, idx) => (
                <div
                  className={"flex flex-col min-w-[125px] w-[125px] gap-1"}
                  key={"skeleton" + idx}
                >
                  <Skeleton className="aspect-square w-full object-cover object-center rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          Object.keys(devotionPlans).map((key, idx) => {
            if (devotionPlans[key].length == 0 || key.includes("Prayer for")) {
              return;
            }
            return (
              <div className="flex flex-col gap-3 mb-2" key={"wrapper" + idx}>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{key}</h3>
                  <div
                    className="text-xs"
                    onClick={() => router.push(`/devotions/tag/${key}`)}
                  >
                    SEE ALL &gt;
                  </div>
                </div>
                <div className="flex overflow-x-scroll gap-3 h-[189px]">
                  {devotionPlans[key]
                    .slice(0, Math.min(devotionPlans[key].length, 5))
                    .map((data, idx) => {
                      return (
                        <DevotionCard
                          key={"devotion-" + key + idx}
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
            );
          })
        )}
      </div>
    </main>
  );
}
