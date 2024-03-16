// import { useEffect } from "react"
// import { useAppSelector,useAppDispatch } from "../../hooks/redux"
// import { Navigate, Outlet, useNavigate } from "react-router-dom"
// import axiosInstance from "../../axios/axiosInstance"
// import { customErrorToast } from "../../Toast"
// import { userLoggedIn } from "../../Redux/authSlice"
// import { authRoot } from "../../utils/url"

// export const AuthenticatedRoute = ()=>{

//     // if auth token exist in local storage , and it is not valid or state doesn't have user data 
//     // redirect user to login

//     //if token exist  and valid token , then set userData in user state
//     const dispatch = useAppDispatch()
//      //check auth_token in local storage if not return user to login route
//      const authTokenExistInLocal = localStorage.getItem('auth_token')

//     const navigate = useNavigate()

//     useEffect(()=>{


//          //if authtoken exist in local to update the userState 
//     const getUserDataForState = async ()=>{
//         const response = await axiosInstance.post(authRoot+'getLoggedUserData/')
//         //auth token expired redirect to login
//         if(response.status === 401 || response.data.userDoesNotExist){
//             //clear the local storage token , it is invalid
//             localStorage.removeItem('auth_token')

//             customErrorToast('Please login to continue')
//             return <Navigate to='/login/' ></Navigate>
//         }else{
//             dispatch(userLoggedIn({
//                                     userLoggedIn:true,
//                                     userId:response.data.userId,
//                                     isSuperUser:response.data.isSuperUser,
//                                     darkTheme:response.data.darkTheme
//                                     }))
//         }

//     }
//     const checkUserOrSuperUser  = ()=>{
        
//             //Check if user has admin privelage , then redircect to admin login
//             const isUserAdmin  = useAppSelector(state => state.user.isSuperUser)
//             if(isUserAdmin){
//                 //route to admin login
//             }else{
//                 return <Outlet />
          
//         }
//     }    
//     if(authTokenExistInLocal){
//         getUserDataForState()
//         checkUserOrSuperUser()
//     }else{
//         Navigate('/login/')
//     }
    
//     },[authTokenExistInLocal,dispatch,navigate])

//     return null;
// }


import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import axiosInstance from "../../axios/axiosInstance";
import { customErrorToast } from "../../Toast";
import { userLoggedIn } from "../../Redux/authSlice";
import { authRoot } from "../../utils/url";
import { Login } from "../user/Login";

export const AuthenticatedRoute = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authTokenExistInLocal = localStorage.getItem('auth_token');
    const isUserAdmin = useAppSelector(state => state.user.isSuperUser);
    const userLoggedInApp = useAppSelector(state => state.user.userLoggedIn)
    
    

    useEffect(() => {
        const getUserDataForState = async () => {
            try {
                const response = await axiosInstance.post(authRoot + 'getLoggedUserData/');
                if (response.status === 401 || response.data.userDoesNotExist) {
                    localStorage.removeItem('auth_token');
                    customErrorToast('Please login to continue');
                    navigate('/login/');
                } else {
                    dispatch(userLoggedIn({
                        userLoggedIn: true,
                        userId: response.data.userId,
                        isSuperUser: response.data.isSuperUser,
                        darkTheme: response.data.darkTheme
                    }));
                    //go to home page
                    navigate('/')
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
console.log('authenticated route');
        //start
        if(userLoggedInApp){
            return 
        }

        // Check if auth token exists and fetch user data
        if (authTokenExistInLocal) {
            getUserDataForState();
        } else {
            navigate('/login/');
        }
    }, []);

    // Check if user is admin
    useEffect(() => {
        if (isUserAdmin) {
            // navigate('/admin/login');
        }
    }, [isUserAdmin]);

    return userLoggedInApp ? <Outlet/> : <Login/>;
};
