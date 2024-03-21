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


interface UserStatus {
    id:string,
    description:string,
    media:string,
    
}

interface OpenStatus {
    userActiveStatuses: UserStatus[] | [],
    showStatus:boolean
}

export const OpenStatus :React.FC<OpenStatus> = ({userActiveStatuses,showStatus})=>{

    const [isModalOpened,setModalToggle] = useState(false)
    const darkThemeEnabled = useAppSelector(state => state.user.darkTheme)
    const [progress, setProgress] = useState(100);
    const delayValue = Math.floor(100/(userActiveStatuses.length*10))
    const [currentStatusIndex, setCurrentStatusIndex] = useState<number>(0);
  
    
    const handleModalToggle = () => {
        setModalToggle((prev) => !prev)
       
        
    }
   const handleShowStatus = ()=>{
    if(userActiveStatuses.length == 0){
        console.log('open status component : array empty');
        customErrorToast('No active status ')
    }else{
        console.log('open status component :  not array empty');
        setModalToggle(true)
        console.log('modal in open status :',isModalOpened);
    }

}
    useEffect(()=>{
        handleShowStatus()
    },[showStatus])

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isModalOpened) {
            timer = setTimeout(() => {
                setModalToggle(false);
                setProgress(100); // Reset progress when closing modal
            }, userActiveStatuses.length * 10000); // 10 seconds per userActiveStatuses item
        }

        return () => clearTimeout(timer);
    }, [isModalOpened, userActiveStatuses]);

    // console.log('delay value :',delayValue,'array length',userActiveStatuses.length,'acive element',currentStatusIndex,'progress value :',progress);
    
    useEffect(() => {
        if (isModalOpened) {
            const interval = setInterval(() => {
                setProgress((prevProgress) => Math.max(prevProgress - delayValue, 0)); // Decrease progress by 10 every second
                // if(progress%10 == 0 && progress != 100){
                //     console.log('comes here updates index');
                    
                //     setCurrentStatusIndex((prevIndex) => prevIndex + 1);
                // }
              
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

  const handleDeleteStatus = ()=>{

    const handleDeleteStatus = async ()=>{
            const response = await axiosInstance.delete(statusRoot+'userStatus/',{'data':{'status_id':userActiveStatuses[currentStatusIndex].id}})
            if(response.data.statusDeleted){
                customSuccessToast('Deleted the status.')
            }else{
                customErrorToast("Status couldn't be deleted ")
            }
            }
    handleDeleteStatus()
  }

console.log('progress :',progress);

  const statusElements = ()=>{
   const value = userActiveStatuses.map(status => {
        return <h1 key={status.id} className="text-primary dark:text-secondary">{status.description}</h1>
})
console.log(userActiveStatuses);

return value

}
  
  
    return(
        <>
            <CustomModal isDismissable={true} modalToggle={isModalOpened} >
                <ModalTitle handleModalToggle={handleModalToggle} isDismissable={true}/>
                <ModalBody>
                    <div className="h-screen p-3 bg-secondary dark:bg-primary">
                    {/* progress bar */}
                    <div><ProgressBar completed={progress} className="w-full" customLabel="..." height={'5px'}  bgColor={darkThemeEnabled ? '#fff' : '#000'} baseBgColor={darkThemeEnabled ? '#000' : '#fff' }/></div>
                    <div className="">
                        <div className="flex justify-end">
                        <MdClose className="text-primary dark:text-secondary text-4xl font-extrabold mt-3" onClick={handleModalToggle}/>
                        </div>

                        <div className="flex justify-end">
                        <MdDelete className="text-primary dark:text-secondary text-4xl font-extrabold mt-3" onClick={handleDeleteStatus}/>
                        </div>
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
        <div className="h-8/11 bg-secondary dark:bg-primary">
            <p className="text-primary dark:text-secondary">
                {userActiveStatuses[currentStatusIndex]?.description}
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
}





