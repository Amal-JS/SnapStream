import { TiThMenu } from "react-icons/ti";
import { useModal } from "../../hooks/useModal";
import { useAppDispatch } from "../../hooks/redux";
import { themeToggle, userLoggedOut } from "../../Redux/authSlice";
import { BiNavigation } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { MenuModal } from "./MenuModal.tsx"

export const UserPhoneHeader = () => {
  const dispatch = useAppDispatch();

  
  const handleMenu = () => {
    handleModalToggle();
  };
  const handleThemeChange = () => {
    dispatch(themeToggle());
  };
  const {isModalOpened,handleModalToggle} = useModal()
  const handleUserLogout = ()=>{
    dispatch(userLoggedOut())
  }
  return (
    <>
    <MenuModal  isModalOpened={isModalOpened}  handleModalToggle={handleModalToggle} handleThemeChange={handleThemeChange}
    handleUserLogout={handleUserLogout}/>
      <div className="p-3 flex justify-between">
        <div className="w-1/2">
          <h2 className="pacifico-regular  text-2xl mr-3 ">SnapStream</h2>
        </div>
        <div className="w-1/2 flex justify-end">
          <div className="w-3/12">
            <FaRegHeart className=" text-primary dark:text-secondary    hover:cursor-pointer text-4xl hover:bg-gray-700 hover:text-gray-300" />
          </div>
          <div className="w-3/12">
            <BiNavigation className=" text-primary dark:text-secondary  hover:cursor-pointer text-4xl mx-3  hover:bg-gray-700 hover:text-gray-300 " />
          </div>

          <div className="  w-3/12 md:p-1 ">
            <TiThMenu
              onClick={handleMenu}
              className="text-primary dark:text-secondary   text-4xl   ml-4    hover:cursor-pointer  hover:bg-gray-700 hover:text-gray-300"
            />
          </div>
        </div>
      </div>
    </>
  );
};
