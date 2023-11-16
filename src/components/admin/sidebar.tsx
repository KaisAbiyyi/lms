"use client"

import Link from "next/link"
import { buttonVariants } from "../ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { usePathname } from "next/navigation"
import HomeIcon from "../icons/HomeIcon"
import DatabaseIcon from "../icons/DatabaseIcon"

export default function AdminSidebar() {
    const router = usePathname()

    return (<>
        <div className="flex flex-col flex-grow h-screen gap-2 p-4 bg-slate-100">
            <Link href={'/admin'} className="px-4 text-lg font-bold">LMS</Link>
            <Link
                href={'/admin'}
                className={`${buttonVariants({ variant: 'ghost', class: '!justify-start' })} ${router === '/admin' && buttonVariants({ variant: "default" })}`}>
                <HomeIcon size={16} className="mr-2 h-4 w-4" />
                Home
            </Link>
            <Accordion type="multiple">
                <AccordionItem value="item-1" className="!border-none">
                    <AccordionTrigger className={buttonVariants({ variant: "ghost", class: '!justify-between !no-underline' })}>
                        <div className="flex items-center">
                            <DatabaseIcon size={16} className="mr-2 h-4 w-4" />
                            Manage
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col p-2 mt-4 bg-slate-200 rounded-lg gap-2">
                            <Link href={'/'} className={buttonVariants({ variant: 'white', class: '!justify-start w-full' })}>User</Link>
                            <Link href={'/admin/lecturer'} className={buttonVariants({ variant: 'white', class: '!justify-start w-full' })}>Lecturer</Link>
                            <Link href={'/'} className={buttonVariants({ variant: 'white', class: '!justify-start w-full' })}>Student</Link>
                            <Link href={'/admin/faculty'} className={buttonVariants({ variant: 'white', class: '!justify-start w-full' })}>Faculty</Link>
                            <Link href={'/admin/department'} className={buttonVariants({ variant: 'white', class: '!justify-start w-full' })}>Department</Link>
                            <Link href={'/'} className={buttonVariants({ variant: 'white', class: '!justify-start w-full' })}>Class</Link>
                            <Link href={'/admin/subject'} className={buttonVariants({ variant: 'white', class: '!justify-start w-full' })}>Subject</Link>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    </>)
}