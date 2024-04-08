import { customErrorToast, customSuccessToast } from "../../../Toast"
import axiosInstance from "../../../axios/axiosInstance"
import { postPath } from "../../../utils/url"
import { CreateOrEditPost } from "./CreateOrEditPost"

interface PostData {
    id?:string
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

    const updatePostOnDb = async (formData : FormData)=>{
        const response = await axiosInstance.patch(postPath + 'post/',formData)
        console.log(response.data);
        
        if(response.data.postUpdated){
            customSuccessToast('Post updated Successfully.')
            // navigate('/userprofile/')
        }else{
            customErrorToast("Post couldn't be updated now.")
        return
        }
    }
    const handleSubmission = (editedPostData : PostData)=>{
        const formData = new FormData()
        if(editedPostData  && editedPostData.media ){
            for (let key in editedPostData){
                const value = editedPostData[key as keyof PostData]
                if (key === 'media'){
                    if (value instanceof File){
                        formData.append(key,value)
                    }
                }else{
                    formData.append(key,value ? value : '')
                }
        }
        
    }else{
        customErrorToast('Post updation failed now...')
        return
    }
    updatePostOnDb(formData)
    }
    return (
        <CreateOrEditPost purpose="Edit" handleSubmission={handleSubmission} postData={postData}/>
    )
}