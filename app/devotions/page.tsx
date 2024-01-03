"use client";

import { Devotion } from "@/types";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Week = {
  week: number;
  name: string;
  date: string;
};

type Tag = { value: string; label: string };
type OriginalTag = { id: string; name: string };

export default function DevotionPage() {
  const searchParams = useSearchParams();

  const tagsQuery = searchParams.get("tags");

  const [allDevotion, setAllDevotion] = useState<Devotion[]>([]);
  const [week, setWeek] = useState<Week[]>([]);
  const [tag, setTag] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (tagsQuery) {
      let selectedQuery = tagsQuery.split(",").map((e) => {
        return { value: e, label: e };
      });
      setSelectedTags(selectedQuery);
    }
  }, [tagsQuery]);

  useEffect(() => {
    console.log(tagsQuery);
    if (selectedTags.length == 0) {
      getData();
    }
  }, [selectedTags]);

  const handleTagsChange = (newSelectedTags: Tag[]) => {
    console.log(newSelectedTags);
    setSelectedTags(newSelectedTags);
  };

  async function getData() {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/test`
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
    setTag(tagData);
  }

  useEffect(() => {
    getData();
    getWeek();
    getTag();
  }, []);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] px-6 pb-6">
      <h1 className="font-semibold text-xl text-center">All Devotions</h1>
      <DataTable
        columns={columns}
        data={allDevotion}
        weekData={week}
        tagData={tag}
        onTagsChange={handleTagsChange}
      />
    </main>
  );
}
