import { useNavigate, useParams } from "react-router-dom"
import { customErrorToast, customSuccessToast } from "../../../Toast"
import axiosInstance from "../../../axios/axiosInstance"
import { postPath } from "../../../utils/url"
import { CreateOrEditPost } from "./CreateOrEditPost"
import { useEffect, useState } from "react"

interface PostData {
    id?:string
    description : string,
    media : File | null | string,
    location ?: string
}


export const EditPost = ()=>{
    const params = useParams()
    const navigate = useNavigate()
     const [postData,setPostData] = useState<PostData>({
        id:'',
        description : '',
        media :  '',
        location : ''
    })
    
    const fetchUserPosts = async ()=>{

      
        const response = await axiosInstance.get(postPath+`post/?post_id=${params.id}`)
        
        if(response.data.posts && response.status === 200){
            setPostData({
                id:response.data.posts.id,
                description : response.data.posts.description,
                media :  response.data.posts.media,
                location : response.data.posts.location
            })
        
        }else{
            customErrorToast('Error fetching posts.')
        }
    }


    useEffect(()=>{
        fetchUserPosts()
    },[])
    
    const updatePostOnDb = async (formData : FormData)=>{
        const response = await axiosInstance.patch(postPath + 'post/',formData)
        console.log(response.data);
        
        if(response.data.postUpdated){
            customSuccessToast('Post updated Successfully.')
            navigate('/profile/')
        }else{
            customErrorToast("Post couldn't be updated now.")
        return
        }
    }
    const handleSubmission = (editedPostData : PostData)=>{
        console.log('edited ',editedPostData)
        const formData = new FormData()
        if(editedPostData  ){
            for (let key in editedPostData){
                
                const value = editedPostData[key as keyof PostData]
                if (key === 'media'){
                    if (value instanceof File){
                console.log('media file changed ');
                        formData.append(key,value)
                    }
                }else{
                    console.log('text changed');
                    
                    formData.append(key,value ? value : '')
                }
        }
        console.log(formData);
        
    }else{
        customErrorToast('Post updation failed now...')
        return
    }
    updatePostOnDb(formData)
    }
    return (
        postData.id && 
        <CreateOrEditPost purpose="Edit" handleSubmission={handleSubmission} postData={postData}/>
    )
}