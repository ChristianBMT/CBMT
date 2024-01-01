import { Devotion } from "@/types";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";

async function getData(): Promise<Devotion[]> {
  let response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/api/devotions"
  );
  let data: Devotion[] = await response.json();
  return data;
}

type Week = {
  week: number;
  name: string;
  date: string;
};

async function getWeek(): Promise<Week[]> {
  let response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/week");
  let data: Week[] = await response.json();
  console.log(data);
  return data;
}

export default async function DevotionPage() {
  const data = await getData();
  const week = await getWeek();
  return (
    <main className="min-h-[calc(100dvh-48px)] flex flex-col mx-auto max-w-[500px] px-6 pb-6">
      <h1 className="font-semibold text-xl text-center">All Devotions</h1>
      <DataTable columns={columns} data={data} weekData={week} />
    </main>
  );
}
