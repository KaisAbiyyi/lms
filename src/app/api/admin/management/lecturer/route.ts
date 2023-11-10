import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { lecturerNumber, name, email, password } = await request.json();
        return NextResponse.json({
            lecturerNumber, name, email, password
        })
    } catch (error) {
        console.error("Error parsing JSON:", error)
        return NextResponse.json({
            success: false,
            message: 'Invalid JSON'
        }, { status: 403 })
    }
}