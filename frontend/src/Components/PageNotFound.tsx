
import "../App.css";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <>
      <div className="h-screen">
        <div className="py-4 px-4 md:px-32 my-4 border-b-2 bg-secondary dark:bg-primary border-secondary-border dark:border-primary-border flex justify-between">
          <h2 className="pacifico-regular text-center  text-2xl md:text-4xl  pr-2 cursor-pointer">
            <Link to={'/login'}>SnapStream </Link> 
          </h2>

          <div>
            <Link
              to="/login"
              className="text-base font-medium bg-btn-enabled text-white px-5 py-2 border-r-2 rounded-xl"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="text-base font-medium bg-white text-blue-500 px-5 py-2 border-r-2 rounded-xl"
            >
              Sign up
            </Link>
          </div>

        </div>

        <div className="bg-secondary dark:bg-primary p-3 text-center">
          <h2 className="my-6 text-primary dark:text-secondary text-xl font-medium md:text-4xl">
            Sorry, this page isn't available.
          </h2>

          <h2 className=" mt-7 text-base md:text-xl text-primary dark:text-secondary ">
            The link you followed may be broken, or the page may have been
            removed. Go back to ConnectCam.
          </h2>
        </div>
      </div>
    </>
  );
};
