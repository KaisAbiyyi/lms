import AdminSidebar from "@/components/admin/sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex gap-4">
            <AdminSidebar />
            <div className="w-5/6">
                {children}
            </div>
        </div>
    )
}