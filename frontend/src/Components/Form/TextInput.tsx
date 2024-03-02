

import { useEffect, useState } from "react";


interface PasswordInputProps  {
    type?:string,  //optional value either text or email
    name:string,
    error:string,
    handleBlur:(event:React.FocusEvent<HTMLInputElement>)=> void, //when passing event handling
                                                                    // function need to pass the event
                    
    handleChange:(event:React.ChangeEvent<HTMLInputElement>)=> void,                                                //also 
    placeholder:string,
    Icon:React.ElementType                                          //Icon type to pass as props,
    updateUserDataError:(field:string,value:string)=>void
}


export const TextInput :React.FC<PasswordInputProps> = ({type,name,error,handleBlur,handleChange,placeholder,Icon,updateUserDataError})=> {

    //when input element is focused then the icon next to it also neededed
    //be focused and the error field needs to be set to empty
    const [inputFocused,setInputFocused] = useState(false)
    //state to manage the input error state
    const [inputError,setInputError] = useState('')


    //focus function handles the emptying of state
    const handleFocus = ()=>{
        setInputFocused(true);
        updateUserDataError(name,'')
    }

    //whenever the error change the value or input error is updated
    useEffect(()=>{

            setInputError(error)
    },[error])

    return (
        <div>
              <div className="p-2  relative ">
                <input name={name} 
                type={type ? 'email' : 'text'}
                 className={`w-full border-1 border-gray-400 rounded-xl ${  inputError && 'border-[3px] border-red-500'}`} 
                //   onChange={}
                  onFocus={handleFocus}
                  onBlur={(event)=>{
                    setInputFocused(false)
                    handleBlur(event)
                  }}
                  placeholder={placeholder}
                  onChange={(event)=>{handleChange(event)}}
                  />

                <Icon className={`text-2xl text-default-400 pl-2 hover:cursor-pointer  absolute right-6  top-4  ${ inputFocused ? 'text-blue-600' : inputError &&  'text-red-500'}`}  />
               
              </div>
              { inputError && <p className="text-red-600  text-sm sm:text-base">{error}</p>}
              </div>
    )
}