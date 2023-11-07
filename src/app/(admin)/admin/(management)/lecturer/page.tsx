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
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
const formSchema = z.object({
  username: z.string().min(2).max(50),
})

export default function LecturerManagementPage() {
    const data: Array<Lecturer> = [
        {
            id: "1",
            name: "Agus komarudin",
            email: 'agk@gmail.com',
        }
    ]
    const form = useForm()
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
                            <CardHeader>
                                <Dialog>
                                    <DialogTrigger className={buttonVariants({ variant: "default" })}>ADD NEW</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Insert new Lecturer</DialogTitle>
                                        </DialogHeader>
                                        <DialogHeader>
                                            <Form>
                                                <FormField
                                                    control={form.control}
                                                    name="..."
                                                    render={() => (
                                                        <FormItem>
                                                            <FormLabel />
                                                            <FormControl>
                                                                { /* Your form field */}
                                                            </FormControl>
                                                            <FormDescription />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </Form>

                                        </DialogHeader>
                                        <DialogFooter>
                                            <Button>Submit</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
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