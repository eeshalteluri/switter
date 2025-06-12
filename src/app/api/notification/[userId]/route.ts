import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prismadb";

export async function GET(
  req: NextRequest,
  { params } : {params: { userId : string } }
) {
  try {
    const { userId } = params;
    
    if(!userId || typeof userId !== 'string'){
      throw new Error('Invalid user ID');
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        hasNotifications: false
      }
    });

    return NextResponse.json(notifications);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}