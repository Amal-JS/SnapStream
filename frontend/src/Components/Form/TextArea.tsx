import { useEffect, useState } from "react"

interface TextAreaProps {
    name:string,
    placeholder:string,
    error:string,
    handleBlur?:(event:React.FocusEvent<HTMLTextAreaElement>)=> void , //when passing event handling
                                                                    // function need to pass the event
                
    handleChange?:(event:React.ChangeEvent<HTMLTextAreaElement>)=> void,                                         //Icon type to pass as props,
    updateUserDataError?:(field:string,value:string)=>void 
}
export const TextArea : React.FC<TextAreaProps> = ({name,error,placeholder,updateUserDataError,handleBlur,handleChange})=>{
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
        <>
        <textarea id="message" rows={4} name={name} 
       
        placeholder={placeholder}
        className={`w-full border-1 block p-2.5
                  border-secondary-border dark:border-primary-border rounded-xl text-primary 
                 dark:text-secondary dark:bg-primary
                 ${  inputError && 'border-[3px] border-red-500'}`} 
                //   onChange={}
                  onFocus={handleFocus}
                  onBlur={(event)=>{
                    setInputFocused(false)
                    { handleBlur && handleBlur(event)}
                  }}
                  onChange={(event)=>{handleChange && handleChange(event)}}
        ></textarea>
        </>
    )
}