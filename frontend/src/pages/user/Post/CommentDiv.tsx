import React from "react"
import { Comment } from "./Comment"

interface ContentType {
    description:string,
    reply?:string,

}
interface CommentType {
id:string,
authorId:string,
content:ContentType
}

interface CommentProps {
    postId:string
}
interface ReplyType {
    description:string,
    authorId:string
}
interface CommentMap {
    [id: string]: {
      description: string;
      replies: ReplyType[] | [];
      authorId: string;
    };
  }
export const CommentDiv: React.FC<CommentProps> = React.memo(({ postId }) => {
  
    return (
        <>
        <div className="p-2 my-4 mx-2 bg-secondary dark:bg-primary border-t-2 border-t-secondary-border dark:border-t-primary-border">
       
        
        </div>
        </>
    )
})