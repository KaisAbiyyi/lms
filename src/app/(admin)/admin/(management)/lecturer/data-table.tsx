"use client"

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCallback, useEffect, useRef, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { EditableCell, Lecturer } from "./columns"
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


const defaultColumn: Partial<ColumnDef<Lecturer>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
        const initialValue = getValue();
        return (
            <EditableCell
                value={initialValue}
                row={{ index }}
                column={{ id }}
                table={table}
            />
        );
    },
};

function useSkipper() {
    const shouldSkipRef = useRef(true)
    const shouldSkip = shouldSkipRef.current

    // Wrap a function with this to skip a pagination reset temporarily
    const skip = useCallback(() => {
        shouldSkipRef.current = false
    }, [])

    useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip] as const
}

const isNumeric = (str: string): boolean => {
    return /^\d+$/.test(str)
}

export function DataTable<TData extends Lecturer, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
    const [tableData, setData] = useState<TData[]>(data)

    const { toast } = useToast();
    const { mutate: UpdateData } = useMutation({
        mutationFn: async ({ id, lecturerNumber, name, email }: Lecturer) => await axios.post(`/api/admin/management/lecturer/${id}`, { lecturerNumber, name, email }),
        onSuccess: (data) => console.log('success'),
        onError: (err: any) => {
            toast({
                title: "Something went wrong",
                description: err?.response.data.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                variant: "destructive",
            })
        }
    })

    const table = useReactTable({
        data: tableData,
        columns: columns as ColumnDef<Lecturer, any>[],
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        meta: {
            updateData: (rowIndex: any, columnId: keyof Lecturer, value: any) => {
                // Skip page index reset until after next rerender
                skipAutoResetPageIndex()
                setData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            if (row[columnId] !== value) {
                                if (columnId === 'lecturerNumber' && isNumeric(value)) {
                                    UpdateData({ ...old[rowIndex]!, [columnId]: value })
                                    return {
                                        ...old[rowIndex]!,
                                        [columnId]: value,
                                    }
                                } else {
                                    toast({
                                        title: "Something went wrong",
                                        description: "Lecturer Number must be a number",
                                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                                        variant: "destructive",
                                    })
                                    return {
                                        ...old[rowIndex]!,
                                        [columnId]: row[columnId],
                                    }
                                }
                            }
                        }
                        return row
                    })
                )
            },
        },
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
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
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                className="hover:bg-muted/0"
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    const width: string = 100 / row.getVisibleCells().length + "%"
                                    return (
                                        <TableCell className="p-0 border hover:bg-muted/50" style={{ width }} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
