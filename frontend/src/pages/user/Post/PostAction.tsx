import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { RiHeartLine } from "react-icons/ri";
import { IoHeartSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { customErrorToast, customSuccessToast } from "../../../Toast";
import axiosInstance from "../../../axios/axiosInstance";
import { postPath } from "../../../utils/url";
import { useAppSelector } from "../../../hooks/redux";
import { CommentDiv } from "./CommentDiv";

interface PostData {
  id: string;
  isUserCommentedOnPost: boolean;
  isUserSavedThePost: boolean;
  isUserLikedThePost: boolean,
  totalLikesCount:number
}
interface PostActionProps {
  post: PostData;
  handleShowCommentsDiv: () => void;
}
interface PostActionState {
  userLiked: boolean;
  userBookmarked: boolean;
  totalLikesCount:number
}

export const PostAction: React.FC<PostActionProps> = ({post,
  handleShowCommentsDiv,
}) => {
  const userId = useAppSelector((state) => state.user.userId);
  const [postActionState, setPostActionState] = useState<PostActionState>({
    userLiked: false,
    userBookmarked: false,
    totalLikesCount:0
  });

  useEffect(()=>{
        setPostActionState(prev =>({
            ...prev,
            userLiked:post.isUserLikedThePost,
            userBookmarked:post.isUserSavedThePost,
            totalLikesCount:post.totalLikesCount
        }))
  },[])

  const handleLike = async () => {
    const response = await axiosInstance.post(postPath + "like/", {
      user_id: userId,
      post_id: post.id,
    });
    console.log(response.data)
    if (response.data.postLiked) {
      notifyUserActions("Post liked.");
    } else if (response.data.postStatus) {
      notifyUserActions("Post liked.");
    } 
 else if (!response.data.postStatus) {
    notifyUserActions("Post disliked.");
  } 
    else {
      customErrorToast("Please try again");
    }

    if(response.data?.totalLikesCount !== undefined){
        
        const likesCount = response.data.totalLikesCount
        console.log('like count :',likesCount)
        setPostActionState((prev) => ({
            ...prev,
            totalLikesCount: likesCount,
          }));
    }
    setPostActionState((prev) => ({
      ...prev,
      ["userLiked"]: !postActionState.userLiked,
    }));
  };
  const handleSavedDeletion = async () => {
    const response = await axiosInstance.post(postPath + "saved/", {
      user_id: userId,
      post_id: post.id,
    });
    if (response.data.postSaved) {
      notifyUserActions("Saved the post .");
    } else if (response.data.Status) {
      notifyUserActions("Removed from saved.");
    }
  };
  const handleSaveThePost = async () => {
    const response = await axiosInstance.delete(postPath + "saved/", {
      data: { user_id: userId, post_id: post.id },
    });
    if (response.data.savedDeleted) {
      notifyUserActions("Saved Deleted");
    } else if (response.data.savedDeleted) {
      notifyUserActions("Try again later.");
    }
  };
  const handleSaved = () => {
    postActionState.userBookmarked
      ? handleSavedDeletion()
      : handleSaveThePost();

    setPostActionState((prev) => ({
      ...prev,
      ["userBookmarked"]: !postActionState.userBookmarked,
    }));
  };
  const notifyUserActions = (message: string) => {
    customSuccessToast(message);
  };
console.log(postActionState);

  return (
    <>
    <div className="flex">
      <div className="w-1/2 flex ">
        {postActionState.userLiked ? (
          <IoHeartSharp
            className=" mr-3  text-red-600 text-2xl md:text-3xl font-light hover:cursor-pointer"
            onClick={handleLike}
          />
        ) : (
          <RiHeartLine
            className=" mr-3  text-primary dark:text-secondary text-2xl md:text-3xl font-light hover:cursor-pointer"
            onClick={handleLike}
          />
        )}
        <FaRegComment
          className=" mr-3  text-primary dark:text-secondary text-2xl md:text-3xl font-light hover:cursor-pointer"
          onClick={handleShowCommentsDiv}
        />
      </div>

      <div className="w-1/2 mr-1 flex justify-end">
        {postActionState.userBookmarked ? (
          <FaRegBookmark
            className="text-primary dark:text-secondary text-2xl md:text-2xl hover:cursor-pointer"
            onClick={handleSaved}
          />
        ) : (
          <FaBookmark
            className="text-primary dark:text-secondary text-2xl md:text-2xl hover:cursor-pointer"
            onClick={handleSaved}
          />
        )}
      </div>
      </div>
      {
          
            postActionState.totalLikesCount == 1 ?
<p className=" text-small font-semibold text-primary dark:text-secondary my-2">
            {postActionState.totalLikesCount} like
          </p>
            :
                postActionState.totalLikesCount > 1 &&  
            <p className=" text-small font-semibold text-primary dark:text-secondary my-2">
            {postActionState.totalLikesCount} likes
          </p>
          }
    </>
  );
};
