import { useState } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import axiosInstance from "../../../axios/axiosInstance";
import { commentPath, postPath } from "../../../utils/url";
import { customErrorToast, customSuccessToast } from "../../../Toast";
import { FaWindowClose } from "react-icons/fa";
import React from "react";

interface Comment {
    authorId:string,
    authorName:string,
    id:string,
    comment:string,
    description:string
  }
export const Comment : React.FC<{comment :Comment , handleCommentsChange : ()=> void}> = React.memo(({comment,handleCommentsChange})=>{
    const [content, setContent] = useState<string>("");
    const [isCommentAdded,setCommentAdded] = useState<boolean>(false)
    const userId = useAppSelector(state => state.user.userId)
    const [isCommentUpated,setIsCommentUpdated] = useState<boolean>(false)
    const [showCommentDiv,setShowCommentDiv] = useState<boolean>(false) 
    
    const handleInput= (event: React.ChangeEvent<HTMLDivElement>) => {
        const { textContent } = event.target;
        
        if (textContent){
        setContent(textContent);
        setCommentAdded(textContent.trim().length > 1)
        console.log('content updating');
        
        }
      };
    
      const handleFocus = () => {
        setCommentAdded(content.length > 1)
      };
    
      const handleBlur = () => {
        setCommentAdded(content.length > 1)
      };

    const handleShowReplyBox = ()=>{
        setShowCommentDiv(prev=>!prev)
        isCommentUpated && setIsCommentUpdated(prev => !prev)
        
    }
    const handleDeleteComment = async ()=>{
            const response = await axiosInstance.delete(postPath+commentPath,{'data':{'comment_id':comment.id}})
            if ( response.data.commentDeleted){
                customSuccessToast('Comment Deleted')
                handleCommentsChange()
            }else{
                customErrorToast('Please try deleting comment after some time.')
            }
    }
    const handleUpdateComment =  ()=>{
        setShowCommentDiv(prev => !prev)
        isCommentAdded && setCommentAdded(prev => !prev)
        !isCommentUpated && setIsCommentUpdated(prev => !prev)
       
}

 
const updateCommentOnDb = async  ()=>{
    const response = await axiosInstance.patch(postPath+commentPath,{'comment_id':comment.id,'description':content,'user_id':userId})
if ( response.data.commentUpdated){
    customSuccessToast('Comment Updated.')
    setIsCommentUpdated(prev => !prev )
    setShowCommentDiv(prev => !prev)
    handleCommentsChange()
}else{
    customErrorToast('Please try updating comment after some time.')
}

}
const handleReplyCreation = async ()=>{
    const response = await axiosInstance.post(postPath+commentPath,{'user_id':userId,'description':content,'comment':comment.id})
    if(response.data.commentCreated){
        customSuccessToast('Replied.')
        handleCommentsChange()
    setShowCommentDiv(prev => !prev)
    }else{
        customErrorToast("Couldn't reply now.Try again later.")
    }

}   
const handleUpdateOrCreateReply = () =>{
    if (isCommentUpated) {
        if(content.length < 1) {
            customErrorToast('Give some text')
            return 
        }
        updateCommentOnDb();
        return;
    }
    handleReplyCreation()
}
    return (
        <div>
        <div className="flex">
                <div className="w-10/12">
            <p className="text-primary text-small dark:text-secondary mt-2 my-1">
                <span className="text-small text-primary dark:text-secondary mx-2 hover:cursor-pointer"> {comment.authorName} :</span>
                {comment.description}
                
                </p>

                </div>
                { userId === comment.authorId && 
                <div className="w-2/12 flex items-center">
                    <MdModeEdit className="text-primary dark:text-secondary mx-2 hover:cursor-pointer"  onClick={handleUpdateComment} />
                    <FaTrash className="text-primary dark:text-secondary mx-2 hover:cursor-pointer"  onClick={handleDeleteComment} />
                    
                </div>
                }
                
              { userId !== comment.authorId && 
              <div className="w-2/12 mt-3">
                <span className="text-small text-btn-enabled hover:cursor-pointer ml-2 font-bold" onClick={handleShowReplyBox}> Reply</span>
                </div>
              }
                
             
            {/* <div className="pl-6 text-primary dark:text-secondary text-small">
                {comment.replies && comment.replies.map(reply => {
                    return  <p className="text-primary dark:text-secondary text-small my-1">{reply.description}</p>
                })}

            </div> */}
        </div>
        {
                showCommentDiv && 
                <div
                className="bg-secondary text-primary  dark:text-secondary dark:bg-primary w-10/12 w-max-10/12 border-2  dark:border-secondary-border focus:outline-none focus:border-0 focus:ring-1 p-2 focus:ring-primary-border border-primary-border"
                contentEditable="true"
                onInput={handleInput}
                onBlur={handleBlur}
                onFocus={handleFocus}
                suppressContentEditableWarning={true}
              > {isCommentUpated && comment.description}</div>
              
             }  



<div>
             {isCommentUpated && showCommentDiv ?
              <span className="text-small text-btn-enabled hover:cursor-pointer font-bold" onClick={handleUpdateOrCreateReply}>Update</span> 
            : isCommentAdded && showCommentDiv &&
            <span className="text-small text-btn-enabled hover:cursor-pointer font-bold" onClick={handleUpdateOrCreateReply}>Reply</span> 
            }
              </div>

</div>
    ) 
})