"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Devotion } from "@/types";

export const columns: ColumnDef<Devotion>[] = [
  {
    id: "select",
    header: "Read",
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            let currentRead: { [key: string]: boolean } = JSON.parse(
              localStorage.getItem("read") || "{}"
            );
            let rowObj = row.original as Devotion;
            if (!!value) {
              currentRead[rowObj.id] = true;
              localStorage.setItem("read", JSON.stringify(currentRead));
            } else {
              delete currentRead[rowObj.id];
              localStorage.setItem("read", JSON.stringify(currentRead));
            }

            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      );
    },
  },
  {
    accessorKey: "weekNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Week
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (originalRow) => originalRow.weekNo.toString(),
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0"
        >
          Title
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "author",
    header: "Author",
    enableSorting: false,
    enableHiding: true,
  },
];
