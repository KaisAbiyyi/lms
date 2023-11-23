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
import { Department, EditableCell } from "./columns"
import { useMutation } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

const defaultColumn: Partial<ColumnDef<Department>> = {
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

export function DataTable<TData extends Department, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
    const [tableData, setData] = useState<TData[]>(data)

    const { toast } = useToast();
    const { mutate: UpdateData } = useMutation({
        mutationFn: async ({
            id: { type: idType, value: idValue },
            name: { type: nameType, value: nameValue },
            faculty: { type: facultyType, value: facultyValue } }: Department) => await axios.post(`/api/admin/management/department/${idValue}`, {
                name: nameValue,
                faculty: facultyValue
            }),
        onSuccess: (data) => toast({
            title: "Data Updated",
            description: "Data updated successfuly.",
            variant: "success"
        }),
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
        columns: columns as ColumnDef<Department, any>[],
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        defaultColumn,
        meta: {
            updateData: (rowIndex: any, columnId: keyof Department, value: any) => {
                // Skip page index reset until after next rerender
                skipAutoResetPageIndex()
                setData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            if (row[columnId].value !== value) {
                                UpdateData({
                                    ...old[rowIndex]!,
                                    [columnId]: {
                                        type: row[columnId].type,
                                        value
                                    }
                                })
                                return {
                                    ...old[rowIndex]!,
                                    [columnId]: {
                                        value,
                                        type: row[columnId].type
                                    },
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
