import React, { useEffect, useState } from "react"
import { Comment } from "./Comment"
import axiosInstance from "../../../axios/axiosInstance"
import { commentPath, postPath } from "../../../utils/url"
import { IoEllipseSharp } from "react-icons/io5"
import { customErrorToast } from "../../../Toast"

interface CommentProps {
    postId:string,
    handleUserDataChange:()=> void
}
interface PostComments {
  authorId:string,
  authorName:string,
  id:string,
  comment:string,
  description:string
}
export const CommentDiv: React.FC<CommentProps> = React.memo(({ postId , handleUserDataChange}) => {
    const [postComments,setPostComments] = useState<PostComments[] | []>([])
  const fetchPostComments = async ()=>{
    const response = await axiosInstance.get(postPath+commentPath+`?post_id=${postId}`)

    if(response.data.comments){
      console.log('comments :',response.data.comments);
      
        setPostComments(response.data.comments)
        if(response.data.comments.length === 0){
          handleUserDataChange()
        }
    }else{
      customErrorToast("Couldn't load comments now.Please try again.")
      return ;
    }
  }
  useEffect(()=>{
    fetchPostComments()
  },[])

  const handleCommentsChange = ()=>{
    fetchPostComments()
  }
    return (
        <>
        <div className="p-2 my-4 mx-2 bg-secondary dark:bg-primary border-t-2 border-t-secondary-border dark:border-t-primary-border">
       
        {
          postComments?.length > 0 &&
              // <p className="text-xl text-primary dark:text-secondary">No comments</p>
              // :
              postComments.map(comment=>{
                return <Comment key={comment.id} comment={comment} handleCommentsChange={handleCommentsChange}/>
              })
        }
        </div>
        </>
    )
})