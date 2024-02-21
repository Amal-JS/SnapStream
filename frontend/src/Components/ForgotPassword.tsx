
import { Input, Button } from "@nextui-org/react";
import { CiLock } from "react-icons/ci";
import '../App.css';
import { Link } from "react-router-dom";


export const ForgotPassword = () => {
  return (
    <>
      <div className="h-screen">
        <div className="p-4 my-4 border-b-2 border-b-gray-200">
        <h2 className='pacifico-regular text-center  text-4xl md:text-4xl  pr-2 md:text-start md:pl-32'>SnapStream</h2>
        </div>

  <div className="bg-white  p-3 flex justify-center items-center" >
          <form className=" p-1 " >
          
            <div className="bg-white border-2 border-gray-200 p-6  text-center w-full md:w-96">
           <div className="flex justify-center">
           <CiLock className="text-black text-8xl font-black text-center"/>
           </div>
            <h2 className="my-2 text-black text-xl font-medium">Trouble logging in?</h2>
            <h2 className="text-gray-400 mt-3 text-base">Enter your email, phone, or username and we'll send you a link to get back into your account.</h2>



              


            <Input
                type="text"
                label="Username , Phone  or Email"
                variant="bordered"
                defaultValue=""
                isInvalid={false}
                errorMessage=""
                className="w-full mb-2 mt-9"
              />
              

              <Button color="primary" className="mt-3 w-full bg-blue-500">
                <p className="text-base font-medium ">Get Account</p>
              </Button>

            
              <div className="flex justify-center mt-6 min-w-400 mb-4">
                <div className="w-2/4 border-b-gray-200 border-2 border-t-0 border-l-0 border-r-0 px-2"></div>
                <p>or</p>
                <div className="w-2/4  border-b-gray-200 border-2 border-t-0 border-l-0 border-r-0 px-2 "></div>
              </div>

              <Link to='/signup' className="text-base text-black font-medium hover:text-gray-500">Create new account</Link>
              
            </div>

            <div className="border-2 border-gray-200 p-5 text-center  bg-white h-full w-full flex justify-center">
              <div className="flex">
                <Link to='/' className="text-base text-black font-medium hover:text-gray-500">Back to Login</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
