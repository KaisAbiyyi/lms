"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { ChangeEvent, FC, useEffect, useState } from "react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Department = {
  id: string
  name: {
    value: string
    type: "text" | "link"
  }
  faculty: {
    value: string
    type: "text" | "link"
  }
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
  const [value, setValue] = useState(initialValue.value);
  const { toast } = useToast();
  const router = useRouter()

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
    setValue(initialValue.value);
  }, [initialValue.value]);

  if (isEditing) {
    return (
      <input
        className="p-4 w-full outline-none drop-shadow-xl z-40"
        value={value as string}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
      />
    )
  } else if (initialValue.type === 'link') {
    return (
      <div className="w-full flex px-2" onDoubleClick={handleClick}>
        <Button
          type="button"
          variant={'turnPrimary'}
          className="bg-secondary"
          size={"sm"}
          onClick={() => router.push(`/admin/department/${value.toLowerCase().replaceAll(' ', '-')}`)}
        >
          {value}
        </Button>
      </div>
    )
  }
  else {
    return (<span className="p-4 block w-full" onDoubleClick={handleClick}>{value}</span>)
  }
}

export const columns: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "faculty",
    header: "Faculty",
  }
]
