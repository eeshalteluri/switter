import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismadb"

export async function GET(
    { params }: { params: Promise<{ userId: string }>}
) {
    const { userId } = await params; 

    console.log(`Get specific user posts: ${userId}`);


    if(userId && typeof userId === 'string') {
        const posts = await prisma.post.findMany({
            where: {
                userId
            },
            include: {
                user: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        console.log(`Get specific user posts: ${posts}`)

        return NextResponse.json(posts)
    }

    
}