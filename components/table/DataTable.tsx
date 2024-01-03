"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Devotion } from "@/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaSearch } from "react-icons/fa";
import { MultiSelect } from "@/components/MultiSelect";

type Week = {
  week: number;
  name: string;
  date: string;
};

type Tag = { value: string; label: string };

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  weekData: Week[];
  tagData: Tag[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  weekData,
  tagData,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();

  const tagsQuery = searchParams.get("tags");

  useEffect(() => {
    if (tagsQuery && tagData) {
      let selectedQuery = [];
      for (let e of tagsQuery.split(",")) {
        if (
          tagData
            .map((tag) => {
              return tag.value;
            })
            .some((tag) => {
              return tag == e;
            })
        ) {
          selectedQuery.push({ value: e, label: e });
          continue;
        }
      }
      setSelectedTags(selectedQuery);
    }
  }, [tagData, tagsQuery]);

  const router = useRouter();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleTagsChange = (newSelectedTags: Tag[]) => {
    setSelectedTags(newSelectedTags);
    console.log(newSelectedTags);
    if (newSelectedTags.length == 0) {
      table.getColumn("tag")?.setFilterValue(undefined);
    } else {
      table.getColumn("tag")?.setFilterValue(
        newSelectedTags.map((e) => {
          return e.value;
        })
      );
    }
  };

  useEffect(() => {
    console.log(weekData);
    let currentRead: { [key: string]: boolean } = JSON.parse(
      localStorage.getItem("read") || "{}"
    );
    setRowSelection(currentRead);
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility: { tag: false },
    },
    getRowId: (row) => {
      let rowValue = row as Devotion;
      return rowValue.id;
    },
  });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col justify-center items-center py-4 w-full gap-2">
        <div className="flex w-full max-w-sm items-center space-x-2 mr-auto">
          <FaSearch className="w-5 h-5 flex items-center justify-center aspect-square m-1" />
          <Input
            placeholder="Filter titles..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="mr-auto"
          />
        </div>
        <MultiSelect
          tagData={tagData}
          selectedTags={selectedTags}
          onTagsChange={handleTagsChange}
        ></MultiSelect>
        <div className="flex justify-between w-full gap-3">
          <Select
            defaultValue="all"
            onValueChange={(value) => {
              console.log(value);
              if (value == "all") {
                setColumnFilters([]);
                return;
              } else {
                table.getColumn("weekNo")?.setFilterValue(value);
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by weeks" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Weeks</SelectItem>
                {weekData.map((week, idx) => {
                  return (
                    <SelectItem
                      value={week.week.toString()}
                      key={week.week + " " + idx}
                    >
                      Week {week.week}: {week.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2">
            <Switch
              id="showRead"
              onCheckedChange={(value) => {
                setUnreadOnly(value);
              }}
            />
            <Label htmlFor="showRead">Show Unread Only</Label>
          </div>
        </div>
      </div>
      <Table className="rounded-md border border-zinc-200 dark:border-zinc-800">
        <TableHeader className="[&_tr]:border-b-zinc-200 [&_tr]:dark:border-b-zinc-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="[&_tr]:border-b-zinc-200 [&_tr]:dark:border-b-zinc-800">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              let rowObj = row.original as Devotion;
              let isEvenWeek = rowObj.weekNo % 2 == 0;
              return (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    isEvenWeek ? "bg-zinc-200/25 dark:bg-zinc-800/25" : "",
                    unreadOnly && row.getIsSelected() ? "hidden" : ""
                  )}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        onClick={(e) => {
                          if (cell.id.includes("_select")) {
                            let element = e.target as HTMLElement;
                            console.log(element.tagName);
                            return;
                          }
                          return router.push(`/devotions/${rowObj.id}`);
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {data.length > 0 && table.getFilteredRowModel().rows.length == 0
                  ? "No Results Found"
                  : "Loading Results..."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 w-full">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} devotion(s) read
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary" className="ml-auto">
            Clear Read History
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-xs">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              This action cannot be undone. This will permanently remove all
              your read history from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                localStorage.setItem("read", "{}");
                setRowSelection({});
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
