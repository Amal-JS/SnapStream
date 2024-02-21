
import { Input, Button } from "@nextui-org/react";
import { FaGoogle } from "react-icons/fa";
import '../App.css';


export const Signup = () => {
  return (
    <>
      <div className="h-screen">
  <div className="bg-white  p-3 flex justify-center items-center" >
          <form className=" p-1 " >

            <div className="bg-white border-2 border-gray-300 p-6  text-center w-full md:w-96">
            <h2 className='pacifico-regular  text-4xl md:text-4xl mt-3 pr-2'>SnapStream</h2>
            <h2 className="text-gray-400 mt-3 text-base">Sign up to see photos and videos from your friends.</h2>

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


            <Input
                type="text"
                label="Mobile Number or Email"
                variant="bordered"
                defaultValue=""
                isInvalid={false}
                errorMessage=""
                className="w-full mb-2 mt-9"
              />
              <Input
                type="text"
                label="Full Name"
                variant="bordered"
                defaultValue=""
                isInvalid={false}
                errorMessage=""
                className="w-full mb-2"
              />
              <Input
                type="text"
                label="Username"
                variant="bordered"
                defaultValue=""
                isInvalid={false}
                errorMessage=""
                className="w-full mb-2 "
              />
              <Input
                type="password"
                label="Password"
                variant="bordered"
                defaultValue=""
                isInvalid={false}
                errorMessage=""
                className="w-full mb-8"
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
