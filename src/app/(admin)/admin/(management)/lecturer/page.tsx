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
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    lecturerNumber: z.string().min(1, {
        message: "Lecturer Number cannot be null"
    }),
    name: z.string().min(1, {
        message: "Name cannot be null"
    }),
    username: z.string().min(1, {
        message: "Username cannot be null"
    }),
    email: z.string().min(1, {
        message: "Email cannot null.",
    }).email(),
    password: z.string().min(1, {
        message: "Password cannot null.",
    }),
})

export default function LecturerManagementPage() {
    const data: Array<Lecturer> = [
        {
            id: "1",
            name: "Agus komarudin",
            email: 'agk@gmail.com',
        }
    ]
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lecturerNumber: "",
            name: "",
            username: "",
            email: "",
            password: "",
        }
    })
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
                                            <Form {...form}>
                                                <FormField
                                                    control={form.control}
                                                    name="lecturerNumber"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Lecturer Number</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" placeholder="Enter lecturer number here..." {...field} />
                                                            </FormControl>
                                                            <FormDescription />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Lecturer Name</FormLabel>
                                                            <FormControl>
                                                                <Input type="text" placeholder="Enter lecturer name here..." {...field} />
                                                            </FormControl>
                                                            <FormDescription />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="username"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Lecturer Username</FormLabel>
                                                            <FormControl>
                                                                <Input type="text" placeholder="Enter lecturer username here..." {...field} />
                                                            </FormControl>
                                                            <FormDescription />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Lecturer Email</FormLabel>
                                                            <FormControl>
                                                                <Input type="email" placeholder="Enter lecturer email here..." {...field} />
                                                            </FormControl>
                                                            <FormDescription />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Lecturer Password</FormLabel>
                                                            <FormControl>
                                                                <Input type="email" placeholder="Enter lecturer password here..." {...field} />
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