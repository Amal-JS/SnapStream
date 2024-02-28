import { Button } from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import "../App.css";
import { useState } from "react";
import { PasswordInput } from "./Form/PasswordInput";
import { FaUser } from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";
import { TextInput } from "./Form/TextInput";
import { PiIdentificationBadgeFill } from "react-icons/pi";
import toast from "react-hot-toast";


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

export const Signup = () => {

  //state to store user data
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    fullName: "",
    phoneOrEmail: "",
    password: "",
  });

const [userDataError,setUserDataError] = useState<UserDataError>({
  userName: "",
  fullName: "",
  phoneOrEmail: "",
  password: "",
})
  

  // function to update the user Data Value Errors
  const updateUserDataError = (field:string,value:string)=>{

    setUserDataError(prev=>(
      {
        ...prev,
        [field]:' '
      }
    ))
    setUserDataError(prev=>(
      {
        ...prev,
        [field]:value
      }
    ))


  }


  

  const CheckMininumLengthOfValue = (value : string) : boolean=>{
    return value.length > 5 ?  true :  false;
  }

  const validateUsername = (value :string ,field : string) : boolean => {

    //network call
    if(!CheckMininumLengthOfValue(value)){
      updateUserDataError(field,'Mininum length of characters is 6')
      return false;
  }


    return true;

  }
  const validatePhoneOrEmail = (value :string ,lengthOfValue : number,field : string) : boolean => {
    
          
            if(lengthOfValue < 10){
              updateUserDataError(field,'Provide a valid value')
              return false;
            }
            if(lengthOfValue === 10 && ! isNaN(Number(value))){
              //network call to check if phone number exist
              
              updateUserDataError(field,'Provide a valid phone')
              return false;
            }
            else if (! value.match(/^\S+@\S+\.\S+$/)){
              
              //networkcall
              
              updateUserDataError(field,'Provide a valid email')
              return false;
            }
            
            return true;
  }
  const validatePassword = (value :string ,field : string) : boolean => {
      if(!CheckMininumLengthOfValue(value)){
          
          updateUserDataError(field,'Mininum length of characters is 6')
          return false;
      }

    return true;
  }
  const validateFullName = (value :string ,field : string) : boolean => {
    if(!CheckMininumLengthOfValue(value)){
      
      updateUserDataError(field,'Mininum length of characters is 6')
      return false;
  }

    return true;
  }



  //function to update the user input data
  const handleUserData = (evt: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    
    let valuePassedValidation = false;

    // if (!CheckMininumLengthOfValue(value)){
    //   toast.error('Minimun length four')
    //   return false;
    // }

        // Reset error for the current field
       
        
    
      setUserDataError(prev => ({
        ...prev,
        [name]: '',
      }));
      

    if (name === 'userName'){
      
      valuePassedValidation = validateUsername(value,name)
    }
    
    if (name === 'phoneOrEmail'){
      valuePassedValidation = validatePhoneOrEmail(value,value.length,name)
    }
    if (name === 'password'){
      valuePassedValidation = validatePassword(value,name)
    }
    if( name === 'fullName'){
      valuePassedValidation = validateFullName(value,name)
    }

    //some value is not accepted so returning from the function
    if (!valuePassedValidation){
      return ;
    }


//update user data if pass all validations
    setUserData(prev => ({
      ...prev,
      [name]:value,
    }));
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
                name="userName"
                error={userDataError['userName']}
                handleChange={handleUserData}
                placeholder="Username"
                updateUserDataError={updateUserDataError}
                Icon={FaUser} //importing the icons and passing to component
              />
              <TextInput
                name="phoneOrEmail"
                error={userDataError['phoneOrEmail']}
                handleChange={handleUserData}
                placeholder="Mobile Number or Email"
                Icon={FaMobileScreenButton}
                updateUserDataError={updateUserDataError}
              />

              <TextInput
                name="fullName"
                error={userDataError['fullName']}
                handleChange={handleUserData}
                placeholder="Full Name"
                Icon={PiIdentificationBadgeFill}  
                updateUserDataError={updateUserDataError}
              />
              <PasswordInput
                name={"password"}
                error={userDataError['password']}
                handleChange={handleUserData}
                placeholder="Password"
                updateUserDataError={updateUserDataError}
              />

              <Button color="primary" className="mt-3 w-full bg-blue-500">
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
