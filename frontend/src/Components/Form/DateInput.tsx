


import { useEffect, useState } from "react";


interface PasswordInputProps  {
    name:string,
    error:string,
    handleBlur?:(event:React.FocusEvent<HTMLInputElement>)=> void , //when passing event handling
                                                                    // function need to pass the event
                
    handleChange?:(event:React.ChangeEvent<HTMLInputElement>)=> void,                                                //also 
    placeholder:string,
                                       //Icon type to pass as props,
    updateUserDataError?:(field:string,value:string)=>void 
}


export const DateInput :React.FC<PasswordInputProps> = ({name,error,handleBlur,handleChange,placeholder,updateUserDataError})=> {

    //when input element is focused then the icon next to it also neededed
    //be focused and the error field needs to be set to empty
    const [inputFocused,setInputFocused] = useState(false)
    //state to manage the input error state
    const [inputError,setInputError] = useState('')


    //focus function handles the emptying of state
    const handleFocus = ()=>{
        setInputFocused(true);
        updateUserDataError && updateUserDataError(name,'')
    }

    //whenever the error change the value or input error is updated
    useEffect(()=>{

            setInputError(error)
    },[error])

    return (
        <div>
              <div className="p-2  relative ">
                <input name={name} 
                type='date'
                 className={`w-full border-1
                  border-secondary-border dark:border-primary-border rounded-xl text-primary 
                 dark:text-secondary dark:bg-primary
                 ${  inputError && 'border-[3px] border-red-500'}`} 
                //   onChange={}
                  onFocus={handleFocus}
                  onBlur={(event)=>{
                    setInputFocused(false)
                    { handleBlur && handleBlur(event)}
                  }}
                  placeholder={placeholder}
                  onChange={(event)=>{handleChange && handleChange(event)}}
                  
                  />

              </div>

              { inputError && <p className="text-red-600  text-sm sm:text-base">{error}</p>}
              </div>
    )
}