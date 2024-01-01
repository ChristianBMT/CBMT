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

export default function DevotionPage() {
  const [allDevotion, setAllDevotion] = useState<Devotion[]>([]);
  const [week, setWeek] = useState<Week[]>([]);
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

  useEffect(() => {
    getData();
    getWeek();
  }, []);

  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] px-6 pb-6">
      <h1 className="font-semibold text-xl text-center">All Devotions</h1>
      <DataTable columns={columns} data={allDevotion} weekData={week} />
    </main>
  );
}
