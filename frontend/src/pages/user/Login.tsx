import { Image } from "@nextui-org/react";
import LoginGifLight from '../assets/login_sample_gif.gif';
import LoginGifDark from '../assets/logos/loginGifBlack.gif';
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import '../App.css';
import { TextInput } from "../../Components/Form/TextInput";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { PasswordInput } from "../../Components/Form/PasswordInput";
import { useButtonState } from "../../hooks/useButtonState";
import axios from "axios";
import { authRoot, rootUrlPath } from "../../utils/url";
import { customErrorToast, customSuccessToast } from "../../Toast";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import {  useAppSelector } from "../../hooks/redux";


interface LoginFormData {
  username:string,
  password:string
}
export const Login = () => {


  const [formData,setFormData] = useState<LoginFormData>({
                                                          username:'',
                                                          password:''
                                                        })

  const [error,setError] = useState<string>('')
  //Login button disable enable
  const {formFilled,setFormFilled} = useButtonState()
  const navigate = useNavigate()

  const themeDark = useAppSelector(state => state.user.darkTheme)

  //google login

  const login =  useGoogleLogin({
    onSuccess:token=>{
      
      console.log("onSuccess",token)
      const LoginUsingGoogleLogin = async ()=>{
        console.log(token);
        
        try {
        const response = await axios.post(rootUrlPath+authRoot+'googleLogin/',{'access_token':token.access_token})
              if(response.data.isUserLoggedSuccessfully){
                //set user state
                console.log(response.data.userData);
                
              }
              else {
                customErrorToast('Google login.Please try again.')
                customErrorToast('Service not responding.')
              }
        }
        catch{
          customErrorToast('Google login.Please try again.')
        }
      }
      LoginUsingGoogleLogin()
    },
    onError:error=>{
     
      console.log(error)
    }
  })

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) : void  =>  {
    //set error to ''
    setError('')
    
      const {name,value} = event.target;
      //update the state in login form
      setFormData(prev => ({
        ...prev,
        [name]:value
      }))
     

  }


  
useEffect(()=>{

  
  //login button disable condion check
  if(Object.values(formData).every(value => value.trim().length > 0)){
 
    
    setFormFilled(false)
  }else{
    setFormFilled(true)
  }
  
  },[formData])

const handleLogin = () =>{
  //set error to ''
  setError('')

  const LoginUser = async () =>{
    
    
  const response = await axios.post(rootUrlPath+authRoot+'LoginUser/',{'phoneOrEmailOrUsername':formData.username,'password':formData.password})
  // No user exist or invalid credentials
  if(!response.data.userExist){
      //setError
      setError(response.data.message)
  }
  else {

    customSuccessToast('Login Successfull.')
    customSuccessToast(response.data.message)
    //empty the form
    setFormData({
      username:'',
      password:''
    })
    console.log(response);
    navigate('/')

    
  }
}
LoginUser()
}


  return (
    <>
      <div className="flex   h-screen ">
        <div className="w-1/2 hidden md:flex bg-secondary dark:bg-primary  justify-center  items-center">
          <Image
            className="w-3/4 pl-12 object-contain"
            alt="NextUI hero Image"
            src={themeDark ?  LoginGifDark : LoginGifLight}
          />
        </div>


        <div className="bg-secondary dark:bg-primary h-full w-full md:w-1/2 p-3">
          <form className=" p-5  md:mt-12 ">

            <div className="bg-secondary border-2 border-secondary-border  dark:bg-primary dark:border-primary-border  p-6 w-full md:w-1/2  md:justify-start md:p-5  text-center lg:w-300">
            <h2 className='pacifico-regular text-3xl md:text-4xl mt-3 mb-8 text-primary dark:text-secondary '>SnapStream</h2>
              <TextInput 
              Icon={FaRegUser}
              name="username"
              error={""}
              handleChange={handleChange}
              placeholder="Username"
              />
              <PasswordInput
                handleChange={handleChange}
                name={"password"}
                error={""}
                placeholder="Password"
              />

              {error && <p className="text-red-600 text-sm md:text-base font-bold my-3 p-1"> {error}</p>}

              <Button color="primary" className="mt-3 w-full bg-blue-700 disabled:bg-common-blue disabled:cursor-not-allowed" 
              disabled={formFilled} onClick={handleLogin}>
                <p className="text-base font-medium ">Log in</p>
              </Button>

              <div className="flex justify-center mt-6">
                <div className="w-2/4 border-b-gray-300 border-2 border-t-0 border-l-0 border-r-0 px-2"></div>
                <p>or</p>
                <div className="w-2/4  border-b-gray-300 border-2 border-t-0 border-l-0 border-r-0 px-2"></div>
              </div>

              <div className="sm:flex-col md:flex-row flex justify-center p-2 items-center mt-8 cursor-pointer">
           
              <div className="sm:flex-col md:flex-row flex justify-center p-2 items-center mt-8 cursor-pointer">
      </div>
      <div className="flex" onClick={()=>login()}>
        <FcGoogle style={{ width: 30, height: 30 }} />
        <p className="ml-2 text-base font-medium text-red-500">
          Log in with Google
        </p>
   

      </div>

    </div>

              <div className="flex justify-center p-2 items-center mt-2 cursor-pointer mb-4">
                <p className="ml-2 text-base  text-primary dark:text-secondary hover:cursor-pointer" onClick={()=>navigate('/forgotpassword/')}>
                  Forgot password?{" "}
                </p>
              </div>
            </div>

            <div className="border-2 bg-secondary dark:bg-primary  border-secondary-border dark:border-primary-border p-5 text-center   h-full w-full md:w-1/2 mt-3 flex justify-center">
              <div className="block lg:flex">
                <p className="text-xs  md:text-sm">Don't have an account?</p>
                <p className="cursor-pointer text-blue-500 font-medium text-base pl-1" onClick={()=>navigate('/signup/')}>
                  SignUp
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
