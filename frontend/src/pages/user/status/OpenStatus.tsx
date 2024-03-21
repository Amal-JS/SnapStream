import { useEffect, useState } from "react"
import { customErrorToast } from "../../../Toast"
import { useModal } from "../../../hooks/useModal"
import { CustomModal } from "../../../Components/Modal/Modal"
import { ModalTitle } from "../../../Components/Modal/ModalTitle"
import { ModalBody } from "../../../Components/Modal/ModalBody"
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";
import ProgressBar from "@ramonak/react-progress-bar";
import { useAppSelector } from "../../../hooks/redux"


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

  const handleDeleteStatus = ()=>{

  }

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
                    <div><ProgressBar completed={50} className="w-full" customLabel="..." height={'5px'}  bgColor={darkThemeEnabled ? '#fff' : '#000'} baseBgColor={darkThemeEnabled ? '#000' : '#fff' }/></div>
                    <div className="">
                        <div className="flex justify-end">
                        <MdClose className="text-primary dark:text-secondary text-4xl font-extrabold mt-3" onClick={handleModalToggle}/>
                        </div>

                        <div className="flex justify-end">
                        <MdDelete className="text-primary dark:text-secondary text-4xl font-extrabold mt-3" onClick={handleDeleteStatus}/>
                        </div>
                        </div>
                    
                    {userActiveStatuses.map(status => {
                                if(status.media){
                                    return (<div className="s-full" key={status.id}>
                                            <img src={`http://localhost:8000/${status.media}`} 
                                            className="w-full md:h-80 mt-4 p-2" />
                                            <p className="text-secondary dark:text-secondary mt-3 text-center">{status.description}</p>
                                        </div> )
                                }else{
                                    return (<div className="h-8/11 bg-secondary dark:bg-primary" key={status.id}>
                                        <p className="text-primary dark:text-secondary">{status.description}</p>
                                        </div>)
                                
                                }
                    })
                        
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