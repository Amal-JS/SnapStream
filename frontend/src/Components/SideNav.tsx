import { Image } from '@nextui-org/react'
import BlackLogo  from '../assets/logos/black_logo.svg'
import { IoIosSearch, IoMdHome } from "react-icons/io";
import { FaRegHeart, FaUserCircle } from 'react-icons/fa';
import {  MdOutlineAddBox } from 'react-icons/md';
import { BiCompass, BiMoviePlay, BiNavigation, } from 'react-icons/bi';
import { useEffect, useState } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array to run effect only once

    return windowSize;
};



export const SideNav = () => {
    const { width } = useWindowSize(); // Get the current window width using the useWindowSize hook
    const isSmallScreen = width < 640; // Define a threshold for small screens (e.g., 640px)

    return (
        <div className='  w-full h-full   md:flex '>

        <div className={` md:w-24 bg-black   ${isSmallScreen ? '   bottom-0 left-0  w-full flex justify-between absolute py-4 h-auto' : 'h-screen pb-2  flex flex-col justify-center items-center '}`}>
            <Image
                width={45}
                alt="App logo"
                src={BlackLogo}
                className='hidden md:block md:py-7 md:mb:3 hover:cursor-pointer '
            />
            <IoMdHome className=' text-white  mt-2  text-4xl      md:text-4xl md:mb-9 hover:cursor-pointer ' />
            <IoIosSearch className=' text-white  mt-2  text-4xl  ml-9 md:ml-0     md:text-4xl md:mb-9 hover:cursor-pointer '  />
            <BiCompass className='hidden md:block mt-2 text-white ml-9 md:ml-0  md:text-4xl md:mb-9 hover:cursor-pointer' />
            <BiMoviePlay className='text-white   mt-2 text-4xl    ml-9 md:ml-0  md:text-4xl md:mb-9 hover:cursor-pointer' />
            <BiNavigation className='hidden md:block mt-2 text-white  ml-9 md:ml-0   md:text-4xl md:mb-9 hover:cursor-pointer' />
            <FaRegHeart className='hidden md:block mt-2 text-white   ml-9 md:ml-0  md:text-4xl md:mb-9 hover:cursor-pointer' />
            <MdOutlineAddBox className='text-white  mt-2  text-4xl   ml-9 md:ml-0   md:text-4xl md:mb-9 hover:cursor-pointer' />
            <FaUserCircle className='text-white   mt-2 text-4xl     ml-9 md:ml-3   md:text-4xl md:mb-9 hover:cursor-pointer mr-4' />
        </div>

        <div className='bg-blue-600   w-screen h-screen' >
   
            sjlfjslfjlsdjf</div>


</div>
    );
};