import { Button, ModalBody } from "@nextui-org/react"
import { MdSunny } from "react-icons/md"
import { CustomModal } from "../../Components/Modal/Modal"
import { ModalTitle } from "../../Components/Modal/ModalTitle"
import { useEffect, useState } from "react"
import axiosInstance from "../../axios/axiosInstance"
import { customErrorToast } from "../../Toast"
import { mediaPath } from "../../utils/url"
import { Link, useNavigate } from "react-router-dom"

interface ModalProps {
    isModalOpened:boolean,
    handleModalToggle :()=>void,
}

interface UsersData {
    fullName:string,
    profilePictureUrl:string,
    userId:string,
    username:string
}

export const SearchModal :React.FC<ModalProps> = ({isModalOpened,handleModalToggle,})=>{

    const [searchValue,setSearchValue] = useState<string>('')
    const [usersSearchData,setUsersSearchData] =useState<UsersData[] | []>([])
    const navigate = useNavigate()
    const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        const {value} = event.target;
        setSearchValue(value)
              
    }
    const handleSearch = async ()=>{
        const response = await axiosInstance.post('search/',{'search_data':searchValue})
        if(response.data.users){
            setUsersSearchData(response.data.users)
        }else if(response.status === 500){
            customErrorToast("Couldn't get the search info now.Please try again now.")
        }
        
    }
    useEffect(()=>{
        if(searchValue){
            handleSearch()
        }
        !searchValue && setUsersSearchData([]) 
    },[searchValue])
    return (
        <CustomModal isDismissable={true} modalToggle={isModalOpened} size="2xl">
<ModalTitle title="Search" handleModalToggle={handleModalToggle} isDismissable={true}>
      
</ModalTitle>
<ModalBody>
  <div className="p-3 text-center bg-secondary dark:bg-primary" >
  <input className="w-10/12 bg-secondary text-primary dark:bg-primary
  border-3
  dark:text-secondary rounded-2xl p-4  dark:border-primary-border border-secondary-border" 
  placeholder="Search Users..."
  onChange={handleOnChange}

  />
<div className="p-3 ">
  {
    usersSearchData.length !== 0 ?
    <div className="md:flex md:justify-center md:w-full"> 
            {
                usersSearchData.map(user=>{
                    return   <div className="w-full  p-3 my-2 flex hover:cursor-pointer border-b-2 border-b-secondary-border dark:border-b-primary-border" 
    key={user.userId} onClick={()=>handleModalToggle}
                    > 
                 <Link to={`/user/${user.userId}/`}  replace className="w-full flex" >
                            <div className="w-5/12 md:w-3/12 flex items-center ">
                            <img className="w-16 h-16 rounded-[50%]" src={user.profilePictureUrl ? mediaPath+user.profilePictureUrl : 'sldjfl'} />
                            </div>
                            <div className="7/12 md:w-9/12">
                            <p className="ml-3 my-2 text-primary dark:text-secondary text-base   text-start">{user.username}</p>
                            <p className="ml-3 my-2 text-primary dark:text-secondary text-[12px] text-start">{user.fullName}</p>
                            </div>
                            </Link>
                            </div>
                })
            }
    </div>
    :  usersSearchData.length === 0 && searchValue &&
    <p className="text-center text-primary mt-5 dark:text-secondary">
        No results..
    </p>
  }
  </div>
    </div>
    </ModalBody>
      </CustomModal>
    )
}