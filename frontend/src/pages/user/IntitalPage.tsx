import darkIcon from "../../assets/darkIcon.png";
import lightIcon from "../../assets/lightIcon.png";
import { useAppSelector } from "../../hooks/redux";
import "../../App.css";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
export const InitialPage = () => {
    const isDarkThemeEnabled = useAppSelector((state) => state.user.darkTheme);
    const alreadyShownInitialPage = useAppSelector((state) => state.initialPageSlice);
  
    useEffect(() => {
      console.log('initial page');
  
      if (alreadyShownInitialPage) {
        handleRedirect();
      }
  
      const timeout = setTimeout(() => {
        console.log('initial page loaded');
        handleRedirect(); // Redirect after 2 seconds
      }, 2000);
  
      return () => {
        clearTimeout(timeout);
      };
    }, [alreadyShownInitialPage]);
  
    const navigate = useNavigate();
  
    const handleRedirect = () => {
      navigate('/');
    };
  
    return (
      <div className="relative">
        <div className="w-full h-screen flex justify-center items-center">
          <div className="w-full h-10/12 bg-white dark:bg-primary flex justify-center">
            {isDarkThemeEnabled ? (
              <div>
                <img src={darkIcon} className="w-32 h-32" />
              </div>
            ) : (
              <img src={lightIcon} className="w-32 h-32" />
            )}
          </div>
        </div>
        <div className="absolute bottom-[10%] left-[35%] md:left-[46%]">
          <p className="text-primary dark:text-secondary text-center pacifico-regular mt-3 text-2xl font-medium">
            SnapStream
          </p>
        </div>
      </div>
    );
  };
  