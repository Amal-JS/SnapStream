import { CreateOrEditPost } from "./CreateOrEditPost"

interface PostData {
    description : string,
    media : File | null | string,
    location ?: string
}


export const CreatePost = ()=>{

    const handleSubmission = (postData : PostData)=>{
        console.log('created post ',postData);
        
    }
    return (
        <CreateOrEditPost purpose="Create" handleSubmission={handleSubmission}/>
    )
}