import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'

async function main() {
    await prisma.user.createMany({
        data: [
            {
                name: "admin",
                email: 'admin@gmail.com',
                username: 'admin',
                role: "ADMIN",
                password: bcrypt.hashSync('admin', 10)
            },
            {
                name: 'teacher',
                email: 'teacher@gmail.com',
                username: 'teacher',
                role: "LECTURER",
                password: bcrypt.hashSync('teacher', 10)
            },
            {
                name: "Debug Student",
                email: "debugStudent@gmail.com",
                username: "debugstudent",
                role: "STUDENT",
                password: bcrypt.hashSync('debugstudent', 10)
            }
        ]
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })