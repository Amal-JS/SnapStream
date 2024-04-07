import { BsThreeDots } from "react-icons/bs"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { useNavigate } from "react-router-dom"



export const PostHeader = ()=>{
 const navigate = useNavigate()
    return (
        <div className=" flex  bg-secondary dark:bg-primary border-b-3 border-secondary-border dark:border-primary-border">
            <div className="w-3/4 flex ">
            
            {/* <img className="w-24 h-24 text-center md:w-64 md:h-64 sm:mb-3 md:mb-2 hover:cursor-pointer border-2  dark:border-secondary-border border-primary-border" 
                 style={{ borderRadius: "50%" }}
                 alt="profile picture"
                onClick={handleUploadProfilePicture}
                 src={userData.profilePicture ?
                 `http://localhost:8000/media/${userData.profilePicture}`
                  : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
              }
                  /> */}
                  <div>
                  <img className="w-12 h-w-12 text-center md:w-14 md:h-14 sm:mb-3 md:mb-2 hover:cursor-pointer border-2  dark:border-secondary-border border-primary-border" 
                 style={{ borderRadius: "50%" }}
                 alt="profile picture"
                 src={ "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
              }
                  />
                  </div>
                  <div className="ml-3">
                    <p className=" font-bold text-primary dark:text-secondary hover:cursor-pointer" >Bijoy J r vbm </p>
                    <p className=" text-small font-semibold text-primary dark:text-secondary">Punnathur ,Guruvayoor</p>
                  </div>
                 
            </div>
            <div className="w-1/4 flex justify-end">
            <Dropdown className="">

<DropdownTrigger>
 
  <Button 
  disableRipple={true}
  className="bg-secondary dark:bg-primary"
  >
   <BsThreeDots  className="text-primary dark:text-secondary text-2xl hover:cursor-pointer absolute top-3 right-4"/>
    
  </Button>

</DropdownTrigger>
<DropdownMenu aria-label="Static Actions"  >
  <DropdownItem key="new" onClick={()=>navigate('/editpost/')}>Edit</DropdownItem>
  <DropdownItem key="copy">Report</DropdownItem>
  {/* <DropdownItem key="delete" className="text-danger" color="danger">
    Delete file
  </DropdownItem> */}
</DropdownMenu>
</Dropdown>
      
  </div>
        </div>
    )
}