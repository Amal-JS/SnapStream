import { Image } from "@nextui-org/react";
import SampleLoginGif from '../assets/login_sample_gif.gif';
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import '../App.css';
import { TextInput } from "./Form/TextInput";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import { PasswordInput } from "./Form/PasswordInput";

interface LoginFormData {
  username:string,
  password:string
}
export const Login = () => {


  const [formData,setFormData] = useState<LoginFormData>({
                                                          username:'',
                                                          password:''
                                                        })

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) : void  =>  {
      const {name,value} = event.target;
      //update the state in login form
      setFormData(prev => ({
        ...prev,
        [name]:value
      }))


  }
  return (
    <>
      <div className="flex   h-screen ">
        <div className="w-1/2 hidden md:flex bg-white  justify-center  items-center">
          <Image
            className="w-3/4 pl-12 object-contain"
            alt="NextUI hero Image"
            src={SampleLoginGif}
          />
        </div>


        <div className="bg-white h-full w-full md:w-1/2 p-3">
          <form className=" p-5  md:mt-12 ">

            <div className="bg-white border-2 border-gray-300 p-6 w-full md:w-1/2  md:justify-start md:p-5  text-center lg:w-300">
            <h2 className='pacifico-regular text-3xl md:text-4xl mt-3 mb-8'>SnapStream</h2>
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
              <Button color="primary" className="mt-3 w-full bg-blue-500">
                <p className="text-base font-medium ">Log in</p>
              </Button>

              <div className="flex justify-center mt-6">
                <div className="w-2/4 border-b-gray-300 border-2 border-t-0 border-l-0 border-r-0 px-2"></div>
                <p>or</p>
                <div className="w-2/4  border-b-gray-300 border-2 border-t-0 border-l-0 border-r-0 px-2"></div>
              </div>

              <div className="sm:flex-col md:flex-row flex justify-center p-2 items-center mt-8 cursor-pointer">
                <FcGoogle style={{ width: 30, height: 30 }} />
                <p className="ml-2 text-base font-medium text-red-500">
                  Log in with Google
                </p>
              </div>

              <div className="flex justify-center p-2 items-center mt-2 cursor-pointer mb-4">
                <p className="ml-2 text-base  text-gray-600">
                  Forgot password?{" "}
                </p>
              </div>
            </div>

            <div className="border-2 border-gray-300 p-5 text-center  bg-white h-full w-full md:w-1/2 mt-3 flex justify-center">
              <div className="block lg:flex">
                <p className="text-xs  md:text-sm">Don't have an account?</p>
                <p className="cursor-pointer text-blue-500 font-medium text-base pl-1">
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
