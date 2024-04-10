import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { RiHeartLine } from "react-icons/ri";
import { IoHeartSharp } from "react-icons/io5";
import { useState } from "react";
import { customErrorToast, customSuccessToast } from "../../../Toast";
import axiosInstance from "../../../axios/axiosInstance";
import { postPath } from "../../../utils/url";
import { useAppSelector } from "../../../hooks/redux";
import { CommentDiv } from "./CommentDiv";

interface PostActionProps {
    postId:string,
    handleShowCommentsDiv:()=> void
}
interface PostActionState {
    userLiked : boolean,
    comments : [],
    userBookmarked : boolean
}
export const PostAction :React.FC<PostActionProps> = ({postId,handleShowCommentsDiv})=>{

    const userId = useAppSelector(state => state.user.userId)
    const [postActionState,setPostActionState] = useState<PostActionState>({
        userLiked : true,
        comments : [],
        userBookmarked : true
    })
    
    const handleLike = async () =>{

        const response = await axiosInstance.post(postPath+'like/',{'user_id':userId,'post_id':'alsfjd'})
        if(response.data.postLiked){
            notifyUserActions('Post liked.')
        }else if(response.data.postStatus){
            notifyUserActions('Post disliked.')
        }else{
            customErrorToast('Please try again') 
        }
        setPostActionState(prev => ({
            ...prev,
            ['userLiked']:!postActionState.userLiked
        }))
        
    }
    const handleSavedDeletion = async ()=>
    {
        const response = await axiosInstance.post(postPath+'saved/',{'user_id':userId,'post_id':'alsfjd'})
        if(response.data.postSaved){
            notifyUserActions('Post liked.')
        }else if(response.data.Status){
            notifyUserActions('Removed from saved.')
        }
    }
    const handleSaveThePost = async ()=>{
        const response = await axiosInstance.delete(postPath+'saved/',{'data':{'user_id':userId,'post_id':'alsfjd'}})
        if(response.data.savedDeleted){
            notifyUserActions('Saved Deleted')
        }else if(response.data.savedDeleted){
            notifyUserActions('Try again later.')
        }
    }
    const handleSaved =  () =>{
        postActionState.userBookmarked ?
        
        handleSavedDeletion()
        :
        handleSaveThePost()
        
        setPostActionState(prev => ({
            ...prev,
            ['userBookmarked']:!postActionState.userBookmarked
        }))
       
    }
    const notifyUserActions = (message:string)=>{
        customSuccessToast(message)
    }
    
    return (
        <>
        
        <div className="w-1/2 flex ">
        {postActionState.userLiked ? 
        <IoHeartSharp className=" mr-3  text-red-600 text-2xl md:text-3xl font-light hover:cursor-pointer" onClick={handleLike}/>    
        :
        <RiHeartLine className=" mr-3  text-primary dark:text-secondary text-2xl md:text-3xl font-light hover:cursor-pointer" onClick={handleLike}/>        
    } 
        <FaRegComment className=" mr-3  text-primary dark:text-secondary text-2xl md:text-3xl font-light hover:cursor-pointer" onClick={handleShowCommentsDiv}/>
      </div>
     
      <div className="w-1/2 mr-1 flex justify-end">
        {postActionState.userBookmarked ?
        <FaRegBookmark className="text-primary dark:text-secondary text-2xl md:text-2xl hover:cursor-pointer"  onClick={handleSaved}/>
        :
        <FaBookmark className="text-primary dark:text-secondary text-2xl md:text-2xl hover:cursor-pointer"  onClick={handleSaved}/>
        }
      </div>
      </>
    )
}