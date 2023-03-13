import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { TiMessage } from 'react-icons/ti'
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLike({ postId: data.id, userId });

  const goToUser = useCallback((event: any) => {
    event.stopPropagation();

    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`)
  }, [router, data.id,]);

  const onLike = useCallback(async (ev: any) => {
    ev.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    toggleLike();
  }, [loginModal, currentUser, toggleLike]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart


  return (
    <div
      onClick={goToPost}
      className="border-b border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p onClick={goToUser} className="font-semibold cursor-pointer hover:underline lg:text-lg">{data.user.name}</p>
            <span onClick={goToUser} className="text-neutral-500 cursor-pointer hover:underline text-sm md:text-base">@{data.user.username}</span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="mt-1">
            {data.body}
          </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <button className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <TiMessage size={24} />
              <span>
                {data.comments?.length || 0}
              </span>
            </button>
            <button
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
              <LikeIcon size={24} color={hasLiked ? '	#C51E3A' : ''} />
              <span>
                {data.likedIds.length}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostItem