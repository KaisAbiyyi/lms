import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
    const data = await prisma.department.findMany({
        include: {
            Faculty: true
        }
    })
    return NextResponse.json({
        success: true,
        data
    }, { status: 200 })
}

export async function POST(request: Request) {
    try {
        const { name, faculty } = await await request.json();
        if (name === '' || faculty === '') {
            const errResponse = [];
            if (name === '') {
                errResponse.push({
                    error: "Name cannot null"
                })
            }

            if (faculty === '') {
                errResponse.push({
                    error: "Faculty name cannot null"
                })
            }
            return NextResponse.json({
                success: false,
                message: errResponse
            }, { status: 403 })
        }

        const checkFaculty = await prisma.faculty.findFirst({
            where: {
                name: faculty
            }
        })

        let facultyId: string

        if (checkFaculty) {
            facultyId = checkFaculty?.id
        } else {
            const createFaculty = await prisma.faculty.create({
                data: {
                    name: faculty
                }
            })
            facultyId = createFaculty?.id
        }

        const createDepartment = await prisma.department.create({
            data: {
                name,
                facultyId
            }
        })

        return NextResponse.json({
            success: true,
            message: "Data added successfully",
            data: createDepartment
        }, { status: 201 })
    } catch (error) {

    }
}