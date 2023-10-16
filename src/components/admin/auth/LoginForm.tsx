"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const formSchema = z.object({
    email: z.string().min(1, {
        message: "Email cannot null.",
    }).email(),
    password: z.string().min(1, {
        message: "Password cannot null.",
    }),
    rememberMe: z.boolean().default(false).optional()
})

export default function LoginForm() {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: '',
            rememberMe: false
        },
    })
    const { mutate: submitReactHook, isLoading } = useMutation({
        mutationFn: async ({ email, password, rememberMe }: z.infer<typeof formSchema>) => await axios.post('/api/admin/auth/login', { email, password, rememberMe }),
        onSuccess: (data) => router.push('/admin'),
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values: z.infer<typeof formSchema>) => submitReactHook(values))} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Enter your email here..." {...field} />
                            </FormControl>
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
                            <FormControl>
                                <Input type="password" placeholder="Enter your password here..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormLabel>
                                Remember Me?
                            </FormLabel>
                        </FormItem>
                    )}
                />
                <Button type="submit" variant={"default"} className="w-full">Submit</Button>
            </form>
        </Form>
    )
}
