import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(
    request: Request,
    { params }: { params: { uuid: string } }
) {
    try {
        const uuid = params.uuid
        const { lecturerNumber, name, email } = await request.json()
        const check = await prisma.lecturer.findFirst({
            where: {
                id: uuid
            }
        })

        if (!check) return NextResponse.json({
            success: false,
            message: "Data did not exists"
        })

        const lecturerUpdate = await prisma.lecturer.update({
            where: {
                id: uuid
            },
            data: {
                lecturerNumber,
                name,
                User: {
                    update: {
                        email
                    }
                }
            }
        })


        return NextResponse.json({
            success: true,
            data: lecturerUpdate
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Invalid JSON"
        }, { status: 403 })
    }
}