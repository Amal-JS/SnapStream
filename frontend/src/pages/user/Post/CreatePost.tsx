import { useState } from "react"
import { TextInput } from "../../../Components/Form/TextInput"
import { PiNotepadBold } from "react-icons/pi";
import { MdLocationPin } from "react-icons/md";
import { CustomButton } from "../../../Components/Form/Button";
import { Image } from "@nextui-org/react";
import { SideNav } from "../SideNav";

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


    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value,files} = event.target;
        console.log('on change called ',name,'  ',files);
        
        if(value === '' || !files) return;


    setPostData(prev => 
        {
            return ({
                ...prev,
                [name]:name === 'media' ? files && files[0] : value,
            })
     
    })
    console.log(postData);
    
    }
    const handleOnClick = ()=>{

    }
    return (
        <div className="flex justify-center mt-24 ">
            <div className="w-full mx-2 my-3 md:w-2/4 px-2 py-4  border-3 border-secodary-border dark:border-primary-border">
                <p className="text-4xl mb-7 text-primary dark:text-secondary text-center">Create post</p>
                <TextInput handleChange={handleOnChange} name="description" placeholder="Tell about the post.." error={postError.description} Icon={PiNotepadBold}/>
                <TextInput handleChange={handleOnChange} name="description" placeholder="Mention the place.If wanted." error={''} Icon={MdLocationPin}/>
                <div className="mt-7 mb-10 flex" >
            <label htmlFor="media" className="px-6 w-2/4 text-primary dark:text-gray-400 text-small md:text-xl font-medium">Select  Image</label>
            <input type="file" id='media' name='media' onChange={handleOnChange} />
        </div>
        {
            postData && postData.media &&
            <div className="flex justify-center">
            <Image className={`my-5`} src={URL.createObjectURL(postData.media)}/>
        </div>
        }
       
  

        <CustomButton formFilled={formFilled} handleOnClick={handleOnClick} label="Create"/>
                </div>
            {/* <div className="hidden md:block w-2/4">

            </div> */}
          <div className="h-16"></div>
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