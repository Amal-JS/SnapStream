import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { ReactNode, } from "react";



interface ModalProps {
    modalToggle : boolean ,
    isDismissable : boolean,
    children : ReactNode,
    
    }


export const CustomModal : React.FC<ModalProps>= ({modalToggle,children,isDismissable = true}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  console.log('modal page',isDismissable)


  return (
    <>
      
      <Modal isOpen={modalToggle} onOpenChange={onOpenChange} isDismissable={isDismissable} hideCloseButton={true} 
      className="bg-secondary dark:bg-primary dark:border-2 dark:border-secondary-border " placement={'center'}>
        <ModalContent>
   
              {children}
  
        </ModalContent>
      </Modal>
    </>
  );
}


export interface modalContentType {
  isDismissable : boolean | true,
  modalToggle:boolean | false,
  title:string,
  handleModalToggle:() => void,
  content ?: JSX.Element

}







