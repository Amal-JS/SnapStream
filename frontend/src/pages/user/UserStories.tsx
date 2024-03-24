import "../../App.css";
import { PiVideoFill } from "react-icons/pi";
import { FaRegComment, FaRegHeart } from "react-icons/fa6";
import sampleImage from "../../assets/logos/logo_type_b_black.png";
import { Image } from "@nextui-org/react";
import { SideNav } from "./SideNav";
import { useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { mediaPath, statusRoot } from "../../utils/url";
import { customErrorToast } from "../../Toast";
import { useNavigate } from "react-router-dom";

interface UserStatuses {
  description: string;
  media: string;
id: string;
}

const UserStoriesContent = () => {
  const userId = useAppSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const [userStories, setUserStories] = useState<UserStatuses[] | []>([]);

  const fetchUserStories = async () => {
    const response = await axiosInstance.get(
      statusRoot + `userStatus?user_id=${userId}`
    );
    if (response.data.userStories) {
      setUserStories(response.data.userStories);
      
      console.log("fetched all user stories",response.data);
    } else {
      customErrorToast("Could'nt access data .Try again later");
      navigate(`userprofile/${userId}`);
    }
  };
  //first call
  useEffect(() => {
    fetchUserStories();
  }, []);

  return (
    <>
      <div className="w-full p-10 h-screen bg-secondary dark:bg-primary md:pl-52 mb-5 ">
        <div className="border-b-2 border-secondary-border dark:border-primary-border mb-5">
          <h2 className="  text-primary dark:text-secondary mb-5 mt-7 text-4xl md:text-4xl  pr-2">
            Saved Items
          </h2>
        </div>

        {userStories.length == 0 ? (
          <div>
            <p className="font-bold text-primary dark:text-secondary text-center">
              No stories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 md:p-8 bg-secondary dark:bg-primary ">
            {userStories.map(story=>{
              if(story.media){
            return(  <div className="bg-secondary dark:bg-primary text-white relative h-32 md:h-96 hover:cursor-pointer " key={story.id}>
               
               <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
               <p className='font-bold text-primary dark:text-secondary text-center'>{story.description}</p>
                 </div>
 
                 <Image
                   className="w-full z-20 bg-opacity-100"
                   alt="profile picture"
                   src={mediaPath+`${story.media}`}
                 />
               </div>)
 
              }else{
                
  
              return  (<div className="bg-secondary dark:bg-primary text-white relative h-32 md:h-96" key={story.id}>
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                <p className='font-bold text-primary dark:text-secondary text-center'>{story.description}</p>
                  </div>
  
                  <div className='bg-secondary dark:bg-primary p-3 flex items-center justify-center h-full md:border-2 md:border-secondary-border dark:border-primary-border'>
                    <p className='font-bold text-primary dark:text-secondary text-center'>{story.description}</p>
                  </div>
                </div>)
              }
            }) }
          </div>
        )}
      </div>
    </>
  );
};

export const UserStories = () => {
  return (
    <SideNav>
      <UserStoriesContent />
    </SideNav>
  );
};
