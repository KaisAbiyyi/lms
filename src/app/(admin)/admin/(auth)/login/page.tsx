import LoginForm from "@/components/admin/auth/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AdminLogin() {
    return (<>
        <h1>
            <div className="w-screen h-screen flex justify-center items-center">
                <Card className="m-auto w-3/6 flex overflow-hidden">
                    <div className="w-1/2 bg-blue-500">
                        <CardHeader>
                            <CardTitle className="text-slate-100">LMS</CardTitle>
                            <Image className="mx-auto" src={"/assets/images/study.png"} width={300} height={300} alt="study ilustration" />
                            <CardDescription className="text-blue-200">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt numquam quae sapiente aut nam sed blanditiis repellendus ullam quia aliquid!</CardDescription>
                        </CardHeader>
                    </div>
                    <div className="w-1/2 p-4">
                        <CardHeader>
                            <CardTitle>Welcome Back!</CardTitle>
                            <CardDescription>User your credentials to access your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <LoginForm />
                        </CardContent>
                    </div>
                </Card>
            </div>
        </h1>
    </>)
}