"use client"

import Link from "next/link"
import { buttonVariants } from "../ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function AdminSidebar() {
    return (<>
        <div className="flex flex-col flex-grow h-screen gap-2 p-4 bg-slate-100">
            <Link href={'/'} className="px-4 text-lg font-bold">LMS</Link>
            <Link href={'/'} className={buttonVariants({ variant: 'ghost', class: '!justify-start' })}>Home</Link>
            <Accordion type="multiple">
                <AccordionItem value="item-1" className="!border-none">
                    <AccordionTrigger className={buttonVariants({ variant: "ghost", class: '!justify-between !no-underline' })}>Manage</AccordionTrigger>
                    <AccordionContent className="flex flex-col p-2">
                        <Link href={'/'} className={buttonVariants({ variant: 'ghost', class: '!justify-start w-full' })}>User</Link>
                        <Link href={'/'} className={buttonVariants({ variant: 'ghost', class: '!justify-start w-full' })}>Student</Link>
                        <Link href={'/'} className={buttonVariants({ variant: 'ghost', class: '!justify-start w-full' })}>Lecturer</Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </>)
}