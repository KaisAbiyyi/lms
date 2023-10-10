"use client"

import TanstackQueryProvider from "@/components/Providers/TanStackQueryProviders"
import AdminSidebar from "@/components/admin/sidebar"
import { usePathname } from "next/navigation"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const path = usePathname()
    return (
        <div className="flex gap-4">
            {!path.match('/admin/login') &&
                <AdminSidebar />
            }
            <div className="w-5/6">
                <TanstackQueryProvider>
                    {children}
                </TanstackQueryProvider>
            </div>
        </div>
    )
}