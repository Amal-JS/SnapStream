import { CreateOrEditPost } from "./CreateOrEditPost"

export const EditPost = ()=>{

    const postData = {
        description :'asdjfasljdfklasjdfkljasdklf aslkdjfasdj fjs asldfj asdfjasdf',
        media: 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg',
        location : 'Thiruvanathapuram , kerala'
    }
    const handleSubmission = ()=>{
        console.log('edit post');
        
    }
    return (
        <CreateOrEditPost purpose="Edit" handleSubmission={handleSubmission} postData={postData}/>
    )
}