import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

import prisma from "@/prismadb"

export async function POST (
    req: NextRequest,
) {
    try{
        const body = await req.json();
        const { email, username, name, password } = body;
        
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma?.user.create({
            data: {
                email,
                hashedPassword,
                username,
                name
            }
        })

        return NextResponse.json(user);
    }catch(error){
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500})
    }
}