import { Image } from "@nextui-org/react";
import BlackLogo from "../assets/logos/black_logo.svg";
import { IoIosSearch, IoMdHome } from "react-icons/io";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { BiCompass, BiMoviePlay, BiNavigation } from "react-icons/bi";
import { useWindowSize } from "../hooks/useWindowSize";
import { Link, useNavigate } from "react-router-dom";
import { ReactNode } from "react";


interface SideNavProps {
    children : ReactNode
}
export const SideNav : React.FC<SideNavProps>= ({children}) => {
  const { width } = useWindowSize(); // Get the current window width using the useWindowSize hook
  const isSmallScreen = width < 740; //when width less than 640 the nav will be on bottom of screen
const navigate  = useNavigate()
  return (
    <div className="  w-full h-full   md:flex ">
      <div
        className={` md:4/12 bg-black z-50  ${
          isSmallScreen
            ? "   bottom-0 left-0  w-full flex justify-between fixed py-2"
            : " fixed h-[500-px] pb-2  flex flex-col justify-center items-center md:border-r-gray-600 md:border-r-2 "
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
             <p className='hidden md:block text-white text-sm md:text-base font-medium mt-10 mx-2'>SnapStream</p>
        </div>
        </Link>

       
        <div className='flex mt-1 w-full md:mt-1 p-1 items-center justify-center' onClick={()=>navigate('/')}>
      
          <IoMdHome className=" text-white   text-4xl      md:text-4xl md:mb-6 hover:cursor-pointer   " />
          <p className='hidden md:block text-white text-sm md:text-base font-medium md:w-8/12  mx-2'>Home</p>
          
        </div>
       
        <div className='flex mt-1 w-full p-1 items-center justify-center '><IoIosSearch className=" text-white   text-4xl  ml-9 md:ml-0     md:text-4xl md:mb-6 hover:cursor-pointer  " />
        <p className='hidden md:block text-white text-sm md:text-base font-medium md:w-8/12  mx-2 '>Search</p>
        </div>
        <div className='flex mt-1 w-full p-1 items-center justify-center'><BiCompass className="hidden md:block text-white ml-9 md:ml-0  md:text-4xl md:mb-6 hover:cursor-pointer " />
        <p className='hidden md:block text-white text-sm md:text-base font-medium md:w-8/12  mx-2'>Explore</p>
        </div>
        <div className='flex mt-1 w-full p-1 items-center justify-center'><BiMoviePlay className="text-white   text-4xl    ml-9 md:ml-0  md:text-4xl md:mb-6 hover:cursor-pointer " />
        <p className='hidden md:block text-white text-sm md:text-base font-medium md:w-8/12  mx-2'>Create</p>
        </div>
        <div className='flex mt-1 w-full p-1 items-center justify-center'><BiNavigation className="hidden md:block text-white  ml-9 md:ml-0   md:text-4xl md:mb-6 hover:cursor-pointer " />
        <p className='hidden md:block text-white text-sm md:text-base font-medium md:w-8/12  mx-2'>Messages</p>
        </div>
        <div className='flex mt-1 w-full p-1 items-center justify-center'><FaRegHeart className="hidden md:block text-white   ml-9 md:ml-0  md:text-4xl md:mb-6 hover:cursor-pointer " />
        <p className='hidden md:block text-white text-sm md:text-base font-medium md:w-8/12  mx-2'>Notifications</p>
        </div>
        <div className='flex mt-1 w-full p-1 items-center justify-center'><MdOutlineAddBox className="text-white   text-4xl   ml-9 md:ml-0   md:text-4xl md:mb-6 hover:cursor-pointer " />
        <p className='hidden md:block text-white text-sm md:text-base font-medium md:w-8/12  mx-2'>Create Post</p>
        </div>
        <Link to='/userprofile/'>
        <div className='flex mt-1 w-full p-1 items-center justify-center'>
          <FaUserCircle className="text-white   text-4xl     ml-9 md:ml-0   md:text-4xl md:mb-24 hover:cursor-pointer  mr-4 md:mr-0" />
          <p className='hidden md:block text-white text-sm md:text-base font-medium md:w-8/12 mx-2'>Your Profile</p>
        </div>
          </Link>
      </div>

      <div className="bg-blue-600  h-screen">{children}</div>
    </div>
  );
};
