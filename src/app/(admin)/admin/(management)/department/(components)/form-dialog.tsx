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
import { Check, ChevronsUpDown, X } from "lucide-react"
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
    const [open, setOpen] = useState<boolean>(false)
    const [addFaculty, setAddFaculty] = useState<boolean>(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            faculty: "",
        }
    })

    const { mutate: submitReactHook, isLoading } = useMutation({
        mutationFn: async ({ name, faculty }: z.infer<typeof formSchema>) => await axios.post('/api/admin/management/department', { name, faculty }),
        onSuccess: (data) => {
            if (data.data.success) {
                queryClient.invalidateQueries(['adminDepartment'])
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
        value: item.name
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
                                            {addFaculty ?
                                                <div className="flex gap-4">
                                                    <FormControl>
                                                        <Input type="text" id="faculty" placeholder="Enter Faculty name here..." {...field} />
                                                    </FormControl>
                                                    <Button variant={"destructive"} onClick={() => setAddFaculty(false)} type="button"><X /></Button>
                                                </div> :
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
                                                                    : "Select Faculty"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Search faculty..." />
                                                            <CommandEmpty className="p-2 flex flex-col items-center gap-2">
                                                                <FormLabel>Didn't find what you're looking for?</FormLabel>
                                                                <Button type="button" className="w-full" onClick={() => setAddFaculty(true)}>Create New?</Button>
                                                            </CommandEmpty>
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
                                            }

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