import { useEffect, useState } from "react"
import { customErrorToast, customSuccessToast } from "../../../Toast"
import { useModal } from "../../../hooks/useModal"
import { CustomModal } from "../../../Components/Modal/Modal"
import { ModalTitle } from "../../../Components/Modal/ModalTitle"
import { ModalBody } from "../../../Components/Modal/ModalBody"
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";
import ProgressBar from "@ramonak/react-progress-bar";
import { useAppSelector } from "../../../hooks/redux"
import axiosInstance from "../../../axios/axiosInstance"
import { statusRoot } from "../../../utils/url"
import { useNavigate } from "react-router-dom"
import React from "react"


interface UserMemoryOrStatus {
    id:string,
    description?:string,
    media?:string,
    authorId:string,
    name?:string,
    
}

interface OpenStatus {
    userActiveStatuses: UserMemoryOrStatus[] | [],
    showStatus:boolean,
    isOpenedForMemory?:boolean
    handleStatusOrMemoryDeleted?:()=>void,
    handleToggleState?:()=>void,
    
    handleOnClose?:()=>void
}

export const OpenStatus :React.FC<OpenStatus> = React.memo(({handleToggleState,handleStatusOrMemoryDeleted,userActiveStatuses,showStatus,isOpenedForMemory = false,handleOnClose})=>{

    const [isModalOpened,setModalToggle] = useState(false)
    const darkThemeEnabled = useAppSelector(state => state.user.darkTheme)
    //progress bar completed value 100
    const [progress, setProgress] = useState(100);
    //delay value will be calculated by the length of user active statuses
    const delayValue = Math.floor(100/(userActiveStatuses.length*10))
    //time changes , automaticaaly array element changes
    const [currentStatusIndex, setCurrentStatusIndex] = useState<number>(0);
  
    const userId = useAppSelector(state => state.user.userId)
    const navigate = useNavigate()
    //modal open close
    const handleModalToggle = () => {
        setModalToggle((prev) => !prev) 
        handleToggleState && handleToggleState()  
    }
   //open status
   const handleShowStatus = ()=>{
    if(userActiveStatuses.length == 0){
        console.log('open status component : array empty');
        customErrorToast('No active status ')
    }else{
        console.log('open status component :  array not empty');
        setModalToggle(true)
    }

}

    useEffect(()=>{
        handleShowStatus()
    },[showStatus])

    // timer 
    useEffect(() => {
        let timer: NodeJS.Timeout;
//if modal opened and if full time is completed automatically the modal is closed.
        if (isModalOpened) {
            timer = setTimeout(() => {
                setModalToggle(false);
                handleToggleState && handleToggleState()
                setProgress(100); // Reset progress when closing modal
            }, userActiveStatuses.length * 10000); // 10 seconds per userActiveStatuses item
        }

        return () => clearTimeout(timer);

    }, [isModalOpened, userActiveStatuses]);

    // console.log('delay value :',delayValue,'array length',userActiveStatuses.length,'acive element',currentStatusIndex,'progress value :',progress);
    
    useEffect(() => {
        if (isModalOpened) {
            const interval = setInterval(() => {
                //update the progess value by decreasing delay value in second
                setProgress((prevProgress) => Math.max(prevProgress - delayValue, 0));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isModalOpened]);


    useEffect(() => {
        if (userActiveStatuses.length > 0) {
            const totalDuration = userActiveStatuses.length * 10 * 1000; // Total duration for all elements
            const currentIndex = Math.floor((totalDuration - progress * totalDuration / 100) / (10 * 1000)); // Calculate current index based on progress
    
            setCurrentStatusIndex(currentIndex);
        }
    }, [progress, userActiveStatuses]);

    const handleMemoryDeletion = async ()=>{
        const response = await axiosInstance.delete(statusRoot+'userMemory/',{'data':{'memory_id':userActiveStatuses[currentStatusIndex].id}})
            
            
        if(response.data.memoryDeleted){
            customSuccessToast('Deleted the memory.')
            //update user active statuses
            handleToggleState && handleToggleState()
            setModalToggle(false)
            handleStatusOrMemoryDeleted && handleStatusOrMemoryDeleted()

        }else{
            customErrorToast("Memory couldn't be deleted ")
        }
    }

  const handleDeleteStatus = ()=>{

    const handleDeleteStatus = async ()=>{

            if (isOpenedForMemory){
                handleMemoryDeletion()
                return
            }
            const response = await axiosInstance.delete(statusRoot+'userStatus/',{'data':{'status_id':userActiveStatuses[currentStatusIndex].id}})
            
            
            if(response.data.statusDeleted){
                customSuccessToast('Deleted the status.')
                console.log('custom error toast shown');
                //update user active statuses
                setModalToggle(false)
                handleToggleState && handleToggleState()
                handleStatusOrMemoryDeleted && handleStatusOrMemoryDeleted()
            }else{
                customErrorToast("Status couldn't be deleted ")
            }
            }
    handleDeleteStatus()
  }

// console.log('progress :',progress);
// console.log('userId :',userId,'status author id :',userActiveStatuses[currentStatusIndex].authorId);

  
  
    return(
        <>
            <CustomModal isDismissable={true} modalToggle={isModalOpened} handleOnClose={handleOnClose} >
                <ModalTitle handleModalToggle={handleModalToggle} isDismissable={true}/>
                <ModalBody>
                    <div className="h-screen p-3 bg-secondary dark:bg-primary">
                    {/* progress bar */}
                    <div><ProgressBar completed={progress} className="w-full" customLabel="..." height={'5px'}  bgColor={darkThemeEnabled ? '#fff' : '#000'} baseBgColor={darkThemeEnabled ? '#000' : '#fff' }/></div>
                    <div className="">
                        <div className="flex justify-end">
                        <MdClose className="text-primary dark:text-secondary text-4xl font-extrabold mt-3  hover:cursor-pointer" onClick={handleModalToggle}/>
                        </div>

                        {userActiveStatuses[currentStatusIndex]?.authorId == userId  && 
                        <div className="flex justify-end">
                        <MdDelete className="text-primary dark:text-secondary text-4xl font-extrabold mt-3 hover:cursor-pointer" onClick={handleDeleteStatus}/>
                        </div>
                        }
                        
                        </div>
                    
                        {
    userActiveStatuses.length > 0 && userActiveStatuses[currentStatusIndex]?.media ? (
        <div className="s-full">
            <img
                src={`http://localhost:8000/${userActiveStatuses[currentStatusIndex]?.media}`}
                className="w-full md:h-80 mt-4 p-2"
            />
            <p className="text-secondary dark:text-secondary mt-3 text-center">
                {userActiveStatuses[currentStatusIndex]?.description}
            </p>
        </div>
    ) : (
        <div className="h-8/11 bg-secondary dark:bg-primary mt-10 p-4 text-center">
            <p className="text-primary dark:text-secondary text-4xl w-full">
                {userActiveStatuses[currentStatusIndex]?.description?.slice(0,10)}
            </p>
            <p className="text-primary dark:text-secondary text-4xl w-full">
                {userActiveStatuses[currentStatusIndex]?.description?.slice(10,20)}
            </p>
            <p className="text-primary dark:text-secondary text-4xl w-full">
                {userActiveStatuses[currentStatusIndex]?.description?.slice(20,30)}
            </p>
            <p className="text-primary dark:text-secondary text-4xl w-full">
                {userActiveStatuses[currentStatusIndex]?.description?.slice(30,40)}
            </p>

        </div>
    )
}
<div>
    {/* {  userActiveStatuses.length != 0 && statusElements()} */}

                    </div>
                    </div>
                </ModalBody>
            </CustomModal>
        </>
    )
})





