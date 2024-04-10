
interface ReplyType {
    description:string,
    authorId:string }
interface CommentMap{
        description:string,
        replies:ReplyType[] | [],
        authorId:string
}
export const Comment : React.FC<{comment : CommentMap}> = ({comment})=>{
    return (
        <div>
            <p className="text-primary dark:text-secondary text-base mt-2 my-1">{comment.description}</p>
            <div className="pl-6 text-primary dark:text-secondary text-small">
                {comment.replies && comment.replies.map(reply => {
                    return  <p className="text-primary dark:text-secondary text-small my-1">{reply.description}</p>
                })}

            </div>
        </div>
    )
}