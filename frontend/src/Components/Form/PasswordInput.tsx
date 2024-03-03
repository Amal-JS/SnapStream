import { useEffect, useState } from "react";
import { AiFillEyeInvisible  , AiFillEye} from "react-icons/ai";

interface PasswordInputProps  {
    name:string,
    error:string,
    handleBlur?:(event:React.FocusEvent<HTMLInputElement>)=> void,
    handleChange?:(event:React.ChangeEvent<HTMLInputElement>)=> void,
    placeholder:string,
    updateUserDataError?:(field:string,value:string)=>void
}
export const PasswordInput :React.FC<PasswordInputProps> = ({name,error,handleBlur,handleChange,placeholder,updateUserDataError})=> {

    const [inputFocused,setInputFocused] = useState(false)

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const [inputError,setInputError] = useState('')
    const handleFocus = ()=>{
        setInputFocused(true);
        updateUserDataError && updateUserDataError(name,'')
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
                    handleBlur && handleBlur(event)
                }}
                placeholder={placeholder}
                onChange={(event)=>{handleChange && handleChange(event)}}
                />

             
               

                {isVisible ? (
                    <AiFillEyeInvisible className={`text-2xl  hover:cursor-pointer  absolute right-6  top-4  ${inputFocused ? 'text-blue-600 ' : inputError ?  'text-red-500' : 'text-default-400'}`}  onClick={toggleVisibility}/>
                  ) : (
                    <AiFillEye className={`text-2xl  hover:cursor-pointer  absolute right-6  top-4   ${inputFocused ? 'text-blue-600 ' : inputError ?  'text-red-500' : 'text-default-400'}`}  onClick={toggleVisibility}/>
                  )}
              </div>
              
              { inputError && <p className="text-red-600  text-sm sm:text-base">{inputError}</p>}
              </div>
    )
}