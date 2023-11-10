"use client"

import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuItem,
    DropdownMenuShortcut,

} from "../ui/dropdown-menu";

import { getCookie } from 'cookies-next'
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

export default function ProvileDropdown() {
    const router = useRouter()
    const token = getCookie('sms-session')
    const { mutate: logoutCall, isLoading: logoutLoading } = useMutation({
        mutationFn: async () => await axios.get('/api/admin/auth/logout'),
        onSuccess: (data) => router.push('/admin/login'),
        onError: (err: any) => {
            toast({
                title: "Something went wrong",
                description: err?.response.data.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                variant: "destructive",
            })
        }
    })
    
    const { data: UserProfile, isLoading, error } = useQuery({
        queryKey: ['getUser'],
        queryFn: async () => (await axios.get(`/api/auth/${token}`)).data
    })

    if (isLoading) return <Skeleton className="p-5 rounded-full" />

    if (error) return "Something went wrong ..."


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>{(UserProfile?.data.name[0]).toUpperCase()}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-fit mx-2">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logoutCall()}>
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}