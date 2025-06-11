import toast from "react-hot-toast";

import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePosts from "./usePosts";
import usePost from "./usePost";
import axios from "axios";

const useLike = ({postId, userId}: {postId: string, userId?: string}) => {
    const { data: currentUser } = useCurrentUser();
    const { data:fetchedPost, mutate: mutateFetchedPost} = usePost(postId);
    const { mutate: mutateFetchedPosts} = usePosts();

    const loginModal = useLoginModal();

    const hasLiked = useMemo(() => {
        const list = fetchedPost?.likedIds || [];

        return list.includes(currentUser?.id)
    }, [currentUser?.id, fetchedPost?.likedIds]);

    const toggleLike = useCallback(async () => {
        if(!currentUser){
            return loginModal.onOpen();
        }

        try{
            let request;

            if(hasLiked){
                request = () => axios.delete('/api/like', { data: { postId }});
            }else{
                request = () => axios.post('/api/like', {postId});
            }

            await request();

            mutateFetchedPost();
            mutateFetchedPosts();

            toast.success('Liked');

        }catch(error){
            toast.error("Something went wrong");
        }
    }, [
       currentUser,
       hasLiked,
       postId,
       mutateFetchedPost,
       mutateFetchedPosts,
       loginModal 
    ])

    return {
        hasLiked,
        toggleLike
    }
}

export default useLike;