'use client'

import { ColumnDef } from "@tanstack/react-table"

export type Header = {
  weekNumber: number
  title: string
  author: string
  completed: boolean
}

export const columns: ColumnDef<Header>[] = [
  {
    id: 'completed',
    header: 'Completed',
    cell: ({ row }) => (
      <input 
        type="checkbox" 
        checked={row.original.completed}
        onChange={() => {console.log("changed")}} 
      />
    ),
  },
  {
    accessorKey: 'weekNumber',
    header: 'Week',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
]
