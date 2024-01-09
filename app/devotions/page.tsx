"use client";

import { Devotion } from "@/types";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { useState, useEffect } from "react";

type Week = {
  week: number;
  name: string;
  date: string;
};

type Tag = { value: string; label: string };
type OriginalTag = { id: string; name: string };

export default function DevotionPage() {
  const [allDevotion, setAllDevotion] = useState<Devotion[]>([]);
  const [week, setWeek] = useState<Week[]>([]);
  const [tag, setTag] = useState<Tag[]>([]);

  async function getData() {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/devotions`
    );
    let data = await response.json();
    setAllDevotion(data);
  }

  async function getWeek() {
    let response = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + "/api/week"
    );
    let data: Week[] = await response.json();
    setWeek(data);
  }

  async function getTag() {
    let response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/tag");
    let data: OriginalTag[] = await response.json();
    let tagData: Tag[] = data.map((e: OriginalTag) => {
      return { value: e.name, label: e.name };
    });
    let tagName = data.map((e) => e.name);
    const index = tagName.indexOf("Enlistment");
    if (index > -1) {
      // Remove the specific string from its current position
      let pos = tagData.splice(index, 1)[0];

      // Add it to the front of the array
      tagData.unshift(pos);
    }
    setTag(tagData);
  }

  useEffect(() => {
    getData();
    getWeek();
    getTag();
  }, []);

  useEffect(() => {
    if (document) {
      document.title = "Christ in BMT";
    }
  }, []);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] px-6 pb-6">
      <h1 className="font-semibold text-xl text-center">All Devotions</h1>
      <DataTable
        columns={columns}
        data={allDevotion}
        weekData={week}
        tagData={tag}
      />
    </main>
  );
}
