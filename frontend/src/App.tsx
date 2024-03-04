import { Toast } from './Toast.tsx'
import { PageNotFound } from './Components/PageNotFound.tsx'
import { ForgotPassword } from './Components/ForgotPassword.tsx'
import {Login} from './Components/Login.tsx'
import { PasswordUpdate } from './Components/PasswordUpdate.tsx'
import {Signup} from './Components/Signup.tsx'
import { BrowserRouter, Routes , Route, Navigate } from 'react-router-dom'
import { OtpVerification } from './Components/OtpVerification.tsx'
import { UserEdit } from './Components/UserEdit.tsx'
import { UserProfile } from './Components/UserProfile.tsx'
import { UserStories } from './Components/UserStories.tsx'
import { UserHome } from './Components/UserHome.tsx'

function App() {


  return (
  <>
 <Toast />
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<UserHome />} />
    <Route path='/signup' element={<Signup/>} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/password/reset' element={<ForgotPassword/>}/>
    <Route path='/password/update/:id' element={<PasswordUpdate />} />
    <Route path='/password/update' element={<Navigate to="/404" />} />
    <Route path='/otpverify/' element={<OtpVerification/>} />
    <Route path='/userprofile/:id' element={<UserProfile />} />
    <Route path='/viewstories/:id' element={<UserStories />}/>
    <Route path='/edituserprofile/:id' element={<UserEdit />}/>
    <Route path='/forgotpassword/' element={<ForgotPassword/>}/>

    <Route path='*' element={<PageNotFound />}/>

  </Routes>
  </BrowserRouter>

  </>
  )
}

export default App
