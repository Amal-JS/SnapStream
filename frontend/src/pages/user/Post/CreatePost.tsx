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
    media : File | null,
    location ?: string
}
interface PostError {
    description:string,
    media:string,
}


const CreatePostComponent = ()=>{

    const [postData,setPostData] = useState<PostData>({
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

    setPostData(prev => 
        {
            return ({
                ...prev,
                [name]:name === 'media' ? files && files[0] : value,
            })
     
    })
    
    
    }

    useEffect(()=>{
        if(postData.description.length>3 && postData.media !== null)  setFormFilled(false)
        else setFormFilled(true)
    
    },[postData])

    const handleOnClick = ()=>{

    }

    const handleEmptyFormSubmission =()=>{
    
        
        formFilled && customErrorToast('Atleast description and image needed.')
    }
    return (
        <div className="flex justify-center mt-24 p-2 ">
            <div className="w-full mx-2 my-3 md:w-2/4 px-2 py-4  border-3 border-secodary-border dark:border-primary-border">
                <p className="text-4xl mb-7 text-primary dark:text-secondary text-center">Create post</p>
                {/* <TextInput handleChange={handleOnChange} name="description" placeholder="Tell about the post.." error={postError.description} Icon={PiNotepadBold}/> */}
                <TextArea name='description' placeholder="Tell about the post.." error={postError.description} handleChange={handleOnChange}/>
                <TextInput handleChange={handleOnChange} name="location" placeholder="Mention the place.If wanted." error={''} Icon={MdLocationPin}/>
                <div className="mt-7 mb-10 flex" >
            <label htmlFor="media" className="px-6 w-2/4 text-primary dark:text-gray-400 text-small md:text-xl font-medium">Select  Image</label>
            <input type="file" id='media' name='media' onChange={handleOnChange} />
        </div>
        {
            postData && postData.media &&
            <div className="flex justify-center object-cover">
            <img className={`my-5 h-96 md:h-[550px]`} src={URL.createObjectURL(postData.media)}/>
        </div>
        }
       
  
        <CustomButton formFilled={formFilled} handleOnClick={handleOnClick} label="Create" handleOnPress={handleEmptyFormSubmission}/>
        
      
        <div className="h-16 "></div>
                </div>

            {/* <div className="hidden md:block w-2/4">

            </div> */}
          
        </div>
    )
}

export const CreatePost = ()=>{
    return (
        <SideNav>
            <CreatePostComponent/>
        </SideNav>
    )
}