import { useEffect, useState } from "react"
import { TextInput } from "../../../Components/Form/TextInput"
import { PiNotepadBold } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { CustomButton } from "../../../Components/Form/Button";
import { Image } from "@nextui-org/react";
import { SideNav } from "../SideNav";
import { TextArea } from "../../../Components/Form/TextArea";
import { customErrorToast } from "../../../Toast";

interface PostData {
    description : string,
    media : File | null | string,
    location ?: string
}
interface PostError {
    description:string,
    media:string,
}

interface CreateOrEditProps {
    purpose?:string,
    postData?:PostData,
    handleSubmission?:()=>void
}

export const CreateOrEditPost : React.FC<CreateOrEditProps>= ({purpose,postData,handleSubmission})=>{

    const [newPostData,setNewPostData] = useState<PostData>({
        description : '',
        media : null,
        location : ''
    })

    const [postError,setPostError] = useState<PostError>({
        description:'',
        media:''
    })
    const [formFilled,setFormFilled] = useState<boolean>(true)


    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value} = event.target;
        const {files} = event.target as HTMLInputElement;
        
        // if(value === '' || !files) return;
        console.log(postData);

    setNewPostData(prev => 
        {
            return ({
                ...prev,
                [name]:name === 'media' ? files && files[0] : value,
            })
     
    })
    
    
    }

    useEffect(()=>{
        if(newPostData.description.length>3 && newPostData.media !== null)  setFormFilled(false)
        else setFormFilled(true)
    
    },[postData])

    const handleOnClick = ()=>{
        handleSubmission && handleSubmission()
    }

    const handleEmptyFormSubmission =()=>{
    
        
        formFilled && customErrorToast('Atleast description and image needed.')
    }
    return (
        <SideNav>
        <div className="flex justify-center mt-24 p-2 ">
            <div className="w-full mx-2 my-3 md:w-2/4 px-2 py-4  border-3 border-secodary-border dark:border-primary-border">
                <p className="text-4xl mb-7 text-primary dark:text-secondary text-center">{purpose ? purpose : 'Create'} post</p>
                {/* <TextInput handleChange={handleOnChange} name="description" placeholder="Tell about the post.." error={postError.description} Icon={PiNotepadBold}/> */}
                <TextArea name='description' placeholder={` ${postData ? postData.description : 'Tell about the post..'}`} error={postError.description} handleChange={handleOnChange}/>
                <TextInput handleChange={handleOnChange} placeholder={` ${postData ? postData.location : 'Mention the location.if you want..'}`} name="location"  error={''} Icon={MdLocationPin}/>
                <div className="mt-7 mb-10 flex" >
            <label htmlFor="media" className="px-6 w-2/4 text-primary dark:text-gray-400 text-small md:text-xl font-medium">Select  Image</label>
            <input type="file" id='media' name='media' onChange={handleOnChange} />
        </div>
        {
            newPostData && newPostData.media ?
            <div className="flex justify-center object-cover">
            <img className={`my-5 h-96 md:h-[550px]`} src={URL.createObjectURL(newPostData.media as File)}/>
        </div>

        : postData && postData.media &&
        <div className="flex justify-center object-cover">
            <img className={`my-5 h-96 md:h-[550px]`} src={postData.media as string}/>
        </div>
        }
       
  
        <CustomButton formFilled={formFilled} handleOnClick={handleOnClick} label="Create" handleOnPress={handleEmptyFormSubmission}/>
        
      
        <div className="h-16 "></div>
                </div>

            {/* <div className="hidden md:block w-2/4">

            </div> */}
          
        </div>
        </SideNav>
    )
}

     
