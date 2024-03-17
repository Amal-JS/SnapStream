
import { FaRegUser } from 'react-icons/fa';
import '../../App.css';
import { TextInput } from '../../Components/Form/TextInput';
import { SideNav } from './SideNav';
import { BsPhone } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { Button } from '@nextui-org/react';
import { useButtonState } from '../../hooks/useButtonState';
import { useEffect, useState } from 'react';
import { authRoot, rootUrlPath } from '../../utils/url';
import axios from '../../../src/axios/axiosInstance'
import { CheckMininumLengthOfValue, checkFieldValueAlreadyUsed } from '../../utils/user';
import { customErrorToast, customSuccessToast } from '../../Toast';
import { generateOtp, sendOtp } from '../../utils/sendOtp';
import { useNavigate } from 'react-router-dom';
import { DateInput } from '../../Components/Form/DateInput';
import { TextArea } from '../../Components/Form/TextArea';
import { useAppSelector } from '../../hooks/redux';

interface UserProfileData {

  username:string ,
  email:string,
  phone:string,
  bio:string,
  dob:string 
}
interface UserProfileFormError {
  username:string,
  email:string,
  phone:string
}

 const UserEditContent = () => {

      const {formFilled,setFormFilled} = useButtonState()
      //after redux delete this
      const userId = useAppSelector(state => state.user.userId) ? useAppSelector(state => state.user.userId) :'';

      const [userProfileData,setUserProfileData] = useState<UserProfileData>({
        username:'',
        email:'',
        phone:'',
        bio:'',
        dob:''
      });
      //state only set on initial render
      const [userProfileInitialData,setUserProfileInitialData] = useState<UserProfileData>({
        username:'',
        email:'',
        phone:'',
        bio:'',
        dob:''
      });
      const [userProfileFormError,setUserProfileFormError] = useState<UserProfileFormError>({
        username:'',
        email:'',
        phone:''
      });
      const navigate = useNavigate()
  const canValueBeUsed = async (field:keyof UserProfileData ,value:string)=>{

    if (userId){
      let valueExist = checkFieldValueAlreadyUsed(field,value,userId)
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
    return false
   
  }
  const usernameAcceptable = async  (field:keyof UserProfileData ,value:string)=> {
    if(value.trim().length < 1){
      return false
    }
  const valueLengthAcceptable = CheckMininumLengthOfValue(value)
  if (!valueLengthAcceptable){
    setUserProfileFormError(prev => ({...prev,[field]:'Minimum length of charecters is 6.'}))
  }
  const valueAlreadyUsed = canValueBeUsed(field,value) 
  if(await valueAlreadyUsed){
    console.log('value taken')
    setUserProfileFormError(prev => ({...prev,[field]:`${field} already taken.`}))
  } 
        return valueAlreadyUsed   
  }
  const phoneNumberAcceptable = async (field:keyof UserProfileData,value:string)=> {
    if(value.trim().length < 1){
      return false
    }
    const valueLengthAcceptable = CheckMininumLengthOfValue(value)
  if (!valueLengthAcceptable){
    setUserProfileFormError(prev => ({...prev,[field]:'Minimum length of charecters is 6.'}))
    return true;
  }
  if (isNaN(Number(value)) || value.length < 10 || value.length > 10){
    setUserProfileFormError(prev => ({...prev,[field]:'Give a proper phone number.'}))
    return true;
  }
    const valueAlreadyUsed = canValueBeUsed(field,value)
    if(await valueAlreadyUsed){
      setUserProfileFormError(prev => ({...prev,[field]:`${field} already taken.`}))
    } 
        return valueAlreadyUsed 
  }
  const emailAcceptable =  async (field:keyof UserProfileData,value:string)=> {
    if(value.trim().length < 1){
      return false
    }
    const valueLengthAcceptable = CheckMininumLengthOfValue(value)
  if (!valueLengthAcceptable){
    setUserProfileFormError(prev => ({...prev,[field]:'Minimum length of charecters is 6.'}))
  }

  const validEmail  = (email:string)=> {

    // Regular expression for email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
    if(!validEmail(value)){
      setUserProfileFormError(prev => ({...prev,[field]:'Give a valid email'}))
      return true;
    }
    const valueAlreadyUsed = canValueBeUsed(field,value) 
    if(await valueAlreadyUsed){
      setUserProfileFormError(prev => ({...prev,[field]:`${field} already taken.`}))
    } 
        return valueAlreadyUsed 
  }

  const handleBlur = async (event:React.FocusEvent<HTMLInputElement> | React.FocusEvent<HTMLTextAreaElement>) =>{

    const {name,value} = event.target;
    let valueExist = false;
    if (name == 'username'){
   
      valueExist = await usernameAcceptable(name,value)
    }
    else if (name == 'phone') {
      valueExist = await phoneNumberAcceptable(name,value)
    }else if(name == 'email') {
      valueExist = await emailAcceptable('email',value)
      console.log('called email check');
      
    }

    if(valueExist){
      return ;
    }
    setUserProfileData(prev => ({
      ...prev,
      [name]:value
    }))
  }
  
  const handleChange =(event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) =>{
      const {name,value} = event.target;
  
    if (value === ''){
      if(userProfileInitialData[name as keyof UserProfileData] != '' && value == ''){
        setUserProfileData(prev => ({
          ...prev,
          [name]:userProfileInitialData[name as keyof UserProfileData]
        }))
      }
    }
    //set field error to ''
    setUserProfileFormError(prev => ({...prev , [name]:''}))
      setUserProfileData(prev => ({
        ...prev,
        [name]:value
      }))
  
  }
  const handleUpdateUserData = async () =>{
      if(Object.values(userProfileFormError).some(value=> value != '' )){
        customErrorToast('Give acceptable values.') 
       
        
        return
      }


     // Only update the values changed by the user
     let changedUserData: { [key: string]: string | number | undefined} = { user_id: userId ?userId : '' };
  const fields: (keyof UserProfileData)[] = ['username', 'email', 'phone'];

  for (const field of fields) {
    // Check if the field is dif  ferent
    if (userProfileData[field] != userProfileInitialData[field] ) {
      // If different, add it to changedUserData
      console.log('userProfileData[field] != userProfileInitialData[field]  ',userProfileData[field], userProfileInitialData[field] );
      
      const value = userProfileData[field];
      if(!(value.length > 6)){
          return
      }
      changedUserData[field] = value;
   
    }else{
console.log('not accepted ',userProfileData[field], userProfileInitialData[field]);

    }
  }
      
  if(userProfileData.bio != ''){
    changedUserData = {...changedUserData,bio:userProfileData.bio}
  }
  if(userProfileData.dob != ''){
    changedUserData  = {...changedUserData,dob:userProfileData.dob}
  }
   

  const udpdateUserData = async () =>{
    const response = await axios.patch(authRoot+'userData/',changedUserData)
    if(await response.data.userProfileUpdated){
      customErrorToast('Updated failed.Try after some time')
    }else{
      
      customSuccessToast('Updated successfully.')
      navigate('/edituserprofile/fadfsdfsd')
    }
  
  }

  udpdateUserData()
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
    const response = await axios.post(authRoot+'userData/',{user_id:userId})
    if (response.data.userData){
      setUserProfileData(response.data.userData)
      setUserProfileInitialData(response.data.userData)
    }
  
    
}

fetchUserData()
  },[])

//button disabled enabled
useEffect(()=>{

  //compare values in an array , this works
  //but this won't work ['',''] !== ['',''] => compares if the array is in same memory
  const initalValues = Object.values(userProfileInitialData);
  if (Object.values(userProfileData).some((value,index) => value != initalValues[index])) 
    {

    setFormFilled(false)
  }else{
    setFormFilled(true)
  }
  if(Object.values(userProfileData).every(value => value == '')){
    setFormFilled(true)
    }

},[userProfileData])
  return (
    <>
      <div className="w-full p-10 md:w-screen bg-secondary dark:bg-primary md:pl-52 mb-5 ">
  <h2 className='text-primary dark:text-secondary text-xl md:text-2xl' >Edit Profile</h2>
  <form >
    <div className='w-full md:w-6/12 my-8 p-3'>
      <div className=' mx-2 my-3  w-full'>
        <p className='text-primary dark:text-secondary text-sm md:text-xl w-3/12 mx-2'> Username </p>
      <TextInput
      name='username'
      Icon={FaRegUser}
      error={userProfileFormError['username']}
      placeholder={userProfileInitialData.username ?userProfileInitialData.username : 'Add your username'}
      handleBlur={handleBlur}
      handleChange={handleChange}
      />
      </div>
      <div className=' mx-2 my-3 items-center w-full'>
        <p className='text-primary dark:text-secondary text-sm md:text-xl w-3/12 mx-2'> Phone </p>
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
        <p className='text-primary dark:text-secondary text-sm md:text-xl w-3/12 mx-2'> Email </p>
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
      <div className=' mx-2 my-3 items-center w-full'>
        <p className='text-primary dark:text-secondary text-sm md:text-xl w-3/12 mx-2'> Birthday </p>
            
            <DateInput
      name='dob'
    
      error={''}
      placeholder={userProfileInitialData.email ? userProfileInitialData.email : 'Add your email'}
      handleBlur={handleBlur}
      handleChange={handleChange}
      />
      </div>
      
      <div className=' mx-2 mt-9  mb-3 items-center w-full'>
        <p className='text-primary dark:text-secondary text-sm md:text-xl w-3/12 mx-2'> Bio </p>
      <TextArea 
      name={'bio'}
placeholder='Say something about you'
handleBlur={handleBlur}
      handleChange={handleChange}
      error=''
      />
    </div>
    </div>
  </form>



  <Button className=" w-full bg-btn-enabled disabled:bg-btn-disabled disabled:cursor-not-allowed md:w-2/4"  disabled={formFilled} onClick={handleUpdateUserData}>
                <p className="text-base font-medium text-secondary " >Update Changes</p>
              </Button>


              <div className='w-full my-5'>
  <Button className=" w-full bg-green-600 md:w-1/4"   onClick={handleUpdatePassword}>
                <p className="text-base font-medium text-secondary " >Update Password</p>
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