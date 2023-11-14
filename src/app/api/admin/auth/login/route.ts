import { prisma } from "@/lib/db"
import { compareSync } from "bcrypt"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'


export async function POST(request: Request) {
    try {
        const { email, password, rememberMe } = await request.json()
        if (email.trim() === '' || password.trim() === '') {
            const errResponse = []
            if (email.trim() === '') {
                errResponse.push({
                    error: "Email cannot null"
                })
            }
            if (password.trim() === '') {
                errResponse.push({
                    error: "Password cannot null"
                })
            }

            return NextResponse.json({
                success: false,
                message: errResponse
            }, { status: 403 })
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const verify = compareSync(password, user?.password || '')

        if (!user || !verify) {
            return NextResponse.json({
                success: false,
                message: 'Email or password incorrect'
            }, {
                status: 401
            })
        }
        const token = jwt.sign({
            name: user.name,
        }, process.env.JWT_SECRET || '', { expiresIn: rememberMe ? '30d' : '12h' })

        cookies().set({
            name: "sms-session",
            value: token,
            expires: rememberMe ? new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30) : new Date(new Date().getTime() + 1000 * 60 * 60 * 12)
        })

        await prisma.user_Token.create({
            data: {
                UserId: user.id,
                token
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Welcome',
        })
    } catch (error) {
        console.error("Error parsing JSON:", error)
        return NextResponse.json({
            success: false,
            message: 'Invalid JSON'
        }, { status: 403 })
    }
}

