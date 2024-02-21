import { Button, Input,  } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const OtpVerification = () => {

  return (
    <>
      <div className="h-screen">
        <div className="p-4 my-4 border-b-2 border-b-gray-200">
          <h2 className="pacifico-regular text-center  text-4xl md:text-4xl  pr-2 md:text-start md:pl-32">
            <Link to={"/login"}>SnapStream</Link>
          </h2>
        </div>


        <div className="bg-white  p-3 flex justify-center ">
          <form className=" p-1 ">
            <div className="bg-white border-2 border-gray-200 p-6  text-center w-full md:w-96">
              <h2 className="my-6 text-black text-xl font-medium md:text-2xl">
                Enter Otp
              </h2>

              <div className="flex w-full justify-evenly">
                <Input
                  type="text"
                  label=""
                  variant="bordered"
                  defaultValue=""
                  isInvalid={false}
                  errorMessage=""
                  className="w-1/6   mt-2"
                />
                <Input
                  type="text"
                  label=""
                  variant="bordered"
                  defaultValue=""
                  isInvalid={false}
                  errorMessage=""
                  className="w-1/6   mt-2  "
                />
                <Input
                  type="text"
                  label=""
                  variant="bordered"
                  defaultValue=""
                  isInvalid={false}
                  errorMessage=""
                  className="w-1/6  mt-2"
                />
                <Input
                  type="text"
                  label=""
                  variant="bordered"
                  defaultValue=""
                  isInvalid={false}
                  errorMessage=""
                  className="w-1/6   mt-2  "
                />
              </div>

              <div>
                <p className="my-5 p-2 text-2xl font-medium"> 01:00</p>
              </div>
              <Button color="primary" className="mt-3 w-full bg-blue-500">
                <p className="text-base font-medium ">Check otp</p>
              </Button>
            </div>
          </form>
        </div>

        

     

      </div>
    </>
  );
};
