"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Department } from "../department/columns"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowUpDown } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Faculty = {
  name: string
  departments: Array<Department>
}

export const columns: ColumnDef<Faculty>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "departments",
    accessorKey: "departments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Departments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const department: Array<Department> = row.original.departments
      const router = useRouter()
      return (
        <div className="flex flex-wrap gap-2">
          {department.map((item: Department) => (
            <Button
              type="button"
              variant={'secondary'}
              className="hover:bg-blue-500 hover:text-slate-100"
              size={"sm"}
              onClick={() => router.push(`/admin/department/${item.name.toLowerCase().replaceAll(' ', '-')}`)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      )
    }
  }
]
