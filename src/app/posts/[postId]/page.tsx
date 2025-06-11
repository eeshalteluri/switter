'use client'
import { useParams, useRouter } from "next/navigation"

import { ClipLoader } from "react-spinners"

import Header from "../../components/Header"
import usePost from "../../hooks/usePost";
import PostItem from "../../components/posts/PostItem";
import Form from "../../components/Form";
import CommentFeed from "../../components/posts/CommentFeed";

const PostView = () => {
    const router = useRouter();
    const params = useParams();
    const postId =  params['postId'];

    console.log("Post ID: ", postId);

    const {data : fetchedPost, isLoading } = usePost(postId as string);
    console.log("PostID Post: ", fetchedPost)

    if(isLoading || !fetchedPost) {
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
        <Header showBackButton label="Tweet"/>
        <PostItem data={fetchedPost} />
        <Form
            postId={postId as string}
            isComment
            placeholder="Tweet your reply"
        />
        <CommentFeed comments={fetchedPost?.comments} />
    </div>
  )
}

export default PostView