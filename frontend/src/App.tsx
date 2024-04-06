import { Toast } from './Toast.tsx'
import { PageNotFound } from './pages/user/PageNotFound.tsx'
import { ForgotPassword } from './pages/user/ForgotPassword.tsx'
import {Login} from './pages/user/Login.tsx'
import { PasswordUpdate } from './pages/user/PasswordUpdate.tsx'
import {Signup} from './pages/user/Signup.tsx'
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom'
import { OtpVerification } from './pages/user/OtpVerification.tsx'
import { UserEdit } from './pages/user/UserEdit.tsx'
import { UserProfile } from './pages/user/UserProfile.tsx'
import { UserStories } from './pages/user/UserStories.tsx'
import { UserHome } from './pages/user/UserHome.tsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from 'react'
import { useAppSelector } from './hooks/redux.ts'

import { ToolTip } from './Components/Tooltip/Tooltip.tsx'
import { AuthenticatedRoute } from './pages/auth/AuthenticatedRoute.tsx'
import { CreatePost } from './pages/user/Post/CreatePost.tsx'
import { EditPost } from './pages/user/Post/EditPost.tsx'



function App() {

  const userState = useAppSelector(state => state.user)

  //theme change logic
  useEffect(()=>{
    if (userState.darkTheme){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
  },[userState.darkTheme])



  return (
  <>
 {/* <ToolTip/> */}
 <Toast />
 <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}>
 
  <BrowserRouter>
 
  <Routes>

    <Route path='/signup' element={<Signup/>} />
    <Route path='/forgotpassword/' element={<ForgotPassword/>}/>
    <Route path='/login' element={<Login/>}/>
    
    <Route path='/password/update/:id' element={<PasswordUpdate />} />
    <Route path='/password/update' element={<Navigate to="/404" />} />
    <Route path='/otpverify/' element={<OtpVerification/>} />
    
    <Route path='/' element={<AuthenticatedRoute />}>
    <Route index  element={<UserHome />} />
    <Route path='/password/reset' element={<ForgotPassword/>}/>
    <Route path='/userprofile/' element={<UserProfile />} />
    <Route path='/viewstories/' element={<UserStories />}/>
    <Route path='/edituserprofile/:id' element={<UserEdit />}/>
    <Route path='/createpost/' element={<CreatePost/>}/>
    <Route path='/editpost/:id/' element={<EditPost/>}/>
    </Route>

    <Route path='*' element={<PageNotFound />}/>
   
  </Routes>
  </BrowserRouter>

  </GoogleOAuthProvider>
  </>
  )
}

export default App
