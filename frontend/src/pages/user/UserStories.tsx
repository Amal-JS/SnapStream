import "../../App.css";
import { PiVideoFill } from "react-icons/pi";
import { FaRegComment, FaRegHeart } from "react-icons/fa6";
import sampleImage from "../../assets/logos/logo_type_b_black.png";
import { Image, ModalBody } from "@nextui-org/react";
import { SideNav } from "./SideNav";
import { useAppSelector } from "../../hooks/redux";
import { useEffect, useState } from "react";
import axiosInstance from "../../axios/axiosInstance";
import { mediaPath, rootUrlPath, statusRoot } from "../../utils/url";
import { customErrorToast, customSuccessToast } from "../../Toast";
import { useNavigate } from "react-router-dom";
import { OpenStatus } from "./status/OpenStatus";
import { useModal } from "../../hooks/useModal";
import { CustomModal } from "../../Components/Modal/Modal";
import { ModalTitle } from "../../Components/Modal/ModalTitle";
import { CustomButton } from "../../Components/Form/Button";
import { FaMemory } from "react-icons/fa";
import { TextInput } from "../../Components/Form/TextInput";


interface UserStatus {
  description: string;
  media: string;
id: string;
authorId:string
}

const UserStoriesContent = () => {
  const userId = useAppSelector((state) => state.user.userId);
  const navigate = useNavigate();
  const [userStories, setUserStories] = useState<UserStatus[] | []>([]);
  const [showStatus,setShowStatus] = useState<boolean>(false)
  const [selectedStatus,setSelectedStatus] = useState<UserStatus[] | []>([])
  const [isNewMemoryCreation,setNewMemoryCreation]= useState<boolean>(false)
  const {isModalOpened,handleModalToggle} = useModal()
  const [formFilled,setformFilled] = useState<boolean>(true)
  const [newMemoryName,setNewMemoryName] = useState<string>('')

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


const toggleCreateNewMemory =()=>{
  console.log(selectedStatus)
handleModalToggle()
}
const handleNewMemoryName = (event:React.ChangeEvent<HTMLInputElement>)=>{
      const {value} = event.target
      setNewMemoryName(value)
      if (newMemoryName.length > 3 ){
        setformFilled(false)
      }
}

const handleCreateNewMemory = async ()=>{

  const formData = new FormData;
  formData.append('status',selectedStatus[0].id)
  userId && formData.append('user',userId)
  if (!newMemoryName){
    customErrorToast('Give memory a name')
    return
  }

  formData.append('name',newMemoryName)
 const response  = await axiosInstance.post(rootUrlPath+statusRoot+'userMemory/',formData)
  if(response.data.isMemoryCreated){
    customSuccessToast('Memory created successfully.')
    navigate('/userprofile/')
  }else{
    customErrorToast('Please try again after some time.')
    customErrorToast('Try adding new memory after some time')
  }

}

//show the selected status in the modal
const handleOpenStatus =()=>{

  setShowStatus(prev => !prev);
}


  const handleStatusClick = (id:string)=>{

    const statusObject = userStories.filter(element=>element.id == id)
    setSelectedStatus(statusObject)


    isNewMemoryCreation
    ?
    toggleCreateNewMemory()
    :
    handleOpenStatus()
   
    
  }

  //user viewing component either to view the eariler statuses or create new memory
  useEffect(()=>{
    const isUserVistedToCreateNewMemory = localStorage.getItem('NewMemoryCreation')
    if(isUserVistedToCreateNewMemory){
      setNewMemoryCreation(true)
    }

    return ()=>{
      if(isUserVistedToCreateNewMemory){
        localStorage.removeItem('NewMemoryCreation')
      }
    }
  },[])
  //network call
  useEffect(() => {
    fetchUserStories();
  }, []);


  return (
    <>
    <CustomModal isDismissable={true} modalToggle={isModalOpened}  >
      <ModalTitle handleModalToggle={handleModalToggle} isDismissable={true} title={'Create new memory'}/>
      <ModalBody >
        {
          selectedStatus[0]?.media ?
            <>
          <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
               <p className='font-bold text-primary dark:text-secondary text-center'>{selectedStatus[0].description ? (selectedStatus[0].description.slice(0, 20) + ' lkjlkj '+ selectedStatus[0].description.slice(20)) : 'no description' }</p>
                 </div>
 
                 <Image
                   className="w-full z-20 bg-opacity-100"
                   alt="profile picture"
                   src={mediaPath+`${selectedStatus[0].media}`}
                 />
                 </>
          : 
            <>
               <div className='bg-secondary dark:bg-primary p-3 flex items-center justify-center h-full md:border-2 md:border-secondary-border dark:border-primary-border'>
               <div>
                    <p className='font-bold text-primary dark:text-secondary text-center'>{selectedStatus[0]?.description.slice(0,10)}</p>
                    <p className='font-bold text-primary dark:text-secondary text-center'>{selectedStatus[0]?.description.slice(10,20)}</p>
                  
                    </div>
                  </div>
            </>

        } 
      
             
        <TextInput error={''} Icon={FaMemory} name="Memory" placeholder="New Memory Name" handleChange={handleNewMemoryName}></TextInput>
        <CustomButton formFilled={formFilled} handleOnClick={handleCreateNewMemory} label="Create"></CustomButton>
      </ModalBody>
    </CustomModal>
      <div className="w-full p-10 h-screen bg-secondary dark:bg-primary md:pl-52 mb-5 ">
        <div className="border-b-2 border-secondary-border dark:border-primary-border mb-5">
          <h2 className="  text-primary dark:text-secondary mb-5 mt-7 text-4xl md:text-4xl  pr-2">
            {
              isNewMemoryCreation ? 'Select one status' : 'Saved Items'
            }
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
            return(  <div 
              onClick={()=>handleStatusClick(story.id)}
            className="bg-secondary dark:bg-primary text-white relative h-32 md:h-96 hover:cursor-pointer flex items-center" key={story.id}>
               
               <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
               <div>
                    <p className='font-bold text-primary dark:text-secondary text-center'>{story.description.slice(0,10)}</p>
                    <p className='font-bold text-primary dark:text-secondary text-center'>{story.description.slice(10,20)}</p>
                  
                    </div>
                 </div>
 
                 <Image
                   className="w-full z-20 bg-opacity-100 "
                   alt="profile picture"
                   src={mediaPath+`${story.media}`}
                 />
               </div>)
 
              }else{
                
  
              return  (<div
                onClick={()=>handleStatusClick(story.id)}
              className="bg-secondary dark:bg-primary text-white relative h-32 md:h-96 hover:cursor-pointer" key={story.id}>
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                <p className='font-bold text-primary dark:text-secondary text-center'>{story.description.slice(0,10)}</p>
                  </div>
  
                  <div className='bg-secondary dark:bg-primary p-3 flex items-center justify-center h-full md:border-2 md:border-secondary-border dark:border-primary-border'>
                    <div>
                    <p className='font-bold text-primary dark:text-secondary text-center'>{story.description.slice(0,10)}</p>
                    <p className='font-bold text-primary dark:text-secondary text-center'>{story.description.slice(10,20)}</p>
                  
                    </div>
                    
                  </div>
                </div>)
              }
            }) }
          </div>
        )}
        {showStatus && 
        <OpenStatus  userActiveStatuses={selectedStatus} showStatus={true}/>
        }
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
