import { IoAddCircleOutline } from "react-icons/io5";
import { SideNav } from "./SideNav";
import { Button, Image } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import {
  MdOutlineCalendarViewMonth,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { LuUserSquare2 } from "react-icons/lu";
import sampleImage from "../../assets/react.svg";
import { PiVideoFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { BsClipboard2Heart } from "react-icons/bs";
import { useModal } from "../../hooks/useModal";
import { CustomModal, modalContentType } from "../../Components/Modal/Modal";
import { ModalTitle } from "../../Components/Modal/ModalTitle";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ModalBody } from "../../Components/Modal/ModalBody";
import { ImageUpload } from "../../Components/ImageCrop/ImageUpload";
import "react-image-crop/dist/ReactCrop.css";
import axiosInstance from "../../axios/axiosInstance";
import { authRoot, mediaPath, postPath, rootUrlPath } from "../../utils/url";
import { customErrorToast, customSuccessToast } from "../../Toast";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userProfilePictureUpdated } from "../../Redux/authSlice";
import { Status } from "./status/Status";
import { OpenStatus } from "./status/OpenStatus";
import { PostView } from "./Post/PostView";

interface UserMemoryOrStatus {
  id: string;
  media?: string;
  description?: string;
  name?: string;
  authorId: string;
}

interface UserData {
  userId:string,
  username: string;
  profilePicture: string;
  bio: string;
  fullName: string;
  userMemories?: UserMemoryOrStatus[] | [];
}

