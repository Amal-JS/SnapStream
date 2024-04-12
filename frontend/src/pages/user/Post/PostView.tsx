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
import { PostHeader } from "./PostHeader"
import CommentDiv from "./CommentDiv"


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
    const [commentsCount,setCommentsCount] = useState<number>(0)

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

     
      const fetchUserPosts = async ()=>{
        const response = await axiosInstance.get(postPath+`post/?post_id=${postDataIdUserClicked}`)
        if(response.data.posts && response.status === 200){
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

    //   useEffect(()=>{console.log('useEffect modal post :',post)},[post])
const handleCommentsCountChange =(count:number)=>{
    setCommentsCount(count)

}
console.log(commentsCount,'comment count in post view')
    return (
        <CustomModal isDismissable={true} modalToggle={isModalOpened} size="4xl">
            <ModalTitle handleModalToggle={handleModalToggle} isDismissable={true}>
            </ModalTitle>
            <ModalBody>
                <div className="w-full  h-full bg-secondary dark:bg-primary p-5 " >
                    {/* <PostHeader postHeaderData={post}/> */}
                    <div className="w-full bg-secondary my-2 dark:bg-primary md:flex md:justify-center">
                        <div className=" mb-3 md:w-1/2">
                        <img
                   className="object-contain h-80  "
                   alt="profile picture"
                   src={mediaPath+`${post.media}`}/>
                   <div className="my-2">  <PostAction  post={post} /></div>
                   
                            
                            <p className="text-primary  dark:text-secondary text-start text-base my-4 p-3">{post.description}</p>
                            {
                                commentsCount === 0 &&
                                        <p className="text-primary dark:text-secondary text-center border-t-2 border-secondary-border dark:border-primary-border">No comments added.</p>  }
                               
                        </div>
                        <div className="md:hidden mt-2">
                                <p className="text-xl text-primary dark:text-secondary text-center my-2" > Comments</p>
                             <CommentDiv postId={post.id} handleCommentsCountChange={handleCommentsCountChange}/>
                                <div className="h-16"></div>
                            </div> 
                        <div className="hidden md:block md:w-1/2 bg-secondary dark:bg-primary border-l-3 border-l-secondary-border dark:border-l-primary-border pl-7">
                        <p className="text-xl text-primary dark:text-secondary text-center my-2" > Comments</p>
                           <CommentDiv postId={post.id} handleCommentsCountChange={handleCommentsCountChange}/>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </CustomModal>
    )
}