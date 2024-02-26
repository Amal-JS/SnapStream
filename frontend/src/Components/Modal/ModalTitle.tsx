
import { IoClose } from "react-icons/io5";

interface ModalTitleProps {
    title ?: string,
    handleModalToggle : ()=>  void,
    isDismissable:boolean
}

export const ModalTitle  : React.FC<ModalTitleProps> = ({  title , handleModalToggle , isDismissable}) => {
    return (
        <div className="flex pl-5 pr-1 items-center">
        <h2 className=" text-xl text-black font-medium md:pl-10 w-11/12 text-center p-2">{title}</h2>
        { isDismissable && <IoClose className="text-3xl text-black hover:cursor-pointer " onClick={handleModalToggle}/>
        }
        
        </div>
    );
  };
  
