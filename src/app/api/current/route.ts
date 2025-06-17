//To fetch our current loggedin user
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export async function GET () {
    try{
        const { currentUser } = await serverAuth()
        return NextResponse.json(currentUser);
    }catch(error){
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500})
    }
}