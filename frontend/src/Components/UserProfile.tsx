import { IoAddCircleOutline } from "react-icons/io5";
import { SideNav } from "./SideNav";
import { Button, Image } from "@nextui-org/react";
import { useState } from "react";
import { MdCoPresent, MdOutlineCalendarViewMonth, MdOutlineVideoLibrary } from "react-icons/md";
import { LuUserSquare2 } from "react-icons/lu";


const Profile = () => {


  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tabId : string) => {
    setActiveTab(tabId);
  };
  return (
    <>
      <div className="w-screen p-2  bg-black md:pl-72 mb-5">
        {/* profile first secion */}
        <div className=" border-b-gray-500 border-b-2  mt-6">
          {/* profile pic , user profile info */}
          <div className="md:flex md:justify-between ">
            <div className="flex justify-center mt-4">
            <Image
              className="w-24 text-center md:w-64 sm:mb-3 md:mb-0"
              style={{ borderRadius: "50%" }}
              alt="profile picture"
              src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1708473600&semt=ais"
            />
            </div>
           
          
          <div>
            <div className="block md:flex mb-5 md:pl-32 ">
              <h2 className="font-medium text-xl md:text-2xl text-white mr-4 pl-4 md:pl-0 hover:cursor-pointer" >amal.adamzz</h2>

              <div className="flex md:mt-0 mt-4">
              <Button className="bg-gray-600 "><h3 className="text-base  font-medium text-white ">Edit Profile</h3></Button>
              <Button className="bg-gray-600 ml-4 "><h3 className="text-base  font-medium text-white ">View stories</h3></Button>
             
              </div>
            </div>
            <div className="flex mb-7  md:pl-32 ">
              <h2 className=" text-white text-sm md:text-xl mr-4 ">2 posts</h2>
              <h2 className=" text-white text-sm md:text-xl mr-4 hover:cursor-pointer">304 followers</h2>
              <h2 className=" text-white text-sm md:text-xl hover:cursor-pointer">735 following</h2>
            </div>
            <div className="md:pl-32 mb-4 p-3">
              <h2 className=" text-white text-sm md:text-xl mb-2">Amal J S</h2>
              <p className=" text-white text-sm md:text-base">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius,
                consequatur natus tempore sunt eum obcaecati voluptatem fuga
                amet cum, nobis cupiditate accusantium facilis eaque voluptatum,
                quod fugit. Animi, nulla aliquid.
              </p>
            </div>
          </div>
          </div>
          {/* profile second secion */}
          <div className="flex overflow-x-auto border-b-0 mt-5 text-white mb-5">
            <div className="text-center">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            <div className="text-center mx-4">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            <div className="text-center mx-4">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            
            <div className="text-center mx-4">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            <div className="text-center mx-4">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            
            <div className="text-center mx-4">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            
            <div className="text-center mx-4">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            
            <div className="text-center">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            <div className="text-center mx-4">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            <div className="text-center mx-4">
            <IoAddCircleOutline className="mx-3 text-base md:text-5xl"/>
            <p className='text-sm text-white'>New</p>
            </div>
            
            

        </div>
        </div>
       

       {/* user posts section in user profile */}
{/* header nav */}


<div className="mb-4">
    <ul className="flex flex-wrap  text-sm font-medium text-center mb-5" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
        <li className="me-2" role="presentation">
            <button className={`inline-block p-4  text-white rounded-t-lg  hover:cursor-pointer md:text-base ${activeTab === 'profile' ? 'border-t-4 border-red-700' : 'hover:text-gray-200 hover:border-b-red-300 dark:hover:text-white'}`} id="profile-tab" onClick={() => handleTabClick('profile')} data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><div className="flex items-center"><MdOutlineCalendarViewMonth className="pr-1 text-3xl"/>POSTS</div></button>
        </li>
        <li className="me-2" role="presentation">
            <button  className={`inline-block p-4  text-white  hover:cursor-pointer md:text-base ${activeTab === 'dashboard' ? 'border-t-4 border-red-700' : '  hover:text-gray-200 hover:border-b-red-300 dark:hover:text-white'}`} onClick={() => handleTabClick('dashboard')} id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false"><div className="flex items-center"><MdOutlineVideoLibrary className="pr-1 text-3xl"/>REELS</div></button>
        </li>
        <li className="me-2" role="presentation">
            <button  className={`inline-block p-4  text-white rounded-t-lg  hover:cursor-pointer md:text-base ${activeTab === 'settings' ? 'border-t-4 border-red-700' : 'hover:text-gray-200 hover:border-b-red-300 dark:hover:text-white'}`} onClick={() => handleTabClick('settings')} id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false"><div className="flex items-center"><LuUserSquare2   className="pr-1 text-3xl"/>TAGGED</div></button>
        </li>
       
    </ul>
</div>
<div id="default-tab-content ">


    <div className="hidden p-4 bg-black rounded-lg  " id="profile" role="tabpanel" aria-labelledby="profile-tab">
    <div className="grid grid-cols-3 gap-1">
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  

</div>
    </div>


    <div className="hidden p-4 rounded-lg bg-black" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
    <div className="grid grid-cols-3 gap-1">
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  

</div>
    </div>


    <div className="hidden p-4 rounded-lg bg-black" id="settings" role="tabpanel" aria-labelledby="settings-tab">
    <div className="grid grid-cols-3 gap-1">
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-blue-500 text-white  h-32  md:h-96">lkjdfkl</div>
  <div className="bg-red-600 text-white  h-32  md:h-96">lkjdfkl</div>
  

</div>
    </div>
    
</div>

{/* posts */}



  



</div>
    </>
  );
};

export const UserProfile = () => {
  return (
    <SideNav>
      <Profile />
    </SideNav>
  );
};
