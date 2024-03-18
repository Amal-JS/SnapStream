import { useAppSelector } from "../../hooks/redux"
import { Status } from "./Status"

export const UserHomeStatus = () =>{
    const loggedUserProfilePicture = useAppSelector(state => state.user.profilePictureUrl)
    const handleClick = ()=>{

    }
    return(
        <>
        <div className="border-2 border-t-0 px-3  dark:border-primary-border border-secondary-border py-2 bg:secondary
        dark:bg-primary flex justify-between ">
               <div className="flex w-full overflow-scroll [&>div]:flex-shrink-0 no-scrollbar">
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
            
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
            
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                <Status handleClick={handleClick} statusName={'View Story'} profilePictureUrl={loggedUserProfilePicture}/>
                </div>
            </div>
        </>
    )
}