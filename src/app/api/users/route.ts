import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismadb"

export async function GET (
) {
    try{
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(users);
    }catch(error){
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500})
    }
}