"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { DataTable } from "./data-table"
import { Department, columns } from "./columns"
import { Input } from "@/components/ui/input"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import SpinnerLoader from "@/components/misc/spinner"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import FacultyFormDialog from "./(components)/form-dialog"



export default function DepartmentManagementPage() {
    const { toast } = useToast()
    const { data, isLoading } = useQuery({
        queryKey: ["adminDepartment"],
        queryFn: async () => {
            const { data } = await axios.get('/api/admin/management/department');
            return data.data
        },
        onError: (err: any) => {
            toast({
                title: "Something went wrong",
                description: err?.response.data.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                variant: "destructive",
            })
        }
    })

    const tableData: Department[] = data?.map((item: any) => ({
        id: {
            value: item.id,
            type: "text"
        },
        name: {
            value: item.name,
            type: "text"
        },
        faculty: {
            value: item.Faculty.name,
            type: "link"
        }
    }))

    return (
        <>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-semibold text-slate-700">Department</h1>
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
                                <Input id="searchDepartment" placeholder="Search name..." type="text" />
                            </CardHeader>
                            <FacultyFormDialog />
                        </div>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>List of Department</CardTitle>
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