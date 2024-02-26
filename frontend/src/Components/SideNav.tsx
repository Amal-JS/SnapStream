import { Image } from "@nextui-org/react";
import BlackLogo from "../assets/logos/black_logo.svg";
import { IoIosSearch, IoMdHome } from "react-icons/io";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import { MdOutlineAddBox } from "react-icons/md";
import { BiCompass, BiMoviePlay, BiNavigation } from "react-icons/bi";
import { useWindowSize } from "../hooks/useWindowSize";
import { Link } from "react-router-dom";
import { ReactNode } from "react";


interface SideNavProps {
    children : ReactNode
}
export const SideNav : React.FC<SideNavProps>= ({children}) => {
  const { width } = useWindowSize(); // Get the current window width using the useWindowSize hook
  const isSmallScreen = width < 740; //when width less than 640 the nav will be on bottom of screen

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
          <Image
            width={45}
            alt="App logo"
            src={BlackLogo}
            className="hidden md:block md:py-7 md:mb:3 hover:cursor-pointer "
          />
        </Link>

        <Link to="/">
          <IoMdHome className=" text-white  mt-2  text-4xl      md:text-4xl md:mb-6 hover:cursor-pointer  " />
        </Link>
        <IoIosSearch className=" text-white  mt-2  text-4xl  ml-9 md:ml-0     md:text-4xl md:mb-6 hover:cursor-pointer " />
        <BiCompass className="hidden md:block mt-2 text-white ml-9 md:ml-0  md:text-4xl md:mb-6 hover:cursor-pointer" />
        <BiMoviePlay className="text-white   mt-2 text-4xl    ml-9 md:ml-0  md:text-4xl md:mb-6 hover:cursor-pointer" />
        <BiNavigation className="hidden md:block mt-2 text-white  ml-9 md:ml-0   md:text-4xl md:mb-6 hover:cursor-pointer" />
        <FaRegHeart className="hidden md:block mt-2 text-white   ml-9 md:ml-0  md:text-4xl md:mb-6 hover:cursor-pointer" />
        <MdOutlineAddBox className="text-white  mt-2  text-4xl   ml-9 md:ml-0   md:text-4xl md:mb-6 hover:cursor-pointer" />
        <FaUserCircle className="text-white   mt-2 text-4xl     ml-9 md:ml-3   md:text-4xl md:mb-24 hover:cursor-pointer mr-4" />
      </div>

      <div className="bg-blue-600  h-screen">{children}</div>
    </div>
  );
};
