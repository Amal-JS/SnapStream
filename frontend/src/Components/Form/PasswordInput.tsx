import { useEffect, useState } from "react";
import { AiFillEyeInvisible  , AiFillEye} from "react-icons/ai";

interface PasswordInputProps  {
    name:string,
    error:string,
    handleChange:(event:React.FocusEvent<HTMLInputElement>)=> void,
    placeholder:string,
    updateUserDataError:(field:string,value:string)=>void
}
export const PasswordInput :React.FC<PasswordInputProps> = ({name,error,handleChange,placeholder,updateUserDataError})=> {

    const [inputFocused,setInputFocused] = useState(false)

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [inputError,setInputError] = useState('')
    const handleFocus = ()=>{
        setInputFocused(true);
        updateUserDataError(name,'')
    }

    useEffect(()=>{setInputError(error)},[error])
    return (
        <div>
              <div className="p-2  relative ">
                <input name={name} 
                type={isVisible ? 'text' : 'password'} 
                className={`w-full border-1 border-gray-400 rounded-xl ${inputError && 'border-[3px] border-red-500'}`}  
                // onChange={handleChange}
                onFocus={handleFocus}
                onBlur={(event)=>{
                    setInputFocused(false)
                    handleChange(event)
                }}
                placeholder={placeholder}
                />

               

                {isVisible ? (
                    <AiFillEyeInvisible className={`text-2xl text-default-400 hover:cursor-pointer  absolute right-6  top-4  ${inputFocused ? 'text-blue-600 ' : inputError &&  'text-red-500'}`}  onClick={toggleVisibility}/>
                  ) : (
                    <AiFillEye className={`text-2xl text-default-400 hover:cursor-pointer  absolute right-6  top-4  ${inputFocused ? 'text-blue-600 ' : inputError &&  'text-red-500'}`}  onClick={toggleVisibility}/>
                  )}
              </div>
              { inputError && <p className="text-red-600  text-sm sm:text-base">{inputError}</p>}
              </div>
    )
}