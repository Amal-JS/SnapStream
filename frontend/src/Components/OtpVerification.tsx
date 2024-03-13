import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useButtonState } from "../hooks/useButtonState";
import { generateOtp, sendOtp } from "../utils/sendOtp";
import { authRoot, rootUrlPath } from "../utils/url";
import axios from "axios";
import { customErrorToast, customSuccessToast } from "../Toast";

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
  otp:number,
  process:string,
  phoneOrEmail:string
}

interface OtpinLocal {
  otp:number,
  process?:string,
  phoneOrEmail?:string
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

  //timer 
  const [timeRunning,setTimeRunning] = useState<boolean>(true)
  const [remainingTime,setRemainingTime] = useState<number>(120)
  const [otpInLocalStorage,setOtpInLocalStorage] = useState<OtpinLocal>({
                                                                          otp:0,
                                                                          phoneOrEmail:'',
                                                                          process:''
                                                                        })

  //button disable enable hook
 const {formFilled,setFormFilled} = useButtonState()
 // Check if all input fields are filled
 useEffect(()=>{
     const filled = Object.values(otp).every(value => value.trim() !== '');
     if (filled){
      setFormFilled(false)
     }else{
      setFormFilled(true)
     }
  }
 ,[otp])


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
  const otpDataInLocalStorage : string | null = localStorage.getItem('otp');
  const parsedOtp :LocalOtpData | null = otpDataInLocalStorage ? JSON.parse(otpDataInLocalStorage) : null;
  
  //if no otp exist then user doesn't need to access this page
  if( !parsedOtp){
      navigate(-1)
  }

  //set the otp in local storage to a state
  if (parsedOtp && parsedOtp.otp){
    setOtpInLocalStorage(parsedOtp)
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
          disabled={!timeRunning}
        ></input>
      );
    });
  };

 // Format seconds into minutes and seconds
 const formatTime = (seconds:number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

//timer running function
useEffect(() => {
  let intervalId : NodeJS.Timeout | undefined;

  // Start the timer when timerRunning is true
  if (timeRunning) {
    intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          setTimeRunning(false); // Stop the timer when remainingTime reaches 0
          clearInterval(intervalId);
          return 0; // Set remainingTime to 0 when it reaches 0
        } else {
          return prevTime - 1; // Decrement remaining time
        }
      });
    }, 1000);
  }

  // Clear interval when component unmounts or timerRunning becomes false
  return () => clearInterval(intervalId);
}, [timeRunning]);

