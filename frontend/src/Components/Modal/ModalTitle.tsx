import { IoIosCloseCircle } from "react-icons/io";

interface ModalTitleProps {
    title ?: string,
    handleModalToggle : ()=>  void,
    isDismissable:boolean
}

export const ModalTitle  : React.FC<ModalTitleProps> = ({  title , handleModalToggle , isDismissable}) => {
    return (
        <div className="flex pl-5 pr-1 justify-between">
        <h2 className=" text-xl font-medium md:pl-10 ">{title}</h2>
        { isDismissable && <IoIosCloseCircle className="text-3xl text-red-700 hover:cursor-pointer" onClick={handleModalToggle}/>
        }
        
        </div>
    );
  };
  
