import { Button } from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import "../App.css";
import { useState } from "react";
import { PasswordInput } from "./Form/PasswordInput";
import { FaUser } from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";
import { TextInput } from "./Form/TextInput";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import { customErrorToast, customSuccessToast } from "../Toast";
import axios from "axios";
import { authRoot, rootUrlPath } from "../utils/url";
import { useNavigate } from "react-router-dom";
import { generateOtp, sendOtp } from "../utils/sendOtp";
import { useButtonState } from "../hooks/useButtonState";

interface UserData {
  userName: string;
  fullName: string;
  phoneOrEmail: string;
  password: string;
}

interface UserDataError {
  userName: string;
  fullName: string;
  phoneOrEmail: string;
  password: string;
}

interface UserDataEachFieldCharCount {
  userName: number;
  fullName: number;
  phoneOrEmail: number;
  password: number;
}

export const Signup = () => {
  const navigate = useNavigate()

  //state to store user data
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    fullName: "",
    phoneOrEmail: "",
    password: "",
  });

  const [userDataError, setUserDataError] = useState<UserDataError>({
    userName: "",
    fullName: "",
    phoneOrEmail: "",
    password: "",
  });

  const [fieldsCharCount,setFieldCharcount] = useState<UserDataEachFieldCharCount>({
    userName: 0,
    fullName: 0,
    phoneOrEmail: 0,
    password: 0,
  })
  //button disable enable hook
  const {formFilled, setFormFilled} = useButtonState()

 
  // function to update the user Data Value Errors
  const updateUserDataError = (field: string, value: string) => {
    setUserDataError((prev) => ({
      ...prev,
      [field]: " ",
    }));
    setUserDataError((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const CheckMininumLengthOfValue = (value: string): boolean => {
    return value.length > 5 ? true : false;
  };

  const checkFieldValueAlreadyUsed = async (field: string, value: string) => {
    const response = await axios.get(
      rootUrlPath +
        authRoot +
        `check_value_exist/?field=${field}&value=${value}`
    );
    return response.data.valueExist;
  };

  const validateUsername  = async (value: string, field: string) :Promise<boolean> => {
    if (!CheckMininumLengthOfValue(value)) {
      updateUserDataError(field, "Mininum length of characters is 6");
      return false;
    }
    
    if( await checkFieldValueAlreadyUsed("username", value)){
      updateUserDataError(field, "Username already taken.");
      return false;
     }
      return true;
  };

  const validatePhoneOrEmail = async (
    value: string,
    lengthOfValue: number,
    field: string
  ): Promise<boolean> => {
    if (lengthOfValue < 9) {
      updateUserDataError(field, "Provide a valid value");
      return false;
    }

    if (lengthOfValue === 10) {
      //check if value only contains number
      if (isNaN(Number(value))) {
        updateUserDataError(field, "Provide a valid phone");
        return false;
      } else {
        //check value already used
        //email exist
     if(await checkFieldValueAlreadyUsed("phone", value)){
      updateUserDataError(field, "phone number already taken.");
      return false;
     }
      return true;
      }
    } else {
      //checks valid email
      if (!value.match(/^\S+@\S+\.\S+$/)) {
        updateUserDataError(field, "Provide a valid email");
        return false;
      }
     //email exist
     if(await checkFieldValueAlreadyUsed("email", value)){
      updateUserDataError(field, "Email already taken.");
      return false;
     }
      return true;
    }
  };

  const validatePassword = (value: string, field: string): boolean => {
    if (!CheckMininumLengthOfValue(value)) {
      updateUserDataError(field, "Mininum length of characters is 6");
      return false;
    }
    return true;
  };

  const validateFullName = (value: string, field: string): boolean => {
    if (!CheckMininumLengthOfValue(value)) {
      updateUserDataError(field, "Mininum length of characters is 6");
      return false;
    }
    return true;
  };

  //function to update the user input data
  const handleUserData = async (evt: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    let valuePassedValidation = false;
 
    if (name === "userName") {
      valuePassedValidation = await validateUsername(value, name);
      
      
    }

    if (name === "phoneOrEmail") {
      valuePassedValidation = await validatePhoneOrEmail(value, value.length, name);
      
    }
    if (name === "password") {
      valuePassedValidation = validatePassword(value, name);
    }
    if (name === "fullName") {
      valuePassedValidation = validateFullName(value, name);
    }

    //some value is not accepted so returning from the function
    if (!valuePassedValidation) {
      console.log('not returning');
      
      return;
    }
    console.log('state updating');
    //update user data if pass all validations
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    
 
  };

  const handleFormFilledButtonState = (event:React.ChangeEvent<HTMLInputElement>)=>{
     //if all values in form filled then enable submit button
   
     const {name,value} = event.target;
        //update the char count in each field for disable enable signup button
    setFieldCharcount((prev) => ( {
      ...prev,
      [name]:value.length,
    }))
const filled = Object.values(fieldsCharCount).every((value) => value >1)
     if (filled){
      setFormFilled(false)
     }else{
      setFormFilled(true)
     }
    }


  

  //logic to handle subitting form
  const handleSubmit = () => {

    //check if any error exist on any field then  return from here after a toast too
    if (Object.values(userDataError).some((value) => value !== "")) {
      customErrorToast("Give proper values.");
      // customSuccessToast('Give proper values.')
      return;
    }
    // this function saves the userData to local storage and generates a 4 digit otp saves
    // that otp in the local storage also.
    //then it will send the otp and  emailOrphone value along with it
    const handleUserSignUp = async () => {
      const otp = generateOtp();

      const newUserData = {
        ...userData,
      };

      localStorage.setItem("newUserData", JSON.stringify(newUserData));
      localStorage.setItem(
        "otp",
        JSON.stringify({ otp: otp, process: "newAccountCreation" ,phoneOrEmail:userData.phoneOrEmail})
      );

      
     //send otp 
     console.log(userData)
      const otpSendingFailed = await sendOtp(otp,userData.phoneOrEmail)
         if (otpSendingFailed){
          
          customErrorToast('Otp sending failed')
            localStorage.removeItem('otp')
            localStorage.removeItem('newUserData')
         }else{
          
          customSuccessToast(`Otp has successfully sent to ${userData.phoneOrEmail}`)
          //just wait for one second then navigate to verify otp
          setTimeout(()=>{
            navigate("/otpverify/");
          },1000)
         }
    };

    handleUserSignUp();
  };




  return (
    <>
      <div className="h-screen">
        <div className="bg-white  p-3 flex justify-center items-center">
          <form className=" p-1 ">
            <div className="bg-white border-2 border-gray-300 p-6  text-center w-full md:w-96">
              <h2 className="pacifico-regular  text-4xl md:text-4xl mt-3 pr-2">
                SnapStream
              </h2>
              <h2 className="text-gray-400 mt-3 text-base">
                Sign up to see photos and videos from your friends.
              </h2>

              <div className="flex justify-center p-2 items-center mt-3 cursor-pointer min-w-400">
                <Button color="primary" className="mt-3 w-full bg-blue-500">
                  <FaGoogle style={{ width: 20, height: 20 }} />
                  <p className="ml-2 text-base font-medium ">
                    Log in with Google
                  </p>
                </Button>
              </div>

              <div className="flex justify-center mt-6 min-w-400">
                <div className="w-2/4 border-b-gray-300 border-2 border-t-0 border-l-0 border-r-0 px-2"></div>
                <p>or</p>
                <div className="w-2/4  border-b-gray-300 border-2 border-t-0 border-l-0 border-r-0 px-2"></div>
              </div>

              <TextInput
                handleChange={handleFormFilledButtonState}
                name="userName"
                error={userDataError["userName"]}
                handleBlur={handleUserData}
                placeholder="Username"
                updateUserDataError={updateUserDataError}
                Icon={FaUser} //importing the icons and passing to component
              />
              <TextInput
                handleChange={handleFormFilledButtonState}
                name="phoneOrEmail"
                error={userDataError["phoneOrEmail"]}
                handleBlur={handleUserData}
                placeholder="Mobile Number or Email"
                Icon={FaMobileScreenButton}
                updateUserDataError={updateUserDataError}
              />

              <TextInput
                handleChange={handleFormFilledButtonState}
                name="fullName"
                error={userDataError["fullName"]}
                handleBlur={handleUserData}
                placeholder="Full Name"
                Icon={PiIdentificationBadgeFill}
                updateUserDataError={updateUserDataError}
              />
              <PasswordInput
                handleChange={handleFormFilledButtonState}
                name={"password"}
                error={userDataError["password"]}
                handleBlur={handleUserData}
                placeholder="Password"
                updateUserDataError={updateUserDataError}
              />

              <Button
                color="primary"
                className="mt-3 w-full bg-blue-500 disabled:bg-blue-400"
                disabled={formFilled}
                onClick={handleSubmit}
              >
                <p className="text-base font-medium ">Sign up</p>
              </Button>
            </div>

            <div className="border-2 border-gray-300 p-5 text-center  bg-white h-full w-full mt-3 flex justify-center">
              <div className="flex">
                <p>Have an account?</p>
                <p className="cursor-pointer text-blue-500 font-medium text-base pl-1">
                  Log in
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
