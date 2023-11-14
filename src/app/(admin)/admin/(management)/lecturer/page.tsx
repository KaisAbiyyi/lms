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
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { table } from "console"
import SpinnerLoader from "@/components/misc/spinner"



export default function LecturerManagementPage() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["adminLecturer"],
        queryFn: async () => {
            const { data } = await axios.get('/api/admin/management/lecturer');
            return data.data
        }
    })
    const tableData = data?.map((item: any) => ({
        id: item.id,
        lecturerNumber: item.lecturerNumber,
        name: item.name,
        email: item.User.email
    }))

    return (
        <>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-semibold text-slate-700">Lecturer</h1>
                <div className="flex gap-4">
                    <Card>
                        <CardHeader>
                            <CardDescription>Total</CardDescription>
                            <CardTitle>
                                {isLoading ? <SpinnerLoader /> : data.length}
                            </CardTitle>
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
                        {isLoading ?
                            <SpinnerLoader /> :
                            <DataTable columns={columns} data={tableData} />
                        }
                    </CardContent>
                </Card>
            </div>
        </>
    )
}