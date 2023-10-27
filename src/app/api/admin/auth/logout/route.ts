import { prisma } from "@/lib/db"
import { verify } from "jsonwebtoken"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const token = cookies().get('sms-session')?.value
        const verifyJWT = verify(token as string, process.env.JWT_SECRET as string)
        const userToken = await prisma.user_Token.findFirst({
            where: {
                token
            }
        })
        if (!token && !verifyJWT && !userToken) {
            return NextResponse.json({
                success: false,
                message: "Invalid Token"
            }, { status: 401 })
        }
        cookies().delete('sms-session')
        await prisma.user_Token.delete({
            where: { id: userToken?.id }
        })

        return NextResponse.json({
            success: true,
            message: "Goodbye"
        }, { status: 200 })
    } catch (error) {
        console.log("Something went wrong: " + error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, { status: 401 })
    }
}