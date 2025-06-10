'use client'
import { useParams } from "next/navigation"

import { ClipLoader } from "react-spinners"

import Header from "../../components/Header"
import UserHero from "../../components/UserHero";
import useUser from "../../hooks/useUser";
import UserBio from "../../components/UserBio";
import PostFeed from "../../components/posts/PostFeed";

const UserView = () => {
    const params = useParams();
    const userId =  params['userId'];

    const {data : fetchedUser, isLoading } = useUser(userId as string);
    console.log("UserID user: ", fetchedUser)

    if(isLoading || !fetchedUser) {
        return(
            <div
                className="flex justify-center items-center h-full"
            >
                <ClipLoader color='lightblue' size={80} />
            </div>
        )
    }
  return (
    <div>
        <Header showBackButton label={fetchedUser?.name}/>
        <UserHero userId={userId as string}/>
        <UserBio userId={userId as string}/>
        <PostFeed userId={userId as string}/>
    </div>
  )
}

export default UserView