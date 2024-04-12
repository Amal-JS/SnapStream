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
  handleShowCommentsDiv?: () => void;
}
interface PostActionState {
  isUserLikedThePost: boolean;
  isUserSavedThePost: boolean;
  totalLikesCount:number
}

export const PostAction: React.FC<PostActionProps> = ({post,
  handleShowCommentsDiv,
}) => {
  const userId = useAppSelector((state) => state.user.userId);
  const [postActionState, setPostActionState] = useState<PostActionState>({
    isUserLikedThePost: false,
    isUserSavedThePost: false,
    totalLikesCount:0
  });

  useEffect(()=>{
       if(post) {
        setPostActionState(prev =>({
            ...prev,
            isUserLikedThePost:post.isUserLikedThePost,
            isUserSavedThePost:post.isUserSavedThePost,
            totalLikesCount:post.totalLikesCount
        }))
        // console.log('post data in setPostAction state');
        
       }
  },[post])

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
      isUserLikedThePost: !postActionState.isUserLikedThePost,
    }));
  };

  const handleSaveOrDeletePost = async () => {
    const response = await axiosInstance.post(postPath + "saved/", { 'user_id': userId, 'post_id': post.id },);
    if (response.data.savedPost) {
      notifyUserActions("Saved the post");
      setPostActionState((prev) => ({
        ...prev,
        isUserSavedThePost: true
      }));
    } else if (response.data.savedDeleted) {
      notifyUserActions("Removed from saved.");
      setPostActionState((prev) => ({
        ...prev,
        isUserSavedThePost: false
      }));
    }
  };
  const handleSaved = () => {
    handleSaveOrDeletePost()
  };
  const notifyUserActions = (message: string) => {
    customSuccessToast(message);
  };

// useEffect(()=>{console.log('post action state :',postActionState)},[postActionState])
  return (
    <>
    <div className="flex">
      <div className="w-1/2 flex ">
        {postActionState.isUserLikedThePost ? (
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
        {postActionState.isUserSavedThePost ?
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
