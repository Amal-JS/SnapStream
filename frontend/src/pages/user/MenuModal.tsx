import { Button, ModalBody } from "@nextui-org/react"
import { MdSunny } from "react-icons/md"
import { CustomModal } from "../../Components/Modal/Modal"
import { ModalTitle } from "../../Components/Modal/ModalTitle"

interface ModalProps {
    isModalOpened:boolean,
    handleThemeChange :()=>void,
    handleModalToggle :()=>void,
    handleUserLogout :()=>void, 
}
export const MenuModal :React.FC<ModalProps> = ({isModalOpened,handleModalToggle,handleThemeChange,handleUserLogout})=>{
    return (
        <CustomModal isDismissable={true} modalToggle={isModalOpened} >
<ModalTitle title="Menu" handleModalToggle={handleModalToggle} isDismissable={true}>

</ModalTitle>
<ModalBody>
  <div className="p-3 text-center bg-secondary dark:bg-primary" >
  <Button className="w-3/4 mx-3 dark:bg-secondary dark:text-primary bg-primary
       text-secondary  rounded-2xl  " onClick={handleThemeChange}>
      <p className='text-2xl  text-center'>Change Theme</p>
      <MdSunny className=' text-4xl md:text-5xl hover:cursor-pointer border-0'  ></MdSunny>
    </Button>


    <Button className="w-3/4 mx-3 dark:bg-secondary dark:text-primary bg-primary
       text-secondary  rounded-2xl  mt-3" onClick={handleUserLogout}>
      <p className='text-2xl  text-center'>Logout</p>

    </Button>
    </div>
    </ModalBody>
      </CustomModal>
    )
}