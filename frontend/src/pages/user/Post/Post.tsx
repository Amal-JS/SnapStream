import { PostHeader } from "./PostHeader";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { useAppSelector } from "../../../hooks/redux";
import { PostAction } from "./PostAction";
import { commentPath, mediaPath, postPath } from "../../../utils/url";
import axios from "axios";
import axiosInstance from "../../../axios/axiosInstance";
import { customErrorToast, customSuccessToast } from "../../../Toast";
import {Spinner} from "@nextui-org/react";
import { lazy } from 'react';
import { LoadingSpinner } from "../../../Components/loading/LoadingSpinner";
import { useAsyncError } from "react-router-dom";
import React from "react";


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

interface PostDataProps {
  postData :PostDataType
}

export const Post : React.FC<PostDataProps> = React.memo(({postData}) => {
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
  const [content, setContent] = useState<string>("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [isCommentAdded,setCommentAdded] = useState<boolean>(false)
  const [fullDescription,setFullDescription] = useState<string>('')
  const [showMore,setShowMore] = useState<boolean>(false)
  const [showLess,setShowLess] = useState<boolean>(true)
  const userId = useAppSelector(state => state.user.userId)

  const [showCommentDiv,setShowCommentDiv] = useState<boolean>(false)
  const [commentCount,setCommentCount] = useState<number>(0)
  const CommentPreview = lazy(() => import('./CommentDiv'));


  useEffect(()=>{
      postData.id && fetchUserPosts()

  },[postData])

  const handleInput= (event: React.ChangeEvent<HTMLDivElement>) => {
    const { textContent } = event.target;
    
    if (textContent){
    setContent(textContent);
    setIsPlaceholderVisible(textContent.trim().length === 0)
    setCommentAdded(textContent.trim().length > 1)
    setShowCommentDiv(false)
    }

  };

  const handleFocus = () => {
    setIsPlaceholderVisible(false);
  };

  const handleBlur = () => {
    
    setIsPlaceholderVisible(content.trim().length < 2);
    
  };

  useEffect(()=>{
    setFullDescription(postData.description)},[])

  const handleShowFullContent = ()=> {
    setShowLess(prev => !prev)
    setShowMore(prev => !prev)
  }
 
  const handleComment=()=>
    {
            setShowCommentDiv(prev => !prev)
    }

    const fetchUserPosts = async ()=>{

      
      const response = await axiosInstance.get(postPath+`post/?post_id=${postData.id}`)
      
      if(response.data.posts && response.status === 200){
          
          setPost(response.data.posts)
          setCommentCount(response.data.posts.totalCommentsCount)
      
      }else{
          customErrorToast('Error fetching posts.')
      }
  }
  const handleNewCommentCreation = async ()=>{
    const response = await axiosInstance.post(postPath+commentPath,{'user_id':userId,'post_id':postData.id,'description':content})
    if(response.data.commentCreated){
      customSuccessToast('Comment Added.')
      fetchUserPosts()
    }else{
      customErrorToast('please try to add comment after some time.')
    }
  }
  const handleCommentsCountChange = (count:number)=>{
    console.log('comment change useCallback  call');
    setCommentCount(count)
    
    console.log('call comes on comment deletion ');
    
  }
useEffect(()=>{
if(commentCount == 0 ){
  setIsPlaceholderVisible(prev => !prev)}
  setCommentAdded(false)
},[commentCount])
  return (
    <div className="w-full ">

 
      <PostHeader postHeaderData={post}/>
      {/* media file */}
      <div className="h-96 md:h-[550px]">
        <img
          className="w-full  h-full object-contain text-center sm:mb-3 md:mb-2 hover:cursor-pointer "
          alt="profile picture"
          src={mediaPath+post.media}
        />
</div> 
        <div className=" mt-3">
         <PostAction post={postData} handleShowCommentsDiv={handleComment}/>
        </div>

     
        
         
        <div className="mt-1 flex mr-3 mb-2">
          <p className=" text-small font-semibold text-primary dark:text-secondary ">
            <span className=" text-small font-semibold text-primary dark:text-secondary hover:cursor-pointer">
              {post.username} {" "}
            </span>
            {
              fullDescription.length < 10 ?
              fullDescription :
              showMore ?
              fullDescription
              :
                fullDescription.slice(0,10)
            }
            {
              fullDescription.length > 10 && showLess && <span className="mx-2 font-bold hover:cursor-pointer" onClick={handleShowFullContent}>.....Show more</span>
            }
            {
              fullDescription.length > 10 && showMore && <span className="mx-2 font-bold hover:cursor-pointer" onClick={handleShowFullContent}>Show less</span>
            }
          </p>
        </div>

        
          {
            commentCount > 0 ?
            <p className=" text-small  text-primary dark:text-secondary my-2 hover:cursor-pointer" onClick={handleComment}>View all {post.totalCommentsCount} comments</p>
            :
            <p className=" text-small  text-primary dark:text-secondary my-2 hover:cursor-pointer">No comments added.</p>
          }
          
        
        { (!post.isUserCommentedOnPost || commentCount === 0) && <div className="flex">
          <div
            className="bg-secondary text-primary  dark:text-secondary dark:bg-primary w-10/12 w-max-10/12 border-0 focus:outline-none focus:border-0 focus:ring-0 p-2"
            contentEditable="true"
            onInput={handleInput}
            onBlur={handleBlur}
            onFocus={handleFocus}
            suppressContentEditableWarning={true}
            
          >
              {isPlaceholderVisible && <div className="placeholder text-primary dark:text-secondary border-b-2 border-secondary-border dark:border-primary-border">Add a new comment...</div>}
            </div>
            <div className="w-2/12 ">
              { isCommentAdded && <p className="font-bold text-small text-btn-enabled hover:cursor-pointer" onClick={handleNewCommentCreation}>Post</p> }
            </div>
      </div>
}

      {
        showCommentDiv && 
        <div className='p-2 my-4 mx-2 bg-secondary dark:bg-primary border-t-2 border-t-secondary-border dark:border-t-primary-border'>
        <Suspense fallback={<LoadingSpinner />}>
  <CommentPreview  postId={post.id} handleCommentsCountChange={handleCommentsCountChange} />
 </Suspense>

 </div>
}
      <div className="h-16">

      </div>
    </div>
  );
})
{/* //  <CommentDiv postId={post.id} handleCommentsCountChange={handleCommentsCountChange}/>   */}