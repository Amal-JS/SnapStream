import React from "react"
import { Comment } from "./Comment"
const comments = [{'id':'commentid1','content':{'description':'first comment'},'authorId':'first'},
{'id':'commentid2','content':{'description':'second comment','authorId':'lkladfasdfkjlj'},'authorId':'second'},
{'id':'commentid3','content':{'description':'reply to first comment','reply':'commentid1'},'authorId':'third'},
{'id':'commentid4','content':{'description':'reply to second comment','reply':'commentid1'},'authorId':'fourth'},
{'id':'commentid5','content':{'description':'reply to third comment','reply':'commentid3'},'authorId':'fifth'},

]
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
    comments:CommentType[] | []
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
export const CommentDiv: React.FC<CommentProps> = React.memo(({ comments }) => {
    const commentMap : CommentMap = {};
    comments.forEach(comment => {
        if (!commentMap[comment.id]) {
          commentMap[comment.id] = {
            description: comment.content.description,
            replies: [],
            authorId: comment.authorId
          };
        }
        if (comment.content.reply && commentMap[comment.content.reply]) {
            const reply: ReplyType = {
                description: comment.content.description,
                authorId: comment.authorId
              };
              commentMap[comment.content.reply].replies = [...commentMap[comment.content.reply].replies, reply];
        }
      });
    // Get root comments (comments without a reply)
    const rootComments = comments.filter(comment => !comment.content.reply || !commentMap[comment.content.reply]);

  console.log('comments :',comments);
  console.log('comments after mixing:',commentMap);
  console.log('comments root:',rootComments);
  
    return (
        <>
        <div className="p-2 my-4 mx-2 bg-secondary dark:bg-primary border-t-2 border-t-secondary-border dark:border-t-primary-border">
        {
            comments.length === 0 ?
            <div> <p className="text-primary dark:text-secondary text-base ">No comments added.</p></div>
            :
            (
              commentMap && rootComments.map(commentId =>{
                const comment = commentMap[commentId.id as string]
                return <Comment key={commentId.id} comment={comment}/>
              })
               
            )
}

        
        </div>
        </>
    )
})