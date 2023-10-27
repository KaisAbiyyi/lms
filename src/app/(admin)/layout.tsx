"use client"

import TanstackQueryProvider from "@/components/Providers/TanstackQueryProviders"
import AdminNavbar from "@/components/admin/navbar"
import AdminSidebar from "@/components/admin/sidebar"
import { usePathname } from "next/navigation"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const path = usePathname()
    return (
        <div className="flex gap-4 bg-slate-200">
            {!path.match('/admin/login') &&
                <AdminSidebar />
            }
            <div className="w-5/6 px-12 flex flex-col">
                <TanstackQueryProvider>
                    {!path.match('/admin/login') &&
                        <AdminNavbar />
                    }
                    <div className="flex flex-col">
                        {children}
                    </div>
                </TanstackQueryProvider>
            </div>
        </div>
    )
}