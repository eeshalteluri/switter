import serverAuth from "@/libs/serverAuth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismadb";

export async function POST(
  req: NextRequest
) {
  try {
    const { currentUser } = await serverAuth();
    const body = await req.json();
    const { userId } = body;

    if(!userId || typeof userId !== 'string'){
        throw new Error('Invalid ID');    
    }

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if(!user){
        throw new Error('Invalid User');
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];
    updatedFollowingIds.push(userId);

    const updatedUser = await prisma?.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            followingIds: updatedFollowingIds
        }
    })

    return NextResponse.json(updatedUser);

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
    const { userId } = body;

    if(!userId || typeof userId !== 'string'){
        throw new Error('Invalid ID');    
    }

    const user = await prisma?.user.findUnique({
        where: {
            id: userId
        }
    });

    if(!user){
        throw new Error('Invalid User');
    }

    let updatedFollowingIds = [...(currentUser.followingIds || [])];

    updatedFollowingIds = updatedFollowingIds.filter((followingId) => followingId !== userId);

    const updatedUser = await prisma?.user.update({
        where: {
            id: currentUser.id
        },
        data: {
            followingIds: updatedFollowingIds
        }
    })

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}