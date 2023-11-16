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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { ToastAction } from "@/components/ui/toast"
import { useState } from "react"
import SpinnerLoader from "@/components/misc/spinner"
import { Popover, PopoverContent } from "@/components/ui/popover"
import { PopoverTrigger } from "@radix-ui/react-popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name cannot be null"
    }),
    faculty: z.string().min(1, {
        message: "Faculty cannot be null"
    })
})
type FacultyTipe = {
    label: string
    value: string
}

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

    const { data: facultyData, isLoading: facultyIsLoading } = useQuery({
        queryKey: ['adminFaculty'],
        queryFn: async () => {
            const { data } = await axios.get("/api/admin/management/faculty");
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

    const faculties: FacultyTipe[] = (facultyData?.map((item: any) => ({
        label: item.name,
        value: item.id
    })))

    return (
        <CardHeader>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className={buttonVariants({ variant: "default" })}>ADD NEW</DialogTrigger>
                <DialogContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) => submitReactHook(values))}>
                            <DialogHeader>
                                <DialogTitle>Insert new data</DialogTitle>
                            </DialogHeader>
                            <DialogHeader className="mt-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Enter name here..." {...field} />
                                            </FormControl>
                                            <FormDescription />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="faculty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Faculty</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "w-full justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? faculties.find(
                                                                    (faculty: FacultyTipe) => faculty.value === field.value
                                                                )?.label
                                                                : "Select language"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Search faculty..." />
                                                        <CommandEmpty>No data found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {faculties.map((faculty: FacultyTipe) => (
                                                                <CommandItem
                                                                    value={faculty.label}
                                                                    key={faculty.value}
                                                                    onSelect={() => {
                                                                        form.setValue("faculty", faculty.value)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            faculty.value === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {faculty.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
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