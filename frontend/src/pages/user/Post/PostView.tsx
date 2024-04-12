import { useEffect, useState } from "react"
import { CustomModal } from "../../../Components/Modal/Modal"
import { ModalTitle } from "../../../Components/Modal/ModalTitle"
import { useModal } from "../../../hooks/useModal"
import { ModalBody } from "../../../Components/Modal/ModalBody"
import { mediaPath, postPath } from "../../../utils/url"
import { Image } from "@nextui-org/react"
import axiosInstance from "../../../axios/axiosInstance"
import { customErrorToast } from "../../../Toast"
import { PostAction } from "./PostAction"


interface PostViewProps {
    postDataIdUserClicked:string,
    openModal : boolean,

}

interface PostDataType {
    id:string,
    media:string,
    description:string,
    location?:string,
    userId:string,
    username:string,
    profilePictureUrl:string,
    isUserCommentedOnPost :boolean,
    isUserSavedThePost:boolean,
    isUserLikedThePost:boolean,
    totalCommentsCount:number,
    totalLikesCount:number
  }

export const PostView : React.FC<PostViewProps>= ({postDataIdUserClicked,openModal})=>{
    const {isModalOpened,handleModalToggle} = useModal(true)
   

      const [post,setPost] = useState<PostDataType>({
        id:'',
        media:'',
        description:'',
        location:'',
        userId:'',
        username:'',
        profilePictureUrl:'',
        isUserCommentedOnPost :false,
        isUserSavedThePost:false,
        isUserLikedThePost:false,
        totalCommentsCount:0,
        totalLikesCount:0
      })

      const [showCommentDiv,setShowCommentDiv] = useState<boolean>(false)

      const fetchUserPosts = async ()=>{
        const response = await axiosInstance.get(postPath+`post/?post_id=${postDataIdUserClicked}`)
        if(response.data.posts && response.status === 200){
            
            console.log((response.data.posts));
            setPost(response.data.posts)
        
        }else{
            customErrorToast('Error fetching posts.')
        }
    }

    
      useEffect(()=>{
     fetchUserPosts()
        
      },[])
      useEffect(()=>{
        handleModalToggle()
      },[openModal])
console.log('open post view modal state ',post);
const handleComment=()=>
    {
            setShowCommentDiv(prev => !prev)
    }
    return (
        <CustomModal isDismissable={true} modalToggle={isModalOpened}>
            <ModalTitle handleModalToggle={handleModalToggle} isDismissable={true}>
            </ModalTitle>
            <ModalBody>
                <div className="w-full  h-full bg-secondary dark:bg-primary">
                    <div className="p-3 flex bg-secondary dark:bg-primary"> header</div>
                    <div className="w-full bg-secondary dark:bg-primary flex justify-center">
                        <div className=" mb-3">
                        <Image
                   className="object-contain h-80  "
                   alt="profile picture"
                   src={mediaPath+`${post.media}`}/>
                   <PostAction  post={post} handleShowCommentsDiv={handleComment}/>
                   <p className="text-primary dark:text-secondary text-center text-xl my-4 p-3">{post.description}</p>
                        </div>

                        <div className="hidden md:block md:w-1/2 bg-secondary dark:bg-primary border-l-3 border-l-secondary-border dark:border-l-primary-border pl-7">
                            jfdjljdfljsdfljsdjflsd
                        </div>
                    </div>
                </div>
            </ModalBody>
        </CustomModal>
    )
}