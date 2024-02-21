import { IoIosCloseCircle } from "react-icons/io";

interface ModalTitleProps {
    title ?: string,
    handleModalToggle : ()=>  void,
}

export const ModalTitle  : React.FC<ModalTitleProps> = ({  title , handleModalToggle}) => {
    return (
        <div className="flex pl-5 pr-1 justify-between">
        <h2 className=" text-xl font-medium md:pl-10 ">{title}</h2>
        <IoIosCloseCircle className="text-3xl text-red-700 hover:cursor-pointer" onClick={handleModalToggle}/>
        </div>
    );
  };
  
