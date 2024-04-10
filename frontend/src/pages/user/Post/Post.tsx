import { PostHeader } from "./PostHeader";

import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import { useAppSelector } from "../../../hooks/redux";
import { PostAction } from "./PostAction";
import { CommentDiv } from "./CommentDiv";

export const Post = () => {
  const [content, setContent] = useState<string>("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [isCommentAdded,setCommentAdded] = useState<boolean>(false)
  const [fullDescription,setFullDescription] = useState<string>('')
  const [showMore,setShowMore] = useState<boolean>(false)
  const [showLess,setShowLess] = useState<boolean>(true)
  const comments = [{'id':'commentid1','content':{'description':'aldsjfasd asd fsldf alsdf sdf'},'authorId':'lklkjlj'},
                    {'id':'commentid2','content':{'description':'lsadflskdfl alsdfkjs asdf sadf ','authorId':'lkladfasdfkjlj'},'authorId':'lklkjlj'},
                    {'id':'commentid3','content':{'description':'a sfas asfd sadf sadf s dffa sdf','reply':'commentid1'},'authorId':'lklasdfaasdfsdkjlj'},
                    {'id':'commentid4','content':{'description':'a sfas asfd sadf sadf s dffa sdf','reply':'commentid1'},'authorId':'lklkjlj'},
                    {'id':'commentid5','content':{'description':'a sfas asfd sadf sadf s dffa sdf','reply':'commentid3'},'authorId':'lklasdfdsfkjlj'},
                    
]

  const [showCommentDiv,setShowCommentDiv] = useState<boolean>(false)

  const handleInput= (event: React.ChangeEvent<HTMLDivElement>) => {
    const { textContent } = event.target;
    
    if (textContent){
    setContent(textContent);
    setIsPlaceholderVisible(textContent.trim().length === 0)
    setCommentAdded(textContent.trim().length > 1)
    }

  };

  const handleFocus = () => {
    setIsPlaceholderVisible(false);
  };

  const handleBlur = () => {
    
    setIsPlaceholderVisible(content.trim().length < 2);
    
  };

  useEffect(()=>{
    setFullDescription("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quamaccusantium sapiente possimus eaque blanditiis reiciendis, velaspernatur neque, molestias atque voluptatum labore? Alias sit iustovitae quasi! In, accusamus tempora.")
  },[])

  const handleShowFullContent = ()=> {
    setShowLess(prev => !prev)
    setShowMore(prev => !prev)
  }
 
  const handleComment=()=>
    {
            setShowCommentDiv(prev => !prev)
    }
  return (
    <div className="w-full ">

 
      <PostHeader />
      {/* media file */}
      <div className="h-96 md:h-[550px]">
        <img
          className="w-full  h-full object-cover text-center sm:mb-3 md:mb-2 hover:cursor-pointer "
          alt="profile picture"
          src={
            "https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
          }
        />
</div> 
        <div className="flex mt-3">

         <PostAction postId={'alsdlsdflskdfj'} handleShowCommentsDiv={handleComment}/>
        </div>

        <p className=" text-small font-semibold text-primary dark:text-secondary my-2">
          1000 likes{" "}
        </p>
         
        <div className="mt-1 flex mr-3 mb-2">
          <p className=" text-small font-semibold text-primary dark:text-secondary ">
            <span className=" text-small font-semibold text-primary dark:text-secondary hover:cursor-pointer">
              Bijoy J r vbm{" "}
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
            comments.length> 0 ?
            <p className=" text-small  text-primary dark:text-secondary my-2 hover:cursor-pointer" onClick={handleComment}>View all {comments.length} comments</p>
            :
            <p className=" text-small  text-primary dark:text-secondary my-2 hover:cursor-pointer">No comments added.</p>
          }
          
        
        <div className="flex">
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
        { isCommentAdded && <p className="font-bold text-small text-btn-enabled">Post</p> }
      </div>
      </div>
      {
        showCommentDiv && <CommentDiv comments={comments}/>  }
      <div className="h-16">

      </div>
    </div>
  );
};
