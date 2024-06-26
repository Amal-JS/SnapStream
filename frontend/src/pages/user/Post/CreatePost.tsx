import { useNavigate } from "react-router-dom"
import { customErrorToast, customSuccessToast } from "../../../Toast"
import axiosInstance from "../../../axios/axiosInstance"
import { postPath } from "../../../utils/url"
import { CreateOrEditPost } from "./CreateOrEditPost"
import { useAppSelector } from "../../../hooks/redux"

interface PostData {
    description : string,
    media : File | null | string,
    location ?: string
}


export const CreatePost = ()=>{
    const navigate =  useNavigate()
    const userId = useAppSelector(state => state.user.userId)
    const createPostOnDb = async (formData : FormData)=>{
        const response = await axiosInstance.post(postPath + 'post/',formData)
        console.log(response.data);
        
        if(response.data.postCreated){
            customSuccessToast('Post created Successfully.')
            navigate('/profile/')
        }else{
            customErrorToast("Post couldn't be created now.")
        return
        }
    }
    const handleSubmission =  (postData : PostData)=>{
        const formData = new FormData()
        userId && formData.append('user',userId)
        if(postData  && postData.media ){
            for (let key in postData){
                const value = postData[key as keyof PostData]
                if (key === 'media'){
                    if (value instanceof File){
                        formData.append(key,value)
                    }
                }else{
                    formData.append(key,value ? value : '')
                }
        }
        
    }else{
        customErrorToast('Post creation failed now...')
        return
    }
    createPostOnDb(formData)
    }
    return (
        <CreateOrEditPost purpose="Create" handleSubmission={handleSubmission}/>
    )
}