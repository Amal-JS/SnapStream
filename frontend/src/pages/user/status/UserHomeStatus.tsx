import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux"
import { Status } from "./Status"
import { CreateStatus } from "./CreateStatus"
import { useModal } from "../../../hooks/useModal"
import { OpenStatus } from "./OpenStatus"
import axiosInstance from "../../../axios/axiosInstance"
import { statusRoot } from "../../../utils/url"
import { customErrorToast, customSuccessToast } from "../../../Toast"

interface UserStatus {
    id:string,
    description:string,
    media:string,
    authorId:string
    
}

export const UserHomeStatus = () =>{
    const loggedUserProfilePicture = useAppSelector(state => state.user.profilePictureUrl)
    const [showUserStatuses,setShowUserStatuses] = useState<boolean>(false)
    const {isModalOpened,handleModalToggle} = useModal()
    const userId = useAppSelector(state => state.user.userId)

    // open modal to create status
    const handleUserCreateStatus = ()=>{
       handleModalToggle()
    }
    //user active status array 
    const [userActiveStatuses,setUserActiveStatuses] = useState<UserStatus[]>([])
    //update active status array
    const handleUserActiveStatuses =(arrayOfStatuses : UserStatus[] | [])=>{
            setUserActiveStatuses(arrayOfStatuses)

    }

    // git user acive status from db
    const getUserCurrentActiveStatuses = async ()=>{

        const response = await axiosInstance.post(statusRoot + 'userStatus/',{'user_id':userId})
        if(response.data.statuses){
            setUserActiveStatuses(response.data.statuses[0])
            if(response.data.statuses[0].length == 0){
                customErrorToast('No active status for user')
            }
        }
        else{
            customErrorToast("Status can't be accessed now")
        }
    }
    //toggle to show status
    const handleOpenStatus =()=>{
        getUserCurrentActiveStatuses()
         
        if(userActiveStatuses?.length == 0){
         
        }else{
            setShowUserStatuses(prev => !prev)
        }
       
    }
    return(
        <>
        <div className="border-2 border-t-0 px-3  dark:border-primary-border border-secondary-border py-2 bg:secondary
        dark:bg-primary flex justify-between ">
               <div className="flex w-full overflow-scroll [&>div]:flex-shrink-0 no-scrollbar">
                <Status handleOpenStatus={handleOpenStatus} handleUserCreateStatus={handleUserCreateStatus} statusName={'View Story'} 
                profilePictureUrl={loggedUserProfilePicture} 
                
                />
            
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleOpenStatus={handleOpenStatus}  statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
            
            {isModalOpened &&
            <CreateStatus handleUserActiveStatuses={handleUserActiveStatuses} isModalOpened={isModalOpened} handleModalToggle={handleModalToggle}/>
            }
            {showUserStatuses &&
            <OpenStatus userActiveStatuses={userActiveStatuses ? userActiveStatuses : []} showStatus={showUserStatuses}/>
            }
                 </div>
            </div>
        </>
    )
}