import { NextRequest, NextResponse } from "next/server";
import serverAuth from "@/libs/serverAuth";
import prisma from "@/prismadb";

export async function POST(
  req: NextRequest
) {
  try {
    const { currentUser } = await serverAuth();
    const body = await req.json();
    const { postId } = body;

    if(!postId || typeof postId !== 'string'){
        throw new Error('Invalid ID');    
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    if(!post){
        throw new Error('Invalid Post');
    }

    let updatedLikedIds = [...(post.likedIds) || []];

    updatedLikedIds.push(currentUser.id);

    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likedIds: updatedLikedIds
        }
    })

    return NextResponse.json(updatedPost);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest
) {
  try {
    const { currentUser } = await serverAuth();
    const body = await req.json();
    const { postId } = body;

    if(!postId || typeof postId !== 'string'){
        throw new Error('Invalid ID');    
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    if(!post){
        throw new Error('Invalid Post');
    }

    let updatedLikedIds = [...(post.likedIds) || []];

    updatedLikedIds = updatedLikedIds.filter((likedId) => likedId !== currentUser.id);
    
    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likedIds: updatedLikedIds
        }
    })

    return NextResponse.json(updatedPost);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}