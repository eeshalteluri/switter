import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismadb"

export async function GET(
    req: NextRequest
) {
    try{
        let posts;

        console.log("hello");

        posts = await prisma.post.findMany({
            include: {
                user: true,
                comments: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(posts)
    }catch(error){
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500})
    }

}

export async function POST (
    req: NextRequest
) {
    try{
        const { currentUser } = await serverAuth();
        const body = await req.json();

        const { postBody } = body; 

        const post = await prisma.post.create({
            data: {
                postBody,
                userId: currentUser.id,
            }
        });

    return NextResponse.json(post);
    }catch(error){
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500})
    }
}