import { PostHeader } from "./PostHeader";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { RiHeartLine } from "react-icons/ri";
import { IoHeartSharp } from "react-icons/io5";
import { useState } from "react";

export const Post = () => {
  const [content, setContent] = useState<string>("");
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [isCommentAdded,setCommentAdded] = useState<boolean>(false)
  
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
          <div className="w-1/2 flex ">
            <RiHeartLine className=" mr-3  text-primary dark:text-secondary text-2xl md:text-3xl font-light hover:cursor-pointer" />
            <IoHeartSharp className=" mr-3  text-red-600 text-2xl md:text-3xl font-light hover:cursor-pointer" />
            <FaRegComment className=" mr-3  text-primary dark:text-secondary text-2xl md:text-3xl font-light hover:cursor-pointer" />
          </div>
          <div className="w-1/2 mr-1 flex justify-end">
            <FaRegBookmark className="text-primary dark:text-secondary text-2xl md:text-2xl hover:cursor-pointer" />
            <FaBookmark className="text-primary dark:text-secondary text-2xl md:text-2xl hover:cursor-pointer" />
          </div>
        </div>

        <p className=" text-small font-semibold text-primary dark:text-secondary my-2">
          1000 likes{" "}
        </p>

        <div className="mt-1 flex mr-3 mb-2">
          <p className=" text-small font-semibold text-primary dark:text-secondary ">
            <span className=" text-small font-semibold text-primary dark:text-secondary hover:cursor-pointer">
              Bijoy J r vbm{" "}
            </span>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam
            accusantium sapiente possimus eaque blanditiis reiciendis, vel
            aspernatur neque, molestias atque voluptatum labore? Alias sit iusto
            vitae quasi! In, accusamus tempora.
          </p>
        </div>

        <p className=" text-small  text-primary dark:text-secondary my-2 hover:cursor-pointer">
          View all 50 comments{" "}
        </p>
        <div className="flex">
      <div
        className="bg-secondary text-primary  dark:text-secondary dark:bg-primary w-10/12 w-max-10/12 border-0 focus:outline-none focus:border-0 focus:ring-0 p-2"
        contentEditable="true"
        onInput={handleInput}
        onBlur={handleBlur}
        onFocus={handleFocus}
        suppressContentEditableWarning={true}
        
      >
        {isPlaceholderVisible && <div className="placeholder text-primary dark:text-secondary">Add a new comment...</div>}
      </div>
      <div className="w-2/12 ">
        { isCommentAdded && <p className="font-bold text-small text-btn-enabled">Post</p> }
      </div>
      </div>
      <div className="h-16">

      </div>
    </div>
  );
};
