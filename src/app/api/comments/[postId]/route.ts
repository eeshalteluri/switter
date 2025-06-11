import serverAuth from "@/libs/serverAuth";
import prisma from "@/prismadb";

import { NextRequest, NextResponse } from "next/server";


export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string }}
) {
  try {
    
    const body = await req.json();
    const { postId } = await params; 
    const { currentUser } = await serverAuth();

    console.log(`Get specific post's comments: ${postId}`);

    if(!postId || typeof postId !== 'string'){
      throw new Error('Invalid post ID');
    }

    const comment = await prisma.comment.create({
      data: {
        commentBody: body,
        userId: currentUser.id,
        postId
      }
    })

    return NextResponse.json(comment);
    
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}