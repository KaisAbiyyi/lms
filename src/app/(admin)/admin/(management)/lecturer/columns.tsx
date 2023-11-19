"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { ChangeEvent, FC, useEffect, useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Lecturer = {
  id: string
  lecturerNumber: string
  name: string
  email: string
}

interface EditableCellProps {
  value: any;
  row: any;
  column: any;
  table: any
}

export const EditableCell: FC<EditableCellProps> = ({
  value: initialValue,
  row: { index },
  column: { id },
  table,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleClick = () => {
      setIsEditing(!isEditing);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
  };

  const handleBlur = () => {
      table.options.meta?.updateData(index, id, value);
      setIsEditing(false);
  };

  useEffect(() => {
      setValue(initialValue);
  }, [initialValue]);

  return isEditing ? (
      <input
          className="p-4 w-full outline-none drop-shadow-xl z-40"
          value={value as string}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
      />
  ) : (
      <span className="p-4 block w-full" onDoubleClick={handleClick}>{value}</span>
  );
};


export const columns: ColumnDef<Lecturer>[] = [
  {
    accessorKey: "lecturerNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Lecturer Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
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
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
