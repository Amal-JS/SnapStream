
import { Input, Button } from "@nextui-org/react";
import { CiLock } from "react-icons/ci";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";
import { TextInput } from "../../Components/Form/TextInput";
import { FaRegUser } from "react-icons/fa6";
import { useButtonState } from "../../hooks/useButtonState";
import { useEffect, useState } from "react";
import axios from "axios";
import { authRoot, rootUrlPath } from "../../utils/url";
import { customSuccessToast } from "../../Toast";
import { generateOtp, sendOtp } from "../../utils/sendOtp";


export const ForgotPassword = () => {
  const {formFilled,setFormFilled} = useButtonState()
  const [formData,setFormData] = useState<string>('')
  const [error,setError] = useState<string>('')
  const navigate = useNavigate()

  useEffect(()=>{

    if(formData.length > 5){
      setFormFilled(false)
    }else{
      setFormFilled(true)
    }
  },[formData])


  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const {value} = event.target;
    setFormData(value);

    error && setError('')
  }

  const handleCheckUserExist = ()=>{
      const CheckUserExist = async ()=> {
          const response  = await axios.get(rootUrlPath+authRoot+`ForgotPassword/?usernameOrPhoneOrEmail=${formData}`)
          if (await response.data.userExist){
              customSuccessToast(response.data.message)
              const otp = generateOtp()
                //saving to local storage
                localStorage.setItem(
                  "otp",
                  JSON.stringify({ otp: otp, process: "passwordUpdate" ,phoneOrEmail:response.data.phoneOrEmail})
                );
              //send otp to user
              sendOtp(otp,response.data.phoneOrEmail)
              //redirect to otp page
              navigate('/otpverify/')
        

          }else{
            setError("No account found.Please try again.")
          }
        }
      CheckUserExist()
  }

  return (
    <>
      <div className="h-screen">
        <div className="p-4 my-4 border-b-2 bg-secondary border-secondary-border dark:bg-primary dark:border-primary-border ">
        <h2 className='pacifico-regular text-center  text-4xl md:text-4xl  pr-2 md:text-start md:pl-32'>SnapStream</h2>
        </div>

  <div className="bg-secondary dark:bg-primary p-3 flex justify-center items-center" >
          <form className=" p-1  bg-secondary dark:bg-primary " >
          
            <div className=" border-3 bg-secondary border-secondary-border dark:bg-primary dark:border-primary-border  p-6  text-center w-full md:w-96">
           <div className="flex justify-center bg-secondary dark:bg-primary">
           <CiLock className="text-primary dark:text-secondary text-8xl font-black text-center"/>
           </div>
            <h2 className="my-2 text-black text-xl font-medium">Trouble logging in?</h2>
            <h2 className="text-gray-400 mt-3 text-base mb-5">Enter your email, phone, or username and we'll send you a link to get back into your account.</h2>
           <TextInput 
           Icon={FaRegUser}
           error={''}
           name="usernameOrPhoneOrEmail"
           placeholder="Username , Phone or Email"
           handleChange={handleInputChange}
           
           />
              {error && <p className="text-sm md:text-base text-red-600 my-2">{error}</p> }

              <Button color="primary" className="mt-3 w-full bg-blue-700 disabled:bg-common-blue disabled:cursor-not-allowed"
              disabled={formFilled} onClick={handleCheckUserExist}>
                <p className="text-base font-medium ">Search Account</p>
              </Button>

            
              <div className="flex justify-center mt-6 min-w-400 mb-4">
                <div className="w-2/4  dark:border-secondary-border  border-primary-border border-2 border-t-0 border-l-0 border-r-0 px-2"></div>
                <p className="text-primary dark:text-secondary">or</p>
                <div className="w-2/4   dark:border-secondary-border  border-primary-border border-2 border-t-0 border-l-0 border-r-0 px-2 "></div>
              </div>

              <Link to='/signup' className="text-base text-primary dark:text-secondary font-medium hover:text-gray-500 dark:hover:text-gray-300">Create new account</Link>
              
            </div>

            <div className="border-2 p-5 text-center  bg-secondary border-secondary-border dark:bg-primary dark:border-primary-border h-full w-full flex justify-center">
              <div className="flex">
                <Link to='/' className="text-base text-primary dark:text-secondary font-medium hover:text-gray-500 dark:hover:text-gray-300">Back to Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
