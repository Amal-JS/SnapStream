import { useState } from "react";
import { AiFillEyeInvisible  , AiFillEye} from "react-icons/ai";

interface PasswordInputProps  {
    name:string,
    error:string,
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=> void
}
export const PasswordInput :React.FC<PasswordInputProps> = ({name,error,handleChange})=> {

    const [inputFocused,setInputFocused] = useState(false)

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    return (
        <div>
              <div className="p-2  relative ">
                <input name={name} 
                type={isVisible ? 'text' : 'password'} 
                className={`w-full border-1 border-gray-400 rounded-xl ${error && 'border-[3px] border-red-500'}`}  
                onChange={handleChange}
                onFocus={()=>setInputFocused(true)}
                />

               

                {isVisible ? (
                    <AiFillEyeInvisible className={`text-2xl text-default-400 hover:cursor-pointer  absolute right-6  top-4  ${inputFocused ? 'text-blue-600 ' : error &&  'text-red-500'}`}  onClick={toggleVisibility}/>
                  ) : (
                    <AiFillEye className={`text-2xl text-default-400 hover:cursor-pointer  absolute right-6  top-4  ${inputFocused ? 'text-blue-600 ' : error &&  'text-red-500'}`}  onClick={toggleVisibility}/>
                  )}
              </div>
              { error && <p className="text-red-600  ">{error}</p>}
              </div>
    )
}