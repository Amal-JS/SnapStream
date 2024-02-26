import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { ReactNode, } from "react";



interface ModalProps {
    modalToggle : boolean ,
    isDismissable : boolean,
    children : ReactNode,
    
    }


export const CustomModal : React.FC<ModalProps>= ({modalToggle,children,isDismissable}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  


  return (
    <>
      
      <Modal isOpen={modalToggle} onOpenChange={onOpenChange} isDismissable={isDismissable} hideCloseButton={true} className="" placement={'center'}>
        <ModalContent>
   
              {children}
  
        </ModalContent>
      </Modal>
    </>
  );
}








