import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismadb"

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }>}
) {
    const { userId } = await params; 

    console.log(`Get specific user posts: ${userId}`);

    let posts;

    if(userId && typeof userId === 'string') {
        posts = await prisma.post.findMany({
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
    }

    console.log(`Get specific user posts: ${posts}`)

    return NextResponse.json(posts)
}