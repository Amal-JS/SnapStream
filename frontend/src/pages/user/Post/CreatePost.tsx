import { CreateOrEditPost } from "./CreateOrEditPost"

export const CreatePost = ()=>{

    const handleSubmission = ()=>{
        console.log('created post');
        
    }
    return (
        <CreateOrEditPost purpose="Create" handleSubmission={handleSubmission}/>
    )
}