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
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react"
import { Lecturer } from "@prisma/client"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

interface EditableCellProps {
    value: any;
    row: any;
    column: any;
    table: any
}

const EditableCell: FC<EditableCellProps> = ({
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
            value={value as string}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
        />
    ) : (
        <span onDoubleClick={handleClick}>{value}</span>
    );
};


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

export function DataTable<TData extends Lecturer, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
    const [tableData, setData] = useState<TData[]>(data)
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
            updateData: (rowIndex: any, columnId: any, value: any) => {
                // Skip page index reset until after next rerender
                skipAutoResetPageIndex()
                setData(old =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
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
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
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
