import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";



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




// export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement> > = ({ children }) => {
//     return (
//       <div className="modal-content-inner">
//         {children}
//       </div>
//     );
//   };




// export const ModalFooter : React.FC<React.HTMLAttributes<HTMLDivElement> >= ({ children }) => {
//     return (
//       <div className="modal-footer">
//         {children}
       
//       </div>
//     );
//   };
  