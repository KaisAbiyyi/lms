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
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import SpinnerLoader from "@/components/misc/spinner"

const formSchema = z.object({
    lecturerNumber: z.string().min(1, {
        message: "Lecturer Number cannot be null"
    }),
    name: z.string().min(1, {
        message: "Name cannot be null"
    }),
    email: z.string().min(1, {
        message: "Email cannot null",
    }).email(),
    password: z.string().min(8, {
        message: "Password must at least 8 character long"
    }).regex(/^(?=.*[0-9]).{8,24}$/, {
        message: 'Password must contain at least one number'
    }).regex(/^(?=.*[a-z]).{8,24}$/, {
        message: 'Password must contain at least one lowercase letter'
    }).regex(/^(?=.*[A-Z]).{8,24}$/, {
        message: 'Password must contain at least one uppercase letter'
    }).regex(/^(?=.*[!@#$%^&]).{8,24}$/, {
        message: 'Password must contain at least one special character'
    })
})

export default function FormDialog() {
    const { toast } = useToast();
    const queryClient = useQueryClient()
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [open, setOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lecturerNumber: "",
            name: "",
            email: "",
            password: "",
        }
    })

    const generatePassword = () => {
        let password = ""
        // Define data for each char type
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const uppercase = lowercase.toUpperCase();
        const numbers = "0123456789";
        const symbols = "!@#$%^&*";

        // Ensure at least one of each char type
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
        password += numbers.charAt(Math.floor(Math.random() * numbers.length));
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));

        // Fill rest with random chars
        for (let i = 0; i < 8; i++) {
            const chars = lowercase + uppercase + numbers + symbols;
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        form.setValue("password", password);
        setShowPassword(true);
    }

    const { mutate: submitReactHook, isLoading } = useMutation({
        mutationFn: async ({ lecturerNumber, name, email, password }: z.infer<typeof formSchema>) => await axios.post('/api/admin/management/lecturer', { lecturerNumber, name, email, password }),
        onSuccess: (data) => {
            if (data.data.success) {
                queryClient.invalidateQueries(['adminLecturer'])
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
                                            <FormLabel>Name</FormLabel>
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
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
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

                                            <FormLabel>Password</FormLabel>
                                            <Button variant="secondary" type="button" onClick={generatePassword} className="block">Generate Password</Button>
                                            <FormControl>
                                                <Input type={showPassword ? 'text' : 'password'} placeholder="Enter lecturer email here..." {...field} />
                                            </FormControl>
                                            <div className="flex gap-2">
                                                <Checkbox id="show_password" checked={showPassword} onClick={() => setShowPassword(!showPassword)} />
                                                <Label htmlFor="show_password">Show Password?</Label>
                                            </div>
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