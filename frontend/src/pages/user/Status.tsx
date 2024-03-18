import { IoAddCircleOutline } from "react-icons/io5"
interface StatusProps {
    handleClick :(event:React.MouseEvent<HTMLDivElement>)=>void,
    statusName:string,
    profilePictureUrl?:string
}
export const Status :React.FC<StatusProps>= ({handleClick,statusName,profilePictureUrl})=>{
    return (
        
        <div className="text-center hover:cursor-pointer mx-4 " onClick={(event) => handleClick(event)}>
            <div className="flex justify-center">
          {profilePictureUrl ?  
  
          <img className="md:mr-0 mr-4 ml-4 md:ml-0 border-3 dark:border-secondary-border border-primary-border w-14 h-14 md:w-16 md:h-12" 
          style={{ borderRadius: "50%" }}
          alt="profile picture"
         
          src={profilePictureUrl ?
          `http://localhost:8000/media/${profilePictureUrl}`
           : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
       }
           />

         : <IoAddCircleOutline className="text-2xl md:text-5xl hover:cursor-pointer dark:text-secondary text-primary" />
}
          </div>
          <p className="text-sm dark:text-secondary text-primary " style={{fontSize:'10px'}}>{statusName}</p>
        </div>
      
    )
}