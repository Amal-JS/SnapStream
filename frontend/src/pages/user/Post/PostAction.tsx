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


interface PostData {
  id:string,
  media:string,
  description:string,
  location?:string,
  userId:string,
  username:string,
  profilePictureUrl:string,
  isUserCommentedOnPost :boolean,
  isUserSavedThePost:boolean,
  isUserLikedThePost:boolean,
  totalCommentsCount:number,
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
        setPostActionState((prev) => ({
            ...prev,
            totalLikesCount: likesCount,
          }));
    }
    setPostActionState((prev) => ({
      ...prev,
      userLiked: !postActionState.userLiked,
    }));
  };

  const handleSaveOrDeletePost = async () => {
    const response = await axiosInstance.post(postPath + "saved/", { 'user_id': userId, 'post_id': post.id },);
    if (response.data.savedPost) {
      notifyUserActions("Saved the post");
      setPostActionState((prev) => ({
        ...prev,
        userBookmarked: true
      }));
    } else if (response.data.savedDeleted) {
      notifyUserActions("Removed from saved.");
      setPostActionState((prev) => ({
        ...prev,
        userBookmarked: false
      }));
    }
  };
  const handleSaved = () => {
    handleSaveOrDeletePost()
  };
  const notifyUserActions = (message: string) => {
    customSuccessToast(message);
  };
// console.log('post action state :',postActionState)
// useEffect(()=>{console.log('post action state :',postActionState)},[postActionState])
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
        {postActionState.userBookmarked ?
        (
          <FaBookmark
            className="text-primary dark:text-secondary text-2xl md:text-2xl hover:cursor-pointer"
            onClick={handleSaved}
          />
        )
        : 
        (
          <FaRegBookmark
            className="text-primary dark:text-secondary text-2xl md:text-2xl hover:cursor-pointer"
            onClick={handleSaved}
          />
        )
        }
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
