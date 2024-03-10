
import '../App.css';
import { PiVideoFill } from "react-icons/pi";
import { FaRegComment, FaRegHeart } from "react-icons/fa6";
import sampleImage from '../assets/logos/logo_type_b_black.png'
import {  Image } from "@nextui-org/react";
import { SideNav } from '../pages/user/SideNav';



 const UserStoriesContent = () => {
  return (
    <>
      <div className="w-full p-10 h-screen bg-black md:pl-52 mb-5 ">
  

        <div className='border-b-2 border-b-gray-600 mb-5'>
        <h2 className='  text-white mb-5 mt-7 text-4xl md:text-4xl  pr-2'>Saved Items</h2>
        </div>
      
        
            <div className="grid grid-cols-3 gap-3 md:p-8 ">
              <div className="bg-red-600 text-white relative h-32 md:h-96 ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>

              <div className="bg-red-600 text-white relative h-32 md:h-96 hover:cursor-pointer ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute  rounded-3xl">
                  <FaRegHeart className="ml-2 text-white md:text-3xl" />
                  <p className="mr-2 text-base text-white md:text-3xl">10</p>

                  <FaRegComment className=" ml-3 text-white md:text-3xl" />
                  <p className=" text-base text-white md:text-3xl">10</p>
                </div>
                <PiVideoFill className="text-4xl md:text-6xl text-gray-200 z-40 top-3 right-3 md:top-7 md:right-6 absolute" />
                <Image
                  className="w-full z-20 bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>
              <div className="bg-red-600 text-white relative h-32 md:h-96">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>

              <div className="bg-red-600 text-white relative h-32 md:h-96 hover:cursor-pointer ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute  rounded-3xl">
                  <FaRegHeart className="ml-2 text-white md:text-3xl" />
                  <p className="mr-2 text-base text-white md:text-3xl">10</p>

                  <FaRegComment className=" ml-3 text-white md:text-3xl" />
                  <p className=" text-base text-white md:text-3xl">10</p>
                </div>
                <PiVideoFill className="text-4xl md:text-6xl text-gray-200 z-40 top-3 right-3 md:top-7 md:right-6 absolute" />
                <Image
                  className="w-full z-20 bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>
              <div className="bg-red-600 text-white relative h-32 md:h-96">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>

              <div className="bg-red-600 text-white relative h-32 md:h-96 hover:cursor-pointer ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute  rounded-3xl">
                  <FaRegHeart className="ml-2 text-white md:text-3xl" />
                  <p className="mr-2 text-base text-white md:text-3xl">10</p>

                  <FaRegComment className=" ml-3 text-white md:text-3xl" />
                  <p className=" text-base text-white md:text-3xl">10</p>
                </div>
                <PiVideoFill className="text-4xl md:text-6xl text-gray-200 z-40 top-3 right-3 md:top-7 md:right-6 absolute" />
                <Image
                  className="w-full z-20 bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>
              <div className="bg-red-600 text-white relative h-32 md:h-96">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute inset-0 rounded-3xl">
                  snf,nsd,mfnasd
                </div>

                <Image
                  className="w-full   z-20  bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>

              <div className="bg-red-600 text-white relative h-32 md:h-96 hover:cursor-pointer ">
                <div className="w-full h-full bg-slate-400 hidden hover:flex justify-center items-center z-30 hover-show-div bg-opacity-75 absolute  rounded-3xl">
                  <FaRegHeart className="ml-2 text-white md:text-3xl" />
                  <p className="mr-2 text-base text-white md:text-3xl">10</p>

                  <FaRegComment className=" ml-3 text-white md:text-3xl" />
                  <p className=" text-base text-white md:text-3xl">10</p>
                </div>
                <PiVideoFill className="text-4xl md:text-6xl text-gray-200 z-40 top-3 right-3 md:top-7 md:right-6 absolute" />
                <Image
                  className="w-full z-20 bg-opacity-100"
                  alt="profile picture"
                  src={sampleImage}
                />
              </div>
            </div>
          

         
    
      </div>
    </>
  );
};


export  const UserStories = ()=> {
  return (
    <SideNav>
      <UserStoriesContent/>
    </SideNav>
  )
}