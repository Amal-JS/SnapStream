import { useEffect, useState } from "react"
import { useAppSelector } from "../../../hooks/redux"
import { Status } from "./Status"
import { CreateStatus } from "./CreateStatus"
import { useModal } from "../../../hooks/useModal"
import { OpenStatus } from "./OpenStatus"
import axiosInstance from "../../../axios/axiosInstance"
import { statusRoot } from "../../../utils/url"
import { customErrorToast } from "../../../Toast"

interface UserStatus {
    id:string,
    description:string,
    media:string
}

export const UserHomeStatus = () =>{
    const loggedUserProfilePicture = useAppSelector(state => state.user.profilePictureUrl)
    const [showUserStatuses,setShowUserStatuses] = useState<boolean>(false)
    const {isModalOpened,handleModalToggle} = useModal()
    const userId = useAppSelector(state => state.user.userId)

    const handleUserCreateStatus = ()=>{
       handleModalToggle()
    }
    const [userActiveStatuses,setUserActiveStatuses] = useState<UserStatus[]>([])

    const handleUserActiveStatuses =(arrayOfStatuses : UserStatus[] | [])=>{
            setUserActiveStatuses(arrayOfStatuses)

    }


    useEffect(()=>{

    },[userActiveStatuses])

    const getUserCurrentActiveStatuses = async ()=>{

        
        const response = await axiosInstance.post(statusRoot + 'userStatus/',{'user_id':userId})
        if(response.data.statuses){
            setUserActiveStatuses(response.data.statuses[0])
        }
        else{
            customErrorToast("Status can't be accessed now")
        }
    }
    const handleOpenStatus =()=>{
 
        console.log('handleOpenStatus');
        
        if(userActiveStatuses?.length == 0){
            getUserCurrentActiveStatuses()
        console.log('fetched user statuses');
        
        }
        
        setShowUserStatuses(prev => !prev)
        console.log(showUserStatuses,'show user status component');
        
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