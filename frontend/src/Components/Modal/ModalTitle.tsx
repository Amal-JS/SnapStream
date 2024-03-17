
import { IoClose } from "react-icons/io5";

interface ModalTitleProps {
    title ?: string,
    handleModalToggle : ()=>  void,
    isDismissable:boolean
}

export const ModalTitle  : React.FC<ModalTitleProps> = ({  title , handleModalToggle , isDismissable}) => {
    return (
        <div className="flex pl-5 pr-1 items-center">
        <h2 className=" text-xl bg-secondary text-primary dark:bg-primary dark:text-secondary font-medium md:pl-10 w-11/12 text-center p-2">{title}</h2>
        { isDismissable && <IoClose className="text-3xl bg-secondary text-primary dark:bg-primary dark:text-secondary hover:cursor-pointer " onClick={handleModalToggle}/>
        }
        
        </div>
    );
  };
  
