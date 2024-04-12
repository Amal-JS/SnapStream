import {Modal, ModalContent, useDisclosure} from "@nextui-org/react";
import { ReactNode, } from "react";



interface ModalProps {
    modalToggle : boolean ,
    isDismissable : boolean,
    children : ReactNode,
    size?:string 
    }


export const CustomModal : React.FC<ModalProps>= ({modalToggle,children,isDismissable = true,size = 'md'}) => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();



  return (
    <>
      
      <Modal isOpen={modalToggle} onOpenChange={onOpenChange} isDismissable={isDismissable} 
      size={size as "md" | "xs" | "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full"}
      hideCloseButton={true} 
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







