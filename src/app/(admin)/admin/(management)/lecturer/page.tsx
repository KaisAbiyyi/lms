"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { DataTable } from "./data-table"
import { Lecturer, columns } from "./columns"
import { Input } from "@/components/ui/input"
import FormDialog from "@/components/admin/management/form-dialog"



export default function LecturerManagementPage() {
    const data: Array<Lecturer> = [
        {
            id: "1",
            name: "Agus komarudin",
            email: 'agk@gmail.com',
        }
    ]
    return (
        <>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-semibold text-slate-700">Lecturer</h1>
                <div className="flex gap-4">
                    <Card>
                        <CardHeader>
                            <CardDescription>Total</CardDescription>
                            <CardTitle>12</CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="flex-grow flex items-center">
                        <div className="flex w-full">
                            <CardHeader className="flex-grow">
                                <Input id="searchLecturer" placeholder="Search name..." type="text" />
                            </CardHeader>
                            <FormDialog />
                        </div>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>List of all lecturer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={data} />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}