//resend function
const handleResendOtp = () =>{

  const otpInLocalStorage = localStorage.getItem('otp') ? localStorage.getItem('otp') : null;
    if (otpInLocalStorage){
      
    const otpData = JSON.parse(otpInLocalStorage)
    
    // if (otpData.phoneOrEmail && otpData.process == 'newAccountCreation'){
      
        const newOtp = generateOtp()
        //may need to update the local storage of otp 
        const newOtpValueInLocalStorage = {...otpData,['otp']:newOtp}

        //update the local state otp
        setOtpInLocalStorage(prev => ({
          ...prev,
          'otp':newOtp
        }))
        sendOtp(newOtp,otpData.phoneOrEmail)

        setRemainingTime(120); // Reset timer to initial value
        // will set the timer to run
        setTimeRunning(true)
    // }else{
    //   //user profile password update , process userProfilePasswordUpdate

    // }
  }

  
}
console.log('local otp :',otpInLocalStorage.otp)
const handleOtpMatch = ()=> {

    const otpValue = Number(Object.values(otp).join(''))
    if (otpInLocalStorage.otp == otpValue){
      
      
      const createUserAccountInDb = async ()=>{

        const userDataExistInLocalStorage = localStorage.getItem('newUserData')
        if (userDataExistInLocalStorage){
          console.log(otpInLocalStorage.otp,' ',otpValue)
          const response = await axios.post(rootUrlPath+authRoot+'createNewUserAccount/',
          JSON.parse(userDataExistInLocalStorage)
          )
          if(response.data.userAccountCreatedSuccessfully){
              customSuccessToast('User account created Successfully.Login please.')
              
              setTimeout(()=>{
                navigate('/login/')
              },1500)
          }else{
            customErrorToast('Some error occured please try again.')
            navigate('/signup/')
          }
          
          localStorage.removeItem('newUserData')
        }
      }
      console.log(otpInLocalStorage);
        
      if(otpInLocalStorage && otpInLocalStorage.process == 'newAccountCreation'){
        console.log('create account call');
        
        //all verification is done and account can be created
        createUserAccountInDb()
      }
      else if (otpInLocalStorage.process == 'passwordUpdate'){   

        console.log('password update block in otp verification');
        
            //password update redirect
            const newOtp = generateOtp()
            localStorage.setItem('verify',JSON.stringify({'verify':newOtp,'phoneOrEmail':otpInLocalStorage.phoneOrEmail}))
            navigate(`/password/update/${newOtp}`)
      }
      //clear otp data from local
      localStorage.removeItem('otp')
      setTimeRunning(false)
      
    }else{
      // set time running false
      setOtp({
        firstDigit: "",
        secondDigit: "",
        thirdDigit: "",
        fourthDigit: "",
      })
      setTimeRunning(false)
    }
    
    

}
  return (
    <>
    
      <div className="h-screen">
        <div className="p-4 my-4 border-2 dark:border-b-4 border-secondary-border dark:border-primary-border">
          <h2 className="pacifico-regular text-center  text-4xl md:text-4xl  pr-2 md:text-start md:pl-32">
            <Link to={"/login"}>SnapStream</Link>
          </h2>
        </div>

        <div className="bg-secondary dark:bg-primary   p-3 flex justify-center  items-center ">
          <form className=" p-1 ">
            <div className=" border-2 dark:border-4 border-secondary-border dark:border-primary-border   p-6  text-center w-full md:w-96">
              <h2 className="my-6 dark:text-secondary text-primary text-xl font-medium md:text-2xl">
                Enter Otp
              </h2>

              <div className="flex w-full justify-evenly">
                {inputElementsRender()}
              </div>

              <div>
              {/* {!timeRunning ?
               
                ((!timeRunning &&  Number(Object.values(otp).join('')) != otpInLocalStorage &&
                Object.values(otp).every(value => value === '')) ?
                <p className="text-base font-medium text-red-600 mt-3">Otp Doesn't match</p>      
                : remainingTime == 0 ? <p className="text-base font-medium text-red-600 mt-3">Otp Expired</p>
                : <p className="text-base font-medium text-red-600 mt-3">Otp Expired</p>
                
                )
               
                :
                <p className="my-5 p-2 text-2xl font-medium">{formatTime(remainingTime)}</p>
                } */}
{!timeRunning ?
              remainingTime == 0 ?  <p className="text-base font-medium text-red-600 mt-3">Otp Expired</p> :

              Number(Object.values(otp).join('')) !== otpInLocalStorage.otp ?
              <p className="text-base font-medium text-red-600 mt-3">Otp Doesn't match</p> 
              :
              <p className="text-base font-medium text-green-400-600 mt-3">Otp Correct</p> 
               :
               <p className="my-5 p-2 text-2xl font-medium">{formatTime(remainingTime)}</p>
               }
                
                {!timeRunning && 
                <Button className="bg-btn-enabled mt-3 w-full " onClick={handleResendOtp}>
                  <p className="text-base font-medium text-white">Resend otp</p>
                </Button>}

              </div>
              <Button className="mt-3 w-full bg-btn-enabled disabled:bg-btn-disabled disabled:cursor-not-allowed"  disabled={formFilled} onClick={handleOtpMatch}>
                <p className="text-base font-medium text-white" >Check otp</p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
