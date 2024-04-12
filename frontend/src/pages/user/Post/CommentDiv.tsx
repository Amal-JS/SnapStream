import React, { useEffect, useState } from "react"
import { Comment } from "./Comment"
import axiosInstance from "../../../axios/axiosInstance"
import { commentPath, postPath } from "../../../utils/url"
import { IoEllipseSharp } from "react-icons/io5"
import { customErrorToast } from "../../../Toast"

interface CommentProps {
    postId:string,
    handleCommentsCountChange:(count:number)=> void
}
interface PostComments {
  authorId:string,
  authorName:string,
  id:string,
  comment:string,
  description:string
}
 const CommentDiv: React.FC<CommentProps> = React.memo(({ postId , handleCommentsCountChange}) => {
    const [postComments,setPostComments] = useState<PostComments[] | []>([])
  const fetchPostComments = async ()=>{
    const response = await axiosInstance.get(postPath+commentPath+`?post_id=${postId}`)

    if(response.data.comments){
   
        setPostComments(response.data.comments)
        handleCommentsCountChange(response.data.comments.length)
    }else{
      customErrorToast("Couldn't load comments now.Please try again.")
      return ;
    }
  }
  useEffect(()=>{
    fetchPostComments()
  },[postId])

  useEffect(() => {
    
}, [postComments]);

  const handleCommentsChange = ()=>{
    fetchPostComments()
  }
    return (
        <>
        <div className="w-full h-full">
       
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

export default CommentDiv;