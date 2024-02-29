import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface inputRefType {
  [key: string]: React.RefObject<HTMLInputElement>;
}
interface OtpType {
  firstDigit: string;
  secondDigit: string;
  thirdDigit: string;
  fourthDigit: string;
}

interface LocalOtpData {
  otp:string,
  process:string
}

export const OtpVerification = () => {
  const [otp, setOtp] = useState<OtpType>({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: "",
    fourthDigit: "",
  });

  const inputRef = useRef<inputRefType>({
    "0": useRef<HTMLInputElement>(null),
    "1": useRef<HTMLInputElement>(null),
    "2": useRef<HTMLInputElement>(null),
    "3": useRef<HTMLInputElement>(null),
  });

  const navigate = useNavigate()

  //event type specify

  useEffect(()=> {

//check field exist then focus ts will raise error.   
const firstInput = inputRef.current[0];
if (firstInput && firstInput.current){
  firstInput.current.focus()
  firstInput.current.addEventListener('paste',pasteText);
}

handleOtp();

 return () =>{
    //write clean up function again check for the value to avoid errors.
    if (firstInput.current){
      firstInput.current.removeEventListener('paste',pasteText)
    }} 
  },[])

//otp page is only accessible when there is otp in storage
const handleOtp = ()=>{
  
//check if user is in the page as a sign up process or the password reset for the account

  //get the otp from local storage and parse it
  const otp : string | null = localStorage.getItem('otp');
  const parsedOtp :LocalOtpData | null = otp ? JSON.parse(otp) : null;
  
  //if no otp exist then user doesn't need to access this page
  if( !parsedOtp){
      navigate(-1)
  }
const newUserData: string | null = localStorage.getItem('newUserData');
if(parsedOtp?.process == 'newAccountCreation'){
  console.log('user account creation');
}else if(parsedOtp?.process == 'userAccountPasswordUpdate')
{
  console.log('user password update');
  
}

}



  
//   const pasteText = (event : ClipboardEvent) => {
//       const pastedText = event.clipboardData?.getData('text')
//       const fieldValues = {
//         firstDigit: "",
//         secondDigit: "",
//         thirdDigit: "",
//         fourthDigit: "",
//       }
//       Object.keys(otp).forEach((key,index : number)=>{
//           if (! /[a-z]/gi.test(pasteText[index])){
//             fieldValues[key] = pastedText[index];
//           }  
//       })
//       console.log(fieldValues,otp)
//       if (! /[a-z]/gi.test(pasteText)){
//         setOtp(fieldValues)
//         const lastInputRef = inputRef.current[3];
//         if (lastInputRef && lastInputRef.current){
//           lastInputRef.current.focus();
//         }
//       }
      
// }


const pasteText = (event: ClipboardEvent) => {
  const pastedText = event.clipboardData?.getData('text');
  if (pastedText) {
    const fieldValues: Partial<OtpType> = {}; // Use Partial to allow incomplete fieldValues

    Object.keys(otp).forEach((key, index) => {
      if (!/[a-z]/gi.test(pastedText[index])) {
        fieldValues[key as keyof OtpType] = pastedText[index]; // Use assertion to assure TypeScript about the key type
      }
    });

    if (!/[a-z]/gi.test(pastedText)) {
      setOtp(prev => ({
        ...prev,
        ...fieldValues, // Merge fieldValues with existing otp
      }));

      const lastInputRef = inputRef.current[3];
      if (lastInputRef && lastInputRef.current) {
        lastInputRef.current.focus();
      }
    }
  }
};


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    //only allow numbers to be in the input field
    if (/[a-z]/gi.test(value)) return ;
    
    setOtp(
      (prev) =>
        ({
          ...prev,
          [name]: value.slice(-1), // use slice(-1) so that the user can write any number there and the
          //last one will be used . improves user experience and removes
          //maxlength attribute in input element
        } as OtpType)
    ); //specify it is of otptype else will raise error


    // first make sure there is next input element then try to focus , else ts will raise error
    //chance of null
    const nextInputRef = inputRef.current[index + 1];
    if (nextInputRef && nextInputRef.current && value !== '') {
      
      nextInputRef.current.focus();
    }
  };

  const handleBackspace = (event : React.KeyboardEvent<HTMLInputElement> ,index : number)=>{
        if (event.key == 'Backspace'){
          const previousInputRef = inputRef.current[index - 1]
          if ( previousInputRef && previousInputRef.current){
            previousInputRef.current.focus()
          }
          
        }
  }
  const inputElementsRender = () => {
    return Object.keys(otp).map((element, index) => {
      // to get the value of the corresponding key we have to specify that the key is a type or otp type
      // here and when otp state updates.
      //set input ref with current element index
      return (
        <input
          key={index}
          ref={inputRef.current[index]}
          className="w-1/6 mt-2 text-2xl text-black"
          value={otp[element as keyof OtpType]}
          type="text"
          name={element}
          onChange={(event) => handleChange(event, index)}
          onKeyUp={(event)=>handleBackspace(event,index)}
        ></input>
      );
    });
  };

 

  return (
    <>
    
      <div className="h-screen">
        <div className="p-4 my-4 border-b-2 border-b-gray-200">
          <h2 className="pacifico-regular text-center  text-4xl md:text-4xl  pr-2 md:text-start md:pl-32">
            <Link to={"/login"}>SnapStream</Link>
          </h2>
        </div>

        <div className="bg-white  p-3 flex justify-center  items-center ">
          <form className=" p-1 ">
            <div className="bg-white border-2 border-gray-300 p-6  text-center w-full md:w-96">
              <h2 className="my-6 text-black text-xl font-medium md:text-2xl">
                Enter Otp
              </h2>

              <div className="flex w-full justify-evenly">
                {inputElementsRender()}
              </div>

              <div>
                <p className="my-5 p-2 text-2xl font-medium"> 01:00</p>
              </div>
              <Button color="primary" className="mt-3 w-full bg-blue-500">
                <p className="text-base font-medium ">Check otp</p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
