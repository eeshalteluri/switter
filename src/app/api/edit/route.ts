import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prismadb'

import serverAuth from "@/libs/serverAuth";

export async function PATCH (
    req: NextRequest
) {
    try{
        const body = await req.json();

        const { currentUser } = await serverAuth();
        const { name, username, bio, profileImage, coverImage } = body;

        if(!name || !username) {
            throw new Error('Missing fields');
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name, 
                username, 
                bio, 
                profileImage, 
                coverImage
            },
        });
        
        return NextResponse.json(updatedUser);
    }catch(error){
        console.log(error);
        return new NextResponse("Internal Server Error",{status: 500})
    }
}