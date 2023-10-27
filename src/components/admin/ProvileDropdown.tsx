"use client"

import { useQuery } from "@tanstack/react-query";
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

export default function ProvileDropdown() {
    const token = getCookie('sms-session')
    const { isLoading, error, data } = useQuery({
        queryKey: ['getUser'],
        queryFn: async () => await axios.post("/api/auth", { token }),
    })

    if (error) console.log(error)
    if(isLoading) return "loading..."
    console.log(data)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
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
                <DropdownMenuItem>
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}