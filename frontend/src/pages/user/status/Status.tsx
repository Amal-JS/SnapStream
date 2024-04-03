import { IoAddCircleOutline } from "react-icons/io5"
import { FaPlus } from "react-icons/fa";
interface UserStatus {
    id:string,
    description:string,
    media:string
}

interface StatusProps {
    handleUserCreateStatus? :(event:React.MouseEvent<HTMLDivElement|SVGElement>)=>void,
    statusName:string,
    profilePictureUrl?:string,
    handleOpenStatus:(event:React.MouseEvent<HTMLDivElement>)=>void,
    isShowingMemory?:boolean
    

}

export const Status :React.FC<StatusProps>= ({isShowingMemory = false, handleUserCreateStatus,statusName,profilePictureUrl,handleOpenStatus})=>{
    return (
        
        <div className={`text-center hover:cursor-pointer ml-4 min-w-[100px] `} >
            <div className="relative">
            <div className="flex justify-center"> 
        <div className="open-status text-center">
        
          <img className=" md:ml-0 border-3 dark:border-secondary-border border-primary-border w-14 h-14 md:w-16 md:h-12" 
          style={{ borderRadius: "50%" }}
          alt="profile picture"
          onClick={handleOpenStatus}
          src={profilePictureUrl ?
          `http://localhost:8000/media/${profilePictureUrl}`
           : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
       }
           />

</div>
           {  handleUserCreateStatus &&
                <FaPlus onClick={(event) => handleUserCreateStatus(event)} className="absolute bottom-[-6px] right-3 md:right-0  text-base text-primary dark:text-secondary"/>
           }
                </div>
                
          </div>
          
<div className="w-50 flex justify-center">
<div className="w-50 ">

          <p className="text-sm  dark:text-secondary text-primary mt-2" style={{fontSize:'10px'}}>{statusName.slice(0,10)}</p>
          <p className="md:text-sm dark:text-secondary text-primary" style={{fontSize:'10px'}}>{statusName.slice(11,20)}</p>
       
        
</div>

</div>

        </div>
      
    )
}