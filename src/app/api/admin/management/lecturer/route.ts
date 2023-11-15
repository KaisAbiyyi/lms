import { prisma } from "@/lib/db";
import { generateRandomNumberString } from "@/lib/func";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
    const data = await prisma.lecturer.findMany({
        include: {
            User: true
        }
    })
    return NextResponse.json({
        success: true,
        data
    }, { status: 200 })
}


export async function POST(request: Request) {
    try {
        const { lecturerNumber, name, email, password } = await request.json();
        if (lecturerNumber === '' || name === '' || email === '' || password === '') {
            const errResponse = [];
            if (lecturerNumber === '') {
                errResponse.push({
                    error: "Lecturer Number cannot null"
                })
            }
            if (name === '') {
                errResponse.push({
                    error: "Name cannot null"
                })
            }
            if (email === '') {
                errResponse.push({
                    error: "Email cannot null"
                })
            }
            if (password === '') {
                errResponse.push({
                    error: "Password cannot null"
                })
            }
            return NextResponse.json({
                success: false,
                message: errResponse
            }, { status: 403 })
        }
        const checkLecturer = await prisma.lecturer.findFirst({
            where: {
                lecturerNumber
            }
        })
        if (checkLecturer) return NextResponse.json({
            success: false,
            message: "Data already exists"
        }, { status: 403 })

        const createUser = await prisma.user.create({
            data: {
                name,
                username: name + generateRandomNumberString(8),
                email,
                password: hashSync(password, 10),
                role: "LECTURER",
            }
        })

        const createLecturer = await prisma.lecturer.create({
            data: {
                UserId: createUser?.id,
                lecturerNumber,
                name,
            }
        })

        return NextResponse.json({
            success: true,
            message: "Data created successfully",
            data: createLecturer
        },{status:201})
    } catch (error) {
        console.error("Error parsing JSON:", error)
        return NextResponse.json({
            success: false,
            message: 'Invalid JSON'
        }, { status: 403 })
    }
}