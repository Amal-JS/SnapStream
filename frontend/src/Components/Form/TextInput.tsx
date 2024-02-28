import { useState } from "react";
import { FaRegUser } from "react-icons/fa";

interface PasswordInputProps  {
    name:string,
    error:string,
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=> void
}
export const TextInput :React.FC<PasswordInputProps> = ({name,error,handleChange})=> {

    return (
        <div>
              <div className="p-2  relative ">
                <input name={name} type={'text'} className={`w-full border-1 border-gray-400 rounded-xl ${error && 'border-[3px] border-red-500'}`}  onChange={handleChange}/>

                <FaRegUser className={`text-2xl text-default-400 hover:cursor-pointer  absolute right-6  top-4  ${error &&  'text-red-500'}`}  />
               
              </div>
              { error && <p className="text-red-600  ">{error}</p>}
              </div>
    )
}