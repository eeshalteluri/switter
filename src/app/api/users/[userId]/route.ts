import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }>}
) {
  try {
    const { userId } = await params;
    console.log(userId, typeof(userId));

    if(!userId || typeof userId !== 'string'){
        throw new Error('Invalid User ID');
    }

    const existingUser = await prisma?.user.findUnique({
        where: {
            id: userId
        }
    })

    const followersCount = await prisma?.user.count({
        where: {
            followingIds: {
                has: userId
            }
        }
    })

    return NextResponse.json({ ...existingUser, followersCount});

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}