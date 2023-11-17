import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    const data = await prisma.faculty.findMany({
        include: {
            Department: true
        }
    })
    return NextResponse.json({
        success: true,
        data
    }, { status: 200 })
}

export async function POST(request: Request) {
    try {
        const { name } = await await request.json();
        if (name === '') {
            const errResponse = [];
            if (name === '') {
                errResponse.push({
                    error: "Name cannot null"
                })
            }
            return NextResponse.json({
                success: false,
                message: errResponse
            }, { status: 403 })
        }

        const checkFaculty = await prisma.faculty.findFirst({
            where: {
                name
            }
        })

        if (checkFaculty) return NextResponse.json({
            success: false,
            message: "Data already exists"
        }, { status: 403 })

        const createFaculty = await prisma.faculty.create({
            data: {
                name
            }
        })

        return NextResponse.json({
            success: true,
            message: "Data added successfully",
            data: createFaculty
        }, { status: 201 })
    } catch (error) {

    }
}