interface PostData {
  id:string,
  userId:string,
  description : string,
  media : string,
  location ?: string
}

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { isModalOpened, handleModalToggle } = useModal();
  const [modalContent, setModalContent] = useState<modalContentType>();

  //user id in state
  const userId = useAppSelector((state) => state.user.userId);
  const [userData, setUserData] = useState<UserData>({
    userId:'',
    username: "",
    profilePicture: "",
    fullName: "",
    bio: "",
  });
  const [profilePictureUpdated, setProfilePictureUpdated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [toggleMemory, setToggleMemory] = useState<boolean>(false);
  const [selectedMemory, setSelectedMemory] = useState<
    UserMemoryOrStatus[] | []
  >([]);
  const [isMemoryDeleted, setMemoryDeleted] = useState<boolean>(false);

  const [selectedTab,setTabSelected] = useState<string>('posts')
  const [userPostData,setUserPostData] = useState<PostData[] | []>([])
  const [showPost,setShowPost] = useState<boolean>(false)
  const [selectedPost,setSeletedPost] = useState<PostData>({
    id:'',
    userId:'',
    description : '',
    media : '',
    location : ''
  })
  const parms = useParams()
  const [isProfilePictureUpdating,setProfilePictureUpdating] = useState<boolean>(false)
  //update user data in profile
  const fetchUserData = async () => {
    const response = await axiosInstance.post(
      authRoot + "getUserProfileData/",
      { user_id: parms.userId ? parms.userId : userId }
    );

    

    if (response.data.userData) {
      setUserData(response.data.userData);

      const profilePictureUrl = response.data.userData.profilePicture;
      //update user state
      if (profilePictureUrl && isProfilePictureUpdating) {
        dispatch(
          userProfilePictureUpdated({ profilePictureUrl: profilePictureUrl })
        );
        setProfilePictureUpdating(false)
      }
    }
  };

  //initail call
  useEffect(() => {
    fetchUserData();
  }, []);


  useEffect(() => {
    fetchUserData();
  }, [parms.userId]);


  //fetch data based on the initiall call
  const handleUserSelectedTabDataPosts = async ()=>{
      const response = await axiosInstance.get(postPath+`post/?userId=${userId}`)
      if(response.data.posts){
        setUserPostData(response.data.posts)
        console.log(response.data.posts);
      }else{
        customErrorToast("Couldn't get the posts now.Try again later.")
      }
  }
  const handleUserSelectedTabDataSaved = async ()=>{
    const response = await axiosInstance.get(postPath+`saved/?user_id=${userId}`)
    if(response.data.posts){
      setUserPostData(response.data.posts)
      console.log(response.data.posts);
    }else{
      customErrorToast("Couldn't get the posts now.Try again later.")
    }
    
  }
  useEffect(()=>{
    selectedTab === 'posts' ?
    handleUserSelectedTabDataPosts()
    : selectedTab === 'saved' &&
    handleUserSelectedTabDataSaved()
  },[selectedTab])

  const showUserFollowers = () => {
    console.log("all follower");

    setModalContent((prev) => ({
      isDismissable: true,
      modalToggle: isModalOpened,
      title: "Followers",
      handleModalToggle: handleModalToggle,
    }));
    handleModalToggle();
  };
  const showUserFollowing = () => {
    console.log("all following");
    setModalContent((prev) => ({
      isDismissable: true,
      modalToggle: isModalOpened,
      title: "Following",
      handleModalToggle: handleModalToggle,
    }));
    handleModalToggle();
  };
  const createNewMemory = () => {
    console.log("create new memory");
    setModalContent((prev) => ({
      isDismissable: true,
      modalToggle: isModalOpened,
      title: "New Memory",
      handleModalToggle: handleModalToggle,
    }));
    handleModalToggle();
  };


  //croped image string value function
  const handleProfilePictureUpdated = (imgStr: string) => {
    //close the modal
    handleModalToggle();

    const sendProfilePictureToDb = async () => {
      const response = await axiosInstance.patch(authRoot + "userData/", {
        user_id: userId,
        profilePicture: imgStr,
      });

      if (await response.data.profilePictureUpdated) {
        setProfilePictureUpdated(true);
        fetchUserData();

        customSuccessToast("Profile picture updated");
      } else {
        customErrorToast("Sorry profile picture upload failed.");
        customErrorToast("Try again after some time.");
      }
    };
    sendProfilePictureToDb();
  };

  // Reload the component when profilePictureUpdated state changes
  useEffect(() => {
   parms.userId ?
    navigate(`/user/${parms.userId}/`)
   :
    navigate("/profile/");
  }, [profilePictureUpdated]);

  //upload profile picture
  const handleUploadProfilePicture = () => {
    setProfilePictureUpdating(true)
    const modalContent = () => {
      return (
        <>
          <ImageUpload
            handleProfilePictureUpdated={handleProfilePictureUpdated}
          />
        </>
      );
    };

    if (modalContent) {
      setModalContent((prev) => ({
        isDismissable: true,
        modalToggle: isModalOpened,
        title: "Upload profile picture ",
        handleModalToggle: handleModalToggle,
        content: modalContent(),
      }));
    }

    handleModalToggle();
  };
  const handleOpenMemory = (event: React.MouseEvent<HTMLDivElement>) => {};
  const handleCreateMemory = (
    event: React.MouseEvent<HTMLDivElement | SVGElement>
  ) => {
    //set a variable in local storage specifying new memory creation , then navigate to user stories select one status and
    //create new memory
    localStorage.setItem("NewMemoryCreation", "true");
    navigate("/viewstories/");
  };

  const handleOpenStatus = (id: string) => {
    if (!userData.userMemories) {
      return;
    }
    const clickedMemory = userData.userMemories.filter(
      (memory) => memory.id == id
    );

    setSelectedMemory(clickedMemory);
    setToggleMemory((prev) => !prev);
  };

  //When user deletes the memory this function is invoked and this causes the updation of userData in userProfile
  const handleStatusOrMemoryDeleted = useCallback(() => {
    setMemoryDeleted((prev) => !prev);
    fetchUserData();
  }, [isMemoryDeleted]);

  const handleToggleMemory = useCallback(() => {
    setToggleMemory(false);
  }, [toggleMemory]);

  // console.log("toggle open status ", toggleMemory);
  // console.log('user posts ',userPostData);

  const handleUserClickedPost = (postData : PostData)=>{
    setShowPost(prev => !prev)
    setSeletedPost(postData)
  }
  console.log('show post ',showPost);
  
  return (
    <>
      {isModalOpened && modalContent && (
        <CustomModal
          isDismissable={modalContent.isDismissable}
          modalToggle={modalContent.isDismissable}
        >
          <ModalTitle
            title={modalContent.title}
            handleModalToggle={modalContent.handleModalToggle}
            isDismissable={modalContent.isDismissable}
          ></ModalTitle>
          <ModalBody>{modalContent && modalContent.content}</ModalBody>
        </CustomModal>
      )}
      <div className="w-full  p-2 dark:bg-primary bg-secondary md:pl-64 mb-5">
        {/* profile first secion */}
        <div className=" dark:border-primary-border border-secondary-border border-b-2  mt-6">
          {/* profile pic , user profile info */}
          <div className="">
            <div className="flex justify-start  md:justify-between  md:pl-3 pr-3 mb-5">
              <div className="pl-4 mb-4 w-4/12  mt-4">
                <img
                  className={`w-24 h-24 text-center md:w-64 md:h-64 sm:mb-3 md:mb-2 ${userId === userData.userId && 'hover:cursor-pointer border-2'}  dark:border-secondary-border border-primary-border`}
                  style={{ borderRadius: "50%" }}
                  alt="profile picture"
                  onClick={userId === userData.userId ? handleUploadProfilePicture : ()=>{console.log('')}}
                  src={
                    userData.profilePicture
                      ? `http://localhost:8000/media/${userData.profilePicture}`
                      : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
                  }
                />
              </div>
              <div className="block w-8/12 mb-5 mt-6 md:mt-0 md:pl-28  pl-2">
                <h2 className="font-medium text-xl md:text-2xl dark:text-secondary text-primary  mr-4 pl-4 md:pl-0 md:pb-5 md:mt-10 hover:cursor-pointer">
                  {userData.username}
                </h2>

                <div className="flex md:mt-0 mt-4 pl-2 md:pl-1">
                {
                  userId === userData.userId &&
<Button className="bg-gray-600 dark">
                    <Link to="/edituserprofile/ljlaksjf">
                      <h3 className="text-base  font-medium dark:text-secondary text-primary  ">
                        Edit Profile
                      </h3>
                    </Link>
                  </Button>
                  
                }  
                  <Button className={`bg-gray-600 ${userId === userData.userId && 'ml-4'} dark`}>
                    <Link to="/viewstories/">
                      <h3 className="text-base  font-medium dark:text-secondary text-primary  ">
                        View stories
                      </h3>
                    </Link>
                  </Button>
                </div>
                <div className="flex  mt-4 md:mt-16 pl-2 md:pl-1">
                
<Button className="bg-btn-enabled w-24 md:w-36">
                    <Link to="/edituserprofile/ljlaksjf">
                      <h3 className="text-base  font-medium dark:text-secondary text-primary  ">
                        Follow
                      </h3>
                    </Link>
                  </Button>
                  
                 
                  <Button className={`bg-btn-enabled ml-5 md:ml-10 w-24 md:w-36`}>
                    <Link to="/viewstories/">
                      <h3 className="text-base  font-medium dark:text-secondary text-primary  ">
                        Message
                      </h3>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <div className="flex mb-7  md:pl-32 ">
                <h2 className=" dark:text-secondary text-primary  text-sm md:text-xl mr-4 ">
                  2 posts
                </h2>
                <h2
                  className=" dark:text-secondary text-primary  text-sm md:text-xl mr-4 hover:cursor-pointer"
                  onClick={() => showUserFollowers()}
                >
                  304 followers
                </h2>
                <h2
                  className=" dark:text-secondary text-primary  text-sm md:text-xl hover:cursor-pointer"
                  onClick={() => showUserFollowing()}
                >
                  735 following
                </h2>
              </div>
              <div className="md:pl-32 mb-4 p-3">
                <h2 className=" dark:text-secondary text-primary  text-base md:text-xl mb-2">
                  {userData.fullName ? userData.fullName : "Add full name"}
                </h2>
                <p className=" dark:text-secondary text-primary  text-sm md:text-base">
                  {userData.bio ? userData.bio : "Add bio"}
                </p>
              </div>
            </div>
          </div>
          {/* profile second secion */}
          <div className="flex  overflow-x-auto border-b-0 mt-5 dark:text-secondary text-primary  mb-5 no-scrollbar">
           
           { userData.userId === userId && 
           <Status
           handleOpenStatus={handleOpenMemory}
           handleUserCreateStatus={handleCreateMemory}
           statusName="Create new memory"
           isShowingMemory={true}
         />
           } 
            {userData.userMemories &&
              userData.userMemories.map((memory) => {
                return (
                  <>
                    {memory.name && (
                      <Status
                        key={memory.id}
                        handleOpenStatus={() => handleOpenStatus(memory.id)}
                        statusName={memory.name}
                        profilePictureUrl={memory.media?.slice(6)}
                      />
                    )}
                  </>
                );
              })}
          </div>
        </div>

        {/* user posts section in user profile */}
        {/* header nav */}

        <div className="mb-4">

          <div className="flex px-5 justify-between md:justify-normal mb-5 border-b-3 dark:border-b-primary-border border-b-secondary-border">
          <div id='posts' className={`flex px-5 hover:cursor-pointer justify-between py-5 ${selectedTab === 'posts' &&  'border-t-red-700 border-t-5 '  }`} onClick={()=>setTabSelected('posts')}>
                  <MdOutlineCalendarViewMonth className="pr-1 text-3xl" />
                  POSTS
                </div>

                <div className={`flex px-5 hover:cursor-pointer justify-between py-5 ${selectedTab === 'saved' &&  'border-t-red-700 border-t-5 ' }`}  onClick={()=>setTabSelected('saved')}>
                  <BsClipboard2Heart className="pr-1 text-3xl" />
                  SAVED
                </div>
          </div>
          
        </div>
        <div >
          <div
            className=" p-4 dark:bg-primary bg-secondary rounded-lg  "
          >
            <div className={`${!userPostData && 'hidden' } grid grid-cols-3 gap-1 dark:bg-primary bg-secondary`}>
              {
              userPostData &&

                userPostData.map(post=>{
                  return (
                    <div 
                    key={post.id}
                    onClick={()=>handleUserClickedPost(post)}
            className="bg-secondary dark:bg-primary text-white relative h-32 md:h-96 hover:cursor-pointer flex items-center" >
               
               <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
               <div>
                    {/* <p className='font-bold text-primary dark:text-secondary text-center'>{post.description.slice(0,10)}</p>
                    <p className='font-bold text-primary dark:text-secondary text-center'>{post.description.slice(10,20)}</p> */}
                  <p className='font-bold text-primary dark:text-secondary text-center'>{post.description}</p>
                    </div>
                 </div>
 
                 <Image
                   className="w-full z-20 bg-opacity-100 "
                   alt="profile picture"
                   src={mediaPath+`${post.media}`}
                 />
               </div>

                  )
                })
                

              }
              {/* <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96 hover:cursor-pointer ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute  rounded-3xl">
                  <FaRegHeart className="ml-2 dark:text-secondary text-primary  md:text-3xl" />
                  <p className="mr-2 text-base dark:text-secondary text-primary  md:text-3xl">
                    10
                  </p>

                  <FaRegComment className=" ml-3 dark:text-secondary text-primary  md:text-3xl" />
                  <p className=" text-base dark:text-secondary text-primary  md:text-3xl">
                    10
                  </p>
                </div>
                <PiVideoFill className="text-4xl md:text-6xl text-gray-200 z-40 top-3 right-3 md:top-7 md:right-6 absolute" />
                <Image
                  className="w-full z-20 bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div> */}
              {/* <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div> */}

              
              

              
              {/* <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div> */}

              
            </div>
            <div className="bg-secondary dark:bg-primary text-center">
                
                {selectedTab === 'posts'  && userPostData.length == 0?
                <p className="text-primary dark:text-secondary text-center">No posts.</p> 
                : 
                selectedTab === 'saved'  && userPostData.length == 0  &&
                <p className="text-primary dark:text-secondary">No saved posts.</p> 

              }
                </div>
          </div>

        </div>

        {/* posts */}
      </div>
      {showPost &&
      <PostView  openModal={showPost} postDataIdUserClicked={selectedPost.id}/>
      }


      {toggleMemory && (
        <OpenStatus
          userActiveStatuses={selectedMemory}
          showStatus={toggleMemory}
          isOpenedForMemory={true}
          handleStatusOrMemoryDeleted={handleStatusOrMemoryDeleted}
          handleToggleState={handleToggleMemory}
        />
      )}

      
    </>
  );
};

export const UserProfile = () => {
  return (
    <SideNav>
      <Profile />
    </SideNav>
  );
};
