"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lecturer = {
  id: string
  lecturerNumber: string
  name: string
  email: string
}

export const columns: ColumnDef<Lecturer>[] = [
  {
    accessorKey: "lecturerNumber",
    header: "Lecturer Number",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
]
