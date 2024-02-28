
import { useEffect, useState } from "react";


interface PasswordInputProps  {
    type?:string,
    name:string,
    error:string,
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=> void,
    placeholder:string,
    Icon:React.ElementType
}
export const TextInput :React.FC<PasswordInputProps> = ({type,name,error,handleChange,placeholder,Icon})=> {

    const [inputFocused,setInputFocused] = useState(false)
    const [inputError,setInputError] = useState('')

    const handleFocus = ()=>{
        setInputFocused(true);
        setInputError('')
    }
    useEffect(()=>{
            setInputError(error)
    },[error])

    return (
        <div>
              <div className="p-2  relative ">
                <input name={name} 
                type={type ? 'email' : 'text'}
                 className={`w-full border-1 border-gray-400 rounded-xl ${  inputError && 'border-[3px] border-red-500'}`} 
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={()=>setInputFocused(false)}
                  placeholder={placeholder}
                  />

                <Icon className={`text-2xl text-default-400 hover:cursor-pointer  absolute right-6  top-4  ${ inputFocused ? 'text-blue-600' : inputError &&  'text-red-500'}`}  />
               
              </div>
              { inputError && <p className="text-red-600  ">{error}</p>}
              </div>
    )
}