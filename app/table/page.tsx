
import React from "react";
import { Header, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Header[]> {
    // Mock data
    return [
      {
        weekNumber: 1,
        title: "Book One Thousand Two Hundred",
        author: "Author A",
        completed: false,
      },
      {
        weekNumber: 2,
        title: "Book Two",
        author: "Author B",
        completed: true,
      },
      {
        weekNumber: 3,
        title: "Book Three",
        author: "Author C",
        completed: false,
      },
      {
        weekNumber: 4,
        title: "Book Four",
        author: "Author D",
        completed: true,
      },
      {
        weekNumber: 5,
        title: "Book Five",
        author: "Author E",
        completed: false,
      },
    ];
  }
  
  

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
