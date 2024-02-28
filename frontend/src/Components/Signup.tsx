import { Button } from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import "../App.css";
import { useState } from "react";
import { PasswordInput } from "./Form/PasswordInput";
import { FaUser } from "react-icons/fa";
import { FaMobileScreenButton } from "react-icons/fa6";
import { TextInput } from "./Form/TextInput";
import { PiIdentificationBadgeFill } from "react-icons/pi";


interface UserData {
  userName: string;
  fullName: string;
  phoneOrEmail: string;
  password: string;
}

export const Signup = () => {
  const [userData, setUserData] = useState<UserData>({
    userName: "",
    fullName: "",
    phoneOrEmail: "",
    password: "",
  });

  const handleUserData = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    console.log(name, value);
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
                error={""}
                handleChange={handleUserData}
                placeholder="userName"
                Icon={FaUser}
              />
              <TextInput
                name="phoneOrEmail"
                error={""}
                handleChange={handleUserData}
                placeholder="Mobile Number or Email"
                Icon={FaMobileScreenButton}
              />

              <TextInput
                name="fullName"
                error={""}
                handleChange={handleUserData}
                placeholder="Full Name"
                Icon={PiIdentificationBadgeFill}
              />
              <PasswordInput
                name={"password"}
                error={"fdsfsdf"}
                handleChange={handleUserData}
                placeholder="Password"
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
