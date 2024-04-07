import { CreateOrEditPost } from "./CreateOrEditPost"

interface PostData {
    description : string,
    media : File | null | string,
    location ?: string
}


export const EditPost = ()=>{

    const postData = {
        description :'asdjfasljdfklasjdfkljasdklf aslkdjfasdj fjs asldfj asdfjasdf',
        media: 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg',
        location : 'Thiruvanathapuram , kerala'
    }
    const handleSubmission = (editedPostData : PostData)=>{
        console.log('edit post data :',editedPostData);
        
    }
    return (
        <CreateOrEditPost purpose="Edit" handleSubmission={handleSubmission} postData={postData}/>
    )
}