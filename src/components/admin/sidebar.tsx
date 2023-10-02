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
        <div className="flex flex-col flex-grow gap-2 p-4 bg-slate-100">
            <Link href={'/'} className="px-4 text-lg font-bold">LMS</Link>
            <Link href={'/'} className={buttonVariants({ variant: 'ghost', class: '!justify-start' })}>Home</Link>
            <Accordion type="multiple">
                <AccordionItem value="item-1">
                    <AccordionTrigger className={buttonVariants({ variant: "ghost", class: '!justify-between !no-underline' })}>Is it accessible?</AccordionTrigger>
                    <AccordionContent className="flex flex-col">
                        <Link href={'/'} className={buttonVariants({ variant: 'ghost', class: '!justify-start' })}>Home</Link>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className={buttonVariants({ variant: "ghost", class: '!justify-between !no-underline' })}>Is it accessible?</AccordionTrigger>
                    <AccordionContent className="flex flex-col">
                        <Link href={'/'} className={buttonVariants({ variant: 'ghost', class: '!justify-start' })}>Home</Link>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </>)
}