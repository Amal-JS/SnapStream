import { Image } from "@nextui-org/react";
import BlackLogo from "../../assets/logos/black_logo.svg";
import { IoIosSearch, IoMdHome } from "react-icons/io";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { BiCompass, BiMoviePlay, BiNavigation } from "react-icons/bi";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { TiThMenu } from "react-icons/ti";
import { useModal } from "../../hooks/useModal";
import { themeToggle, userLoggedOut } from "../../Redux/authSlice";
import { UserPhoneHeader } from "./UserPhoneHeader";
import { MenuModal } from "./MenuModal.tsx";

interface SideNavProps {
    children : ReactNode
}





export const SideNav : React.FC<SideNavProps>= ({children}) => {
  const { width } = useWindowSize(); // Get the current window width using the useWindowSize hook
  const isSmallScreen = width < 740; //when width less than 640 the nav will be on bottom of screen
const navigate  = useNavigate()
//GET THE PROFILE PICTURE USER FROM STATEf
const profilePictureUrl = useAppSelector(state => state.user.profilePictureUrl)
const {isModalOpened,handleModalToggle} = useModal()
const dispatch=useAppDispatch()
    
const handleThemeChange = ()=>{
        dispatch(themeToggle())
      }
const handleUserLogout = ()=>{
  dispatch(userLoggedOut())
}

const handleMenu = ()=>{
  handleModalToggle()
}

  return (
    <div className="  w-full h-full   md:flex ">
    {/* menu modal */}
    <MenuModal isModalOpened={isModalOpened} handleModalToggle={handleModalToggle}
    handleThemeChange={handleThemeChange} handleUserLogout={handleUserLogout}/>
      <div
        className={` md:4/12 bg-secondary dark:bg-primary z-50  ${
          isSmallScreen 
            ? "   bottom-0 left-0  w-full flex  fixed py-1 border-3 border-secondary-border dark:border-primary-border"
            : " fixed h-[600-px] pb-2  flex flex-col justify-center items-center dark:md:border-primary-border md:border-secondary-border md:border-r-2 "
        }`}
      >
        <Link to="/">
        <div className='flex justify-center '>
          <Image
            width={45}
            alt="App logo"
            src={BlackLogo}
            className="hidden md:block md:py-7 md:mb:3 hover:cursor-pointer "
          />
             <p className='hidden md:block text-primary dark:text-secondary text-sm md:text-base font-medium mt-10 mx-2'>SnapStream</p>
        </div>
        </Link>

       
        <div className='flex  w-2/12 md:w-full md:mt-1 md:p-1 items-center justify-center md:mb-4' onClick={()=>navigate('/')}>
      
          <IoMdHome className=" text-primary dark:text-secondary   text-4xl      md:text-4xl  hover:cursor-pointer   " />
          <p className='hidden md:block text-primary dark:text-secondary text-sm md:text-base font-medium md:w-8/12  mx-2'>Home</p>
          
        </div>
       
        <div className='flex  w-2/12 md:w-full md:p-1 items-center justify-center md:mb-4 '><IoIosSearch className=" text-primary dark:text-secondary   text-4xl  ml-4 md:ml-0     md:text-4xl  hover:cursor-pointer  " />
        <p className='hidden md:block text-primary dark:text-secondary text-sm md:text-base font-medium md:w-8/12  mx-2 '>Search</p>
        </div>
        <div className='hidden md:flex  w-2/12 md:w-full md:p-1 items-center justify-center md:mb-4'><BiCompass className="hidden md:block text-primary dark:text-secondary ml-4 md:ml-0  md:text-4xl  hover:cursor-pointer " />
        <p className='hidden md:block text-primary dark:text-secondary text-sm md:text-base font-medium md:w-8/12  mx-2'>Explore</p>
        </div>
        <div className='flex  w-2/12 md:w-full md:p-1 items-center justify-center md:mb-4'><BiMoviePlay className="text-primary dark:text-secondary   text-4xl    ml-4 md:ml-0  md:text-4xl  hover:cursor-pointer " />
        <p className='hidden md:block text-primary dark:text-secondary text-sm md:text-base font-medium md:w-8/12  mx-2'>Create</p>
        </div>
        <div className=' hidden  md:flex  w-2/12 md:w-full md:p-1 items-center justify-center md:mb-4'><BiNavigation className="md:block text-primary dark:text-secondary  ml-4 md:ml-0   md:text-4xl  hover:cursor-pointer " />
        <p className='hidden md:block text-primary dark:text-secondary text-sm md:text-base font-medium md:w-8/12  mx-2'>Messages</p>
        </div>
        <div className='hidden md:flex  w-2/12 md:w-full md:p-1 items-center justify-center md:mb-4'><FaRegHeart className="hidden md:block text-primary dark:text-secondary   ml-4 md:ml-0  md:text-4xl  hover:cursor-pointer " />
        <p className='hidden md:block text-primary dark:text-secondary text-sm md:text-base font-medium md:w-8/12  mx-2'>Notifications</p>
        </div>
        <div className='flex  w-3/12 md:w-full md:p-1 items-center justify-center md:mb-4'><MdOutlineAddBox className="text-primary dark:text-secondary   text-4xl   ml-4 md:ml-0   md:text-4xl  hover:cursor-pointer " />
        <p className='hidden md:block text-primary dark:text-secondary text-sm md:text-base font-medium md:w-8/12  mx-2'>Create Post</p>
        </div>
        <Link to='/userprofile/'>
        <div className='flex  w-8/12 md:w-full md:py-1 items-center justify-center md:mb-4'>
          {profilePictureUrl ?
              <div className=" md:w-8/12  mt-2 md:mt-0">
     
              <img className="md:mr-0 mr-4 ml-4 md:ml-0 border-3 dark:border-secondary-border border-primary-border w-12 h-12 md:w-16 md:h-12" 
              style={{ borderRadius: "50%" }}
              alt="profile picture"
             
              src={profilePictureUrl ?
              `http://localhost:8000/media/${profilePictureUrl}`
               : "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
           }
               />
           
           </div>
           : <FaUserCircle className="text-primary dark:text-secondary   text-4xl     ml-6 md:ml-0   md:text-4xl md:mb-24 hover:cursor-pointer  mr-4 md:mr-0" />
          }
          <p className='hidden md:block text-primary dark:text-secondary text-sm md:text-base font-medium md:w-8/12 mx-2 md:mx-4'>Profile</p>
        </div>
          </Link>
          <div className='hidden md:flex  w-3/12 md:w-full md:p-1 justify-start'><TiThMenu 
          onClick={handleMenu}
          className="text-primary dark:text-secondary   text-7xl   ml-4 md:ml-6   md:text-4xl  hover:cursor-pointer  hover:bg-gray-700 hover:text-gray-300" />

        </div>
      </div>
      <div className="md:hidden dark:bg-primary  bg-secondary  border-b-2 border-secondary-border dark:border-primary-border">
        <UserPhoneHeader />
      </div>
      <div className="dark:bg-primary bg-secondary h-screen w-full">{children}</div>
    </div>
  );
};
