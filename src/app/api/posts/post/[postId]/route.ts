import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismadb"

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string }}
) {
  try {
    const { postId } = await params; 

    console.log(`Get specific post: ${postId}`);

    if(!postId && typeof postId !== 'string') {
        throw new Error("Invalid Post ID");
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            user: true,
            comments: {
                include: {
                    user: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    })

    console.log(`Get specific post: ${post}`)

    return NextResponse.json(post)
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}