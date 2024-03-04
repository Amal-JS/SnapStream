
import { FaRegUser } from 'react-icons/fa';
import '../App.css';
import { TextInput } from './Form/TextInput';
import { SideNav } from './SideNav';
import { BsPhone } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Button } from '@nextui-org/react';
import { useButtonState } from '../hooks/useButtonState';
import { useEffect, useState } from 'react';
import { authRoot, rootUrlPath } from '../utils/url';
import axios from 'axios';
import { checkFieldValueAlreadyUsed } from '../utils/user';
import { customErrorToast } from '../Toast';
import { generateOtp, sendOtp } from '../utils/sendOtp';
import { useNavigate } from 'react-router-dom';

interface UserProfileData {
  username:string,
  email:string,
  phone:string
}
interface UserProfileFormError {
  username:string,
  email:string,
  phone:string
}

 const UserEditContent = () => {

      const {formFilled,setFormFilled} = useButtonState()
      //after redux delete this
      const id = 3;

      const [userProfileData,setUserProfileData] = useState<UserProfileData>({
        username:'',
        email:'',
        phone:''
      });
      //state only set on initial render
      const [userProfileInitialData,setUserProfileInitialData] = useState<UserProfileData>({
        username:'',
        email:'',
        phone:''
      });
      const [userProfileFormError,setUserProfileFormError] = useState<UserProfileData>({
        username:'',
        email:'',
        phone:''
      });
      const navigate = useNavigate()
  const canValueBeUsed = async (field:keyof UserProfileData ,value:string)=>{

    let valueExist = checkFieldValueAlreadyUsed(field,value)
    if (await valueExist){
        if(value == userProfileInitialData[field]){
          return false;
        }else{
          return true;
        }
    }else{
      return false;
    }
  }
  const usernameAcceptable = async  (field:keyof UserProfileData ,value:string)=> {

  const valueAlreadyUsed = canValueBeUsed(field,value) 
  if(await valueAlreadyUsed){
    setUserProfileFormError(prev => ({...prev,[field]:`${field} already taken.`}))
  } 
        return valueAlreadyUsed   
  }
  const phoneNumberAcceptable = async (field:keyof UserProfileData,value:string)=> {
    const valueAlreadyUsed = canValueBeUsed(field,value)
    if(await valueAlreadyUsed){
      setUserProfileFormError(prev => ({...prev,[field]:`${field} already taken.`}))
    } 
        return valueAlreadyUsed 
  }
  const emailAcceptable =  async (field:keyof UserProfileData,value:string)=> {
    const valueAlreadyUsed = canValueBeUsed(field,value) 
    if(await valueAlreadyUsed){
      setUserProfileFormError(prev => ({...prev,[field]:`${field} already taken.`}))
    } 
        return valueAlreadyUsed 
  }

  const handleBlur = async (event:React.FocusEvent<HTMLInputElement>) =>{

    const {name,value} = event.target;
    let valueExist = false;
    if (name == 'username'){
      valueExist = await usernameAcceptable(name,value)
    }
    else if (name == 'phone') {
      valueExist = await phoneNumberAcceptable(name,value)
    }else  {
      valueExist = await emailAcceptable('email',value)
    }

    if(valueExist){
      return ;
    }
    setUserProfileData(prev => ({
      ...prev,
      [name]:value
    }))
  }
  const handleChange =(event:React.ChangeEvent<HTMLInputElement>) =>{
      const {name,value} = event.target;
    //set field error to ''
    setUserProfileFormError(prev => ({...prev , [name]:''}))
      setUserProfileData(prev => ({
        ...prev,
        [name]:value
      }))
      
  }
  const handleUpdateUserData = async () =>{
      if(Object.values(userProfileFormError).some(value => value.length > 1)){
        customErrorToast('Give acceptable values.')
        return ;
      }
      
  }
  const handleUpdatePassword = () =>{

    const otp = generateOtp()
    localStorage.setItem(
      "otp",
      JSON.stringify({ otp: otp,
         process: "passwordUpdate" ,
         phoneOrEmail:userProfileInitialData.email ? userProfileInitialData.email : userProfileInitialData.phone,
        passwordUpdateFromProfile:true})
    );
    sendOtp(otp,userProfileInitialData.email ? userProfileInitialData.email : userProfileInitialData.phone)
    navigate('/otpverify/')
  }

  useEffect(()=>{
async function fetchUserData() {
    const response = await axios.post(rootUrlPath+authRoot+'userData/',{user_id:id})
    if (response.data.userData){
      setUserProfileData(response.data.userData)
      setUserProfileInitialData(response.data.userData)
    }
}

fetchUserData()
  },[])

//button disabled enabled
useEffect(()=>{
  console.log('user profile data :',userProfileData);
  
  if ((Object.values(userProfileData) !== Object.values(userProfileInitialData) &&
    Object.values(userProfileData).every(value => value.trim().length > 4))){
    setFormFilled(false)
  }else{
    setFormFilled(true)
  }
},[userProfileData])
  return (
    <>
      <div className="w-full p-10 md:w-screen bg-black md:pl-52 mb-5 ">
  <h2 className='text-white text-xl md:text-2xl' >Edit Profile</h2>
  <form >
    <div className='w-full md:w-6/12 my-8 p-3'>
      <div className=' mx-2 my-3  w-full'>
        <p className='text-white text-sm md:text-xl w-3/12 mx-2'> Username </p>
      <TextInput
      name='username'
      Icon={FaRegUser}
      error={userProfileFormError['username']}
      placeholder={userProfileInitialData.username}
      handleBlur={handleBlur}
      handleChange={handleChange}
      />
      </div>
      <div className=' mx-2 my-3 items-center w-full'>
        <p className='text-white text-sm md:text-xl w-3/12 mx-2'> Phone </p>
            <TextInput
      name='phone'
      Icon={BsPhone}
      error={userProfileFormError['phone']}
      placeholder={userProfileInitialData.phone ?userProfileInitialData.phone : 'Add your phone'}
      handleBlur={handleBlur}
      handleChange={handleChange}
      />
      </div>
            
      <div className=' mx-2 my-3 items-center w-full'>
        <p className='text-white text-sm md:text-xl w-3/12 mx-2'> Email </p>
            <TextInput
      name='email'
      type='email'
      Icon={MdEmail}
      error={userProfileFormError['email']}
      placeholder={userProfileInitialData.email ? userProfileInitialData.email : 'Add your email'}
      handleBlur={handleBlur}
      handleChange={handleChange}
      />
      </div>
    </div>
  </form>



  <Button className=" w-full bg-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed md:w-2/4"  disabled={formFilled} onClick={handleUpdateUserData}>
                <p className="text-base font-medium text-white" >Update Changes</p>
              </Button>


              <div className='w-full my-5'>
  <Button className=" w-full bg-green-600 md:w-1/4"   onClick={handleUpdatePassword}>
                <p className="text-base font-medium text-white" >Update Password</p>
              </Button>
  </div>
  
      </div>
    </>
  );
};


export  const UserEdit = ()=> {
  return (
    <SideNav>
      <UserEditContent/>
    </SideNav>
  )
}