import { IoAddCircleOutline } from "react-icons/io5";
import { SideNav } from './SideNav';
import { Button, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  MdOutlineCalendarViewMonth,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { LuUserSquare2 } from "react-icons/lu";
import sampleImage from '../../assets/react.svg'
import { PiVideoFill } from "react-icons/pi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { BsClipboard2Heart } from "react-icons/bs";
import { useModal } from "../../hooks/useModal";
import { CustomModal, modalContentType } from "../../Components/Modal/Modal";
import { ModalTitle } from "../../Components/Modal/ModalTitle";
import { Link, useNavigate } from "react-router-dom";
import { ModalBody } from "../../Components/Modal/ModalBody";
import { ImageUpload } from "../../Components/ImageCrop/ImageUpload";
import 'react-image-crop/dist/ReactCrop.css'
import axiosInstance from "../../axios/axiosInstance";
import { authRoot, rootUrlPath } from "../../utils/url";
import { customErrorToast, customSuccessToast } from "../../Toast";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { userProfilePictureUpdated } from "../../Redux/authSlice";
import { Status } from "./status/Status";
import { OpenStatus } from "./status/OpenStatus";


interface UserMemoryOrStatus {
  id:string,
  media? : string,
  description? : string,
  name?:string,
  authorId:string
}

interface UserData {
  username:string,
  profilePicture:string,
  bio:string,
  fullName:string
  userMemories?:UserMemoryOrStatus[] | []
}


const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { isModalOpened, handleModalToggle } = useModal();
  const [modalContent,setModalContent] = useState <modalContentType> ()

  //user id in state 
  const userId = useAppSelector(state => state.user.userId)
  const [userData,setUserData] = useState<UserData>({
    username:'',
    profilePicture:'',
    fullName:'',
    bio:''
  })
  const [profilePictureUpdated, setProfilePictureUpdated] = useState(false);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [toggleNewMemoryCreationModal,setToggleNewMeomoryCreationModal] = useState<boolean>(false)
  const [toggleMemory,setToggleMemory] = useState<boolean>(false)
  const [selectedMemory,setSelectedMemory] = useState<UserMemoryOrStatus[] | []>([])
  const [isMemoryDeleted,setMemoryDeleted] = useState<boolean>(false)
//update user data in profile
const fetchUserData = async() => {

    const response = await axiosInstance.post(authRoot+'getUserProfileData/',{user_id:userId})
    
    
    if (response.data.userData){
      setUserData(response.data.userData)
      console.log('memories',response.data.userData.userMemories);
      
      const profilePictureUrl = response.data.userData.profilePicture
      //update user state
      if(profilePictureUrl){
        dispatch(userProfilePictureUpdated({profilePictureUrl:profilePictureUrl}))
      }
      

    }
  }

  //initail call
  useEffect(()=>{
   
    fetchUserData()
      },[])




  const showUserFollowers = () => {
    console.log("all follower");

      setModalContent(prev => (
        {
          isDismissable : true,
          modalToggle:isModalOpened,
          title:'Followers',
          handleModalToggle:handleModalToggle,
          }
      ))
      handleModalToggle();
    
  };
  const showUserFollowing = () => {
    console.log("all following");
    setModalContent(prev => (
      {
        isDismissable : true,
        modalToggle:isModalOpened,
        title:'Following',
        handleModalToggle:handleModalToggle,
        }
    ))
    handleModalToggle();
  };
  const createNewMemory = () => {
    console.log("create new memory");
    setModalContent(prev => (
      {
        isDismissable : true,
        modalToggle:isModalOpened,
        title:'New Memory',
        handleModalToggle:handleModalToggle,
        }
    ))
    handleModalToggle();
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    
  };

  //croped image string value function 
  const handleProfilePictureUpdated =(imgStr:string)=>{
    //close the modal
    handleModalToggle()

    
    const sendProfilePictureToDb = async () =>{
          const response = await axiosInstance.patch(authRoot+'userData/',{'user_id':userId,'profilePicture':imgStr})
         
          
          if(await response.data.profilePictureUpdated){
            setProfilePictureUpdated(true)
            fetchUserData()

              customSuccessToast('Profile picture updated')
              
          }else{
            customErrorToast('Sorry profile picture upload failed.')
            customErrorToast('Try again after some time.')
          }
    }
    sendProfilePictureToDb()
  }

    // Reload the component when profilePictureUpdated state changes
    useEffect(() => {
      navigate('/userprofile/')
    }, [profilePictureUpdated]);

    

  //upload profile picture 
  const handleUploadProfilePicture = ()=>{

    const modalContent = () =>{
      return (
        <>       
        <ImageUpload handleProfilePictureUpdated={handleProfilePictureUpdated}/>
        </>) }

        if(modalContent){
          setModalContent(prev => (
            {
              isDismissable : true,
              modalToggle:isModalOpened,
              title:'Upload profile picture ',
              handleModalToggle:handleModalToggle,
              content:modalContent()
          
              }
          ))
        }

handleModalToggle();
  }
const handleOpenMemory = (event:React.MouseEvent<HTMLDivElement>)=>{

}
const handleCreateMemory = (event:React.MouseEvent<HTMLDivElement|SVGElement>)=>{
  //set a variable in local storage specifying new memory creation , then navigate to user stories select one status and 
  //create new memory
  localStorage.setItem('NewMemoryCreation','true')
  navigate('/viewstories/')
}

const handleOpenStatus = (id:string)=>{
  if(!userData.userMemories) {
    return 
  }
  const clickedMemory = userData.userMemories.filter(memory => memory.id == id)

  setSelectedMemory(clickedMemory)
  setToggleMemory(prev => !prev)
}

//When user deletes the memory this function is invoked and this causes the updation of userData in userProfile
const handleStatusOrMemoryDeleted =()=>{
  setMemoryDeleted(prev => !prev)
}

useEffect(()=>{
  fetchUserData()

},[isMemoryDeleted])
  return (
    <>
     {
      isModalOpened &&  modalContent  &&
      <CustomModal isDismissable={modalContent.isDismissable} modalToggle={modalContent.isDismissable}>
        <ModalTitle title={modalContent.title} handleModalToggle={modalContent.handleModalToggle}  isDismissable={modalContent.isDismissable}>
          
        </ModalTitle>
        <ModalBody>
        {modalContent && modalContent.content}
        </ModalBody>
      </CustomModal>
     }
      <div className="w-full  p-2 dark:bg-primary bg-secondary md:pl-64 mb-5">
        {/* profile first secion */}
        <div className=" dark:border-primary-border border-secondary-border border-b-2  mt-6">
          {/* profile pic , user profile info */}
          <div className="">
            <div className="flex justify-start  md:justify-between  md:pl-3 pr-3 mb-5">
              <div className="pl-4 mb-4 w-4/12  mt-4">
     
                 <img className="w-24 h-24 text-center md:w-64 md:h-64 sm:mb-3 md:mb-2 hover:cursor-pointer border-2  dark:border-secondary-border border-primary-border" 
                 style={{ borderRadius: "50%" }}
                 alt="profile picture"
                onClick={handleUploadProfilePicture}
                 src={userData.profilePicture ?
                 `http://localhost:8000/media/${userData.profilePicture}`
                  : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
              }
                  />
              
              </div>
              <div className="block w-8/12 mb-5 mt-6 md:mt-0 md:pl-28  pl-2">
                <h2 className="font-medium text-xl md:text-2xl dark:text-secondary text-primary  mr-4 pl-4 md:pl-0 md:pb-5 md:mt-10 hover:cursor-pointer">
                  {userData.username}
                </h2>

                <div className="flex md:mt-0 mt-4 pl-2 md:pl-1">
                  <Button className="bg-gray-600 dark">
                  <Link to='/edituserprofile/ljlaksjf'>
                    <h3 className="text-base  font-medium dark:text-secondary text-primary  ">
                      Edit Profile
                    </h3></Link>
                  </Button>
                  <Button className="bg-gray-600 ml-4 dark">
                  <Link to='/viewstories/'>
                    <h3 className="text-base  font-medium dark:text-secondary text-primary  ">
                      View stories
                    </h3></Link>
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
                  {userData.fullName ? userData.fullName : 'Add full name'}
                </h2>
                <p className=" dark:text-secondary text-primary  text-sm md:text-base">
                  {userData.bio ? userData.bio : 'Add bio'}
                </p>
              </div>
            </div>
          </div>
          {/* profile second secion */}
          <div className="flex  overflow-x-auto border-b-0 mt-5 dark:text-secondary text-primary  mb-5 no-scrollbar">
       <Status handleOpenStatus={handleOpenMemory} handleUserCreateStatus={handleCreateMemory}  statusName="Create new memory" isShowingMemory={true}/>
         {userData.userMemories && 
         userData.userMemories.map(memory => 
          {
            return (
              <>
                {
                  memory.name
                  && 
                  <Status 
                  key={memory.id} 
                  handleOpenStatus={() => handleOpenStatus(memory.id)} 
                  statusName={memory.name} profilePictureUrl={memory.media?.slice(6)}
                  
                  />
                }
               
              </>
            )
          }
          )
         }
         </div>
        </div>

        {/* user posts section in user profile */}
        {/* header nav */}

        <div className="mb-4">
          <ul
            className="flex flex-wrap  text-sm font-medium text-center mb-5"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4  dark:text-secondary text-primary  rounded-t-lg  hover:cursor-pointer md:text-base ${
                  activeTab === "profile"
                    ? "border-t-4 border-red-700"
                    : "hover:text-gray-200 hover:border-b-red-300 dark:hover:dark:text-secondary text-primary "
                }`}
                id="profile-tab"
                onClick={() => handleTabClick("profile")}
                data-tabs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                <div className="flex items-center">
                  <MdOutlineCalendarViewMonth className="pr-1 text-3xl" />
                  POSTS
                </div>
              </button>
            </li>

            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4  dark:text-secondary text-primary   hover:cursor-pointer md:text-base ${
                  activeTab === "dashboard"
                    ? "border-t-4 border-red-700"
                    : "  hover:text-gray-200 hover:border-b-red-300 dark:hover:dark:text-secondary text-primary "
                }`}
                onClick={() => handleTabClick("dashboard")}
                id="dashboard-tab"
                data-tabs-target="#dashboard"
                type="button"
                role="tab"
                aria-controls="dashboard"
                aria-selected="false"
              >
                <div className="flex items-center">
                  <MdOutlineVideoLibrary className="pr-1 text-3xl" />
                  REELS
                </div>
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4  dark:text-secondary text-primary   hover:cursor-pointer md:text-base ${
                  activeTab === "saved"
                    ? "border-t-4 border-red-700"
                    : "  hover:text-gray-200 hover:border-b-red-300 dark:hover:dark:text-secondary text-primary "
                }`}
                onClick={() => handleTabClick("saved")}
                id="saved-tab"
                data-tabs-target="#saved"
                type="button"
                role="tab"
                aria-controls="saved"
                aria-selected="false"
              >
                <div className="flex items-center">
                  <BsClipboard2Heart className="pr-1 text-3xl" />
                  SAVED
                </div>
              </button>
            </li>
            <li className="me-2" role="presentation">
              <button
                className={`inline-block p-4  dark:text-secondary text-primary  rounded-t-lg  hover:cursor-pointer md:text-base ${
                  activeTab === "settings"
                    ? "border-t-4 border-red-700"
                    : "hover:text-gray-200 hover:border-b-red-300 dark:hover:dark:text-secondary text-primary "
                }`}
                onClick={() => handleTabClick("settings")}
                id="settings-tab"
                data-tabs-target="#settings"
                type="button"
                role="tab"
                aria-controls="settings"
                aria-selected="false"
              >
                <div className="flex items-center">
                  <LuUserSquare2 className="pr-1 text-3xl" />
                  TAGGED
                </div>
              </button>
            </li>
          </ul>
        </div>
        <div id="default-tab-content ">
          <div
            className="hidden p-4dark:bg-primary bg-secondary rounded-lg  "
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            <div className="grid grid-cols-3 gap-1 dark:bg-primary bg-secondary">
              <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                data-tooltip-target="tooltip-default"
                data-tooltip-trigger="hover" 
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                 
                />
                <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium dark:text-secondary text-primary  transition-opacity duration-300 bg-blue-300 rounded-lg shadow-sm opacity-0 tooltip ">
    Tooltip content
    <div className="tooltip-arrow" data-popper-arrow></div>
</div>
              </div>

              <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96 hover:cursor-pointer ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute  rounded-3xl">
                  <FaRegHeart className="ml-2 dark:text-secondary text-primary  md:text-3xl" />
                  <p className="mr-2 text-base dark:text-secondary text-primary  md:text-3xl">10</p>

                  <FaRegComment className=" ml-3 dark:text-secondary text-primary  md:text-3xl" />
                  <p className=" text-base dark:text-secondary text-primary  md:text-3xl">10</p>
                </div>
                <PiVideoFill className="text-4xl md:text-6xl text-gray-200 z-40 top-3 right-3 md:top-7 md:right-6 absolute" />
                <Image
                  className="w-full z-20 bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>
              <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>

              <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96 hover:cursor-pointer ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute  rounded-3xl">
                  <FaRegHeart className="ml-2 dark:text-secondary text-primary  md:text-3xl" />
                  <p className="mr-2 text-base dark:text-secondary text-primary  md:text-3xl">10</p>

                  <FaRegComment className=" ml-3 dark:text-secondary text-primary  md:text-3xl" />
                  <p className=" text-base dark:text-secondary text-primary  md:text-3xl">10</p>
                </div>
                <PiVideoFill className="text-4xl md:text-6xl text-gray-200 z-40 top-3 right-3 md:top-7 md:right-6 absolute" />
                <Image
                  className="w-full z-20 bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>
              <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>

              <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96 hover:cursor-pointer ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute  rounded-3xl">
                  <FaRegHeart className="ml-2 dark:text-secondary text-primary  md:text-3xl" />
                  <p className="mr-2 text-base dark:text-secondary text-primary  md:text-3xl">10</p>

                  <FaRegComment className=" ml-3 dark:text-secondary text-primary  md:text-3xl" />
                  <p className=" text-base dark:text-secondary text-primary  md:text-3xl">10</p>
                </div>
                <PiVideoFill className="text-4xl md:text-6xl text-gray-200 z-40 top-3 right-3 md:top-7 md:right-6 absolute" />
                <Image
                  className="w-full z-20 bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>
              <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>

              <div className="bg-red-600 dark:text-secondary text-primary  relative h-32 md:h-96 hover:cursor-pointer ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute  rounded-3xl">
                  <FaRegHeart className="ml-2 dark:text-secondary text-primary  md:text-3xl" />
                  <p className="mr-2 text-base dark:text-secondary text-primary  md:text-3xl">10</p>

                  <FaRegComment className=" ml-3 dark:text-secondary text-primary  md:text-3xl" />
                  <p className=" text-base dark:text-secondary text-primary  md:text-3xl">10</p>
                </div>
                <PiVideoFill className="text-4xl md:text-6xl text-gray-200 z-40 top-3 right-3 md:top-7 md:right-6 absolute" />
                <Image
                  className="w-full z-20 bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>
            </div>
          </div>

          <div
            className="hidden p-4 rounded-lgdark:bg-primary bg-secondary"
            id="dashboard"
            role="tabpanel"
            aria-labelledby="dashboard-tab"
          ></div>

          <div
            className="hidden p-4 rounded-lgdark:bg-primary bg-secondary"
            id="saved"
            role="tabpanel"
            aria-labelledby="saved-tab"
          >
            saved tab
          </div>
          <div
            className="hidden p-4 rounded-lgdark:bg-primary bg-secondary"
            id="settings"
            role="tabpanel"
            aria-labelledby="settings-tab"
          ></div>
        </div>

        {/* posts */}
      </div>
      {
        toggleMemory && 
        <OpenStatus  userActiveStatuses={selectedMemory}  showStatus={toggleMemory} isOpenedForMemory={true} handleStatusOrMemoryDeleted={handleStatusOrMemoryDeleted}/>
      }
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
