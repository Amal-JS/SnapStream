import React from "react"
const comments = [{'id':'commentid1','content':{'description':'aldsjfasd asd fsldf alsdf sdf'},'authorId':'lklkjlj'},
{'id':'commentid2','content':{'description':'lsadflskdfl alsdfkjs asdf sadf ','authorId':'lkladfasdfkjlj'},'authorId':'lklkjlj'},
{'id':'commentid3','content':{'description':'a sfas asfd sadf sadf s dffa sdf','reply':'commentid1'},'authorId':'lklasdfaasdfsdkjlj'},
{'id':'commentid4','content':{'description':'a sfas asfd sadf sadf s dffa sdf','reply':'commentid1'},'authorId':'lklkjlj'},
{'id':'commentid5','content':{'description':'a sfas asfd sadf sadf s dffa sdf','reply':'commentid3'},'authorId':'lklasdfdsfkjlj'},

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
    comments:CommentType[]
}
export const CommentDiv : React.FC<CommentProps>= React.memo(({comments})=>{
    return (
        <>
        <div className="p-2 my-4 mx-2 bg-secondary dark:bg-primary border-t-2 border-t-secondary-border dark:border-t-primary-border">
        {
            comments.length === 0 ?
            <div> <p className="text-primary dark:text-secondary text-base ">No comments added.</p></div>
            :
<div> 
    {
    comments && 
    comments.map(comment=>{
        return <p key={comment.id} className="text-small my-1 text-primary dark:text-secondary ">{comment.content.description}</p>
    })
}
</div>
        }
        </div>
        </>
    )
})