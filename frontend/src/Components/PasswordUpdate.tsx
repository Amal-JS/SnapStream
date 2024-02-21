
import { Input, Button } from "@nextui-org/react";
import { FaLock, FaUserLock } from "react-icons/fa";
import '../App.css';


export const PasswordUpdate = () => {
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
           <FaUserLock className="text-black text-8xl font-black text-center"/>
           </div>

            <Input
                type="text"
                label="New password"
                variant="bordered"
                defaultValue=""
                isInvalid={false}
                errorMessage=""
                className="w-full mb-2 mt-9"
              />
              <Input
              endContent={<FaLock className="text-default-400 pointer-events-none flex-shrink-0 focus:text-blue-500 mb-3" />}
                type="text"
                label="Re enter new password"
                variant="bordered"
                defaultValue=""
                isInvalid={false}
                errorMessage=""
                className="w-full mb-2 mt-4  "
                
              />
              

              <Button color="primary" className="mt-3 w-full bg-blue-500">
                <p className="text-base font-medium ">Update Password</p>
              </Button>

            
            </div>

           
          </form>
        </div>
      </div>
    </>
  );
};
