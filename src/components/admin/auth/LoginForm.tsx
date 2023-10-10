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

const formSchema = z.object({
    email: z.string().min(1, {
        message: "Email cannot null.",
    }).email(),
    password: z.string().min(1, {
        message: "Password cannot null.",
    }),
})

export default function LoginForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // const res = await fetch('http://localhost:3000/api/admin/auth/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(values),
        // });

        // if (!res.ok) {
        //     throw new Error('Login failed');
        // }

        // const data = await res.json();
        // console.log(data)
        // return data;
        const { email, password } = values

    }
    const { mutate: submitReactHook, isLoading } = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => await axios.post('/api/admin/auth/login', { email: values.email, password: values.password }),
        onSuccess: (data) => console.log(data),
        onError: (err) => console.log(err)
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
                <Button type="submit" variant={"default"} className="w-full">Submit</Button>
            </form>
        </Form>
    )
}
