import { Button, ModalBody } from "@nextui-org/react"
import { CustomModal } from "../../Components/Modal/Modal"
import { ModalTitle } from "../../Components/Modal/ModalTitle"
import { useState } from "react"
import { useAppSelector } from "../../hooks/redux"

interface CreateStatePorps {
    isModalOpened:boolean,
    handleModalToggle:()=>void
}
export const CreateStatus :React.FC<CreateStatePorps>= ({isModalOpened,handleModalToggle})=>{
 
    const userId = useAppSelector(state => state.user.userId)
    const handleCreateStatus = ()=>{

    }
    console.log('modal opened :',isModalOpened);
    
    const [formFilled,setFormFilled] = useState<boolean>(false)
    return(
        <CustomModal isDismissable={true} modalToggle={isModalOpened}>
            <ModalTitle handleModalToggle={handleModalToggle} isDismissable={true} title="Create Status" />
            <ModalBody >
            <Button color="primary" className="mt-3 w-full bg-blue-700 disabled:bg-common-blue disabled:cursor-not-allowed" 
              disabled={formFilled} onClick={handleCreateStatus}>
                <p className="text-base font-medium ">Create Status</p>
              </Button>
            </ModalBody>
        </CustomModal>
    )
}