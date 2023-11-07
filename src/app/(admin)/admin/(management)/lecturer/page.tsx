"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LecturerManagementPage() {
    return (
        <>
            <div className="flex flex-col gap-8">
                <h1 className="text-2xl font-semibold text-slate-700">Lecturer</h1>
                <div className="flex gap-4">
                    <Card>
                        <CardHeader>
                            <CardDescription>Total</CardDescription>
                            <CardTitle>12</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </>
    )
}