
import { Input, Button } from "@nextui-org/react";
import { FaLock, FaUserLock } from "react-icons/fa";
import '../App.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./Form/PasswordInput";
import { useButtonState } from "../hooks/useButtonState";
import { customErrorToast, customSuccessToast } from "../Toast";
import { authRoot, rootUrlPath } from "../utils/url";
import axios from "axios";


interface PasswordForm {
  password1 : string,
  password2 : string
}
export const PasswordUpdate = () => {

      const navigate = useNavigate()
      const [passwordForm,setPasswordForm] = useState<PasswordForm>({
        password1 : '',
        password2 : ''
      })
      const {formFilled,setFormFilled} = useButtonState()
      const [error,setError] = useState<string>('')

  //if verify in local allow access else redirect    
  // useEffect(()=>{
  //   const verfiyDataInLocalStorage = localStorage.getItem('verify')
  // if(!verfiyDataInLocalStorage){
  //     navigate(-1)
  // } 
  // console.log(verfiyDataInLocalStorage);
  
  // },[])

  //update password disable enable and error showing
  useEffect(()=>{
    if(Object.values(passwordForm).every(value => value.trim().length > 5)){
      setFormFilled(false)
    }else{
      setFormFilled(true)
    }

    if (passwordForm.password1 && passwordForm.password2.length > 4 && passwordForm.password1 !== passwordForm.password2){
        setError('Field values not matching')
    }
  },[passwordForm])

  

const handleChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
  //errror empty
  setError('')
                  const {name,value} = event.target;
                  //update password
                  setPasswordForm(prev => ({
                    ...prev,
                    [name]:value
                  }))
}

const handleUpdatePassword = async () => {

  if(error){
    customErrorToast('Give same values on both fields.')
    return ;
  }
  const verifyDataInLocalStorage= localStorage.getItem('verify')
  const dataInLocalStorage = verifyDataInLocalStorage && JSON.parse(verifyDataInLocalStorage)
  if(dataInLocalStorage.phoneOrEmail){
    const response = await axios.post(rootUrlPath+authRoot+'ForgotPassword/',
    {password:passwordForm.password1,'phoneOrEmail':dataInLocalStorage.phoneOrEmail})

    if(response.data.passwordUpdated){
      customSuccessToast('Password updated successfully.')
      
      if(dataInLocalStorage?.passwordUpdateFromProfile){
          navigate('/userprofile/')
      }else{
        customSuccessToast('Login to continue.')
        navigate('/login/')
      }
      
      
    }else{
      customErrorToast('Some issue occured.Please try again.')
    }
    //remove data from local storage
    localStorage.removeItem('verify')
  }

}
  return (
    <>
      <div className="h-screen">
        <div className="p-4 my-4 border-b-3 border-secondary-border dark:border-primary-border">
        <h2 className='pacifico-regular text-center  text-4xl md:text-4xl  pr-2 md:text-start md:pl-32'>SnapStream</h2>
        </div>

  <div className="  p-3 flex justify-center items-center" >
          <form className=" p-1 " >
          
            <div className=" border-3 dark:border-4 border-secondary-border dark:border-primary-border  p-6  text-center w-full md:w-96">
           <div className="flex justify-center ">
           <FaUserLock className="dark:text-secondary text-primary text-8xl font-black text-center"/>
           </div>

           <PasswordInput
                handleChange={handleChange}
                name={"password1"}
                error={""}
                placeholder="New Password"
              />
              <PasswordInput
                handleChange={handleChange}
                name={"password2"}
                error={""}
                placeholder="Re-enter  Password"
              />
            
            
              {error && <p className="text-sm md:text-base font-bold my-3 text-danger">{error}</p>}

              <Button color="primary" className="mt-3 w-full bg-btn-enabled disabled:bg-btn-disabled disabled:cursor-not-allowed"
              disabled={formFilled} onClick={handleUpdatePassword}>
                <p className="text-base font-medium ">Update Password</p>
              </Button>

            
            </div>

           
          </form>
        </div>
      </div>
    </>
  );
};
