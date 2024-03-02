import axios from "axios";
import { authRoot, rootUrlPath } from "./url";


//function generates a four digit otp and return it
export const generateOtp = () => {
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += Math.floor(Math.random() * 10);
    }
    return Number(otp.slice(0,4));
  };



const  getCsrfToken = async () =>{
    try {
  const response =  await axios.get(rootUrlPath+authRoot+'get_csrf_token/')
  return response.data.csrfToken
} catch (error) {
  console.error(error);
}
}

//sending otp and phoneOrEmail  value to backend to send otp in email or in phone number
 export const sendOtp = async (otp:number,phoneOrEmail:string)  => {
    
    const csrfToken = await getCsrfToken()

  //network call
  try {
    const response = await axios.post(
      rootUrlPath + authRoot + 'sendEmail/',
      { otp: otp, value: phoneOrEmail },
      { headers: { 'X-CSRFToken': csrfToken } }
    );
 
    return response.data.otpSendingFailed; // Corrected typo
  } catch (error) {
    console.error(error);
    return true; // Assuming failure if there's an error
  }
  
  }