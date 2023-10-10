import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()
        return NextResponse.json({
            email, password
        }, { status: 200 })
    } catch (error) {
        console.error("Error parsing JSON:", error)
        return NextResponse.json({
            success: false,
            message: 'Invalid JSON'
        }, { status: 403 })
    }
}