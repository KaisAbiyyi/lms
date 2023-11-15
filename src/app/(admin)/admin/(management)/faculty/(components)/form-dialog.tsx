"use client"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { ToastAction } from "@/components/ui/toast"
import { useState } from "react"
import SpinnerLoader from "@/components/misc/spinner"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name cannot be null"
    })
})

export default function FacultyFormDialog() {
    const { toast } = useToast();
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    const { mutate: submitReactHook, isLoading } = useMutation({
        mutationFn: async ({ name }: z.infer<typeof formSchema>) => await axios.post('/api/admin/management/faculty', { name }),
        onSuccess: (data) => {
            if (data.data.success) {
                queryClient.invalidateQueries(['adminFaculty'])
                setOpen(false)
            }
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

    return (
        <CardHeader>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className={buttonVariants({ variant: "default" })}>ADD NEW</DialogTrigger>
                <DialogContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) => submitReactHook(values))}>
                            <DialogHeader>
                                <DialogTitle>Insert new Lecturer</DialogTitle>
                            </DialogHeader>
                            <DialogHeader className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter faculty name here..." {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </DialogHeader>
                            <DialogFooter>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ?
                                        <SpinnerLoader /> :
                                        "Submit"
                                    }
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </CardHeader >
    )
}