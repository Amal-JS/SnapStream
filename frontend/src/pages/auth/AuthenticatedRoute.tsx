
// import React, { useEffect } from "react";
// import { useNavigate, Outlet } from "react-router-dom";
// import { useAppSelector, useAppDispatch } from "../../hooks/redux";
// import axiosInstance from "../../axios/axiosInstance";
// import { customErrorToast } from "../../Toast";
// import { userLoggedIn } from "../../Redux/authSlice";
// import { authRoot } from "../../utils/url";
// import { Login } from "../user/Login";

// export const AuthenticatedRoute = () => {
// const dispatch = useAppDispatch();
// const navigate = useNavigate();
// const authTokenExistInLocal = localStorage.getItem('auth_token');
// const isUserAdmin = useAppSelector(state => state.user.isSuperUser);
// const userLoggedInApp = useAppSelector(state => state.user.userLoggedIn)



// useEffect(() => {
// const getUserDataForState = async () => {
// try {
// const response = await axiosInstance.post(authRoot + 'getLoggedUserData/');
// if (response.status === 401 || response.data.userDoesNotExist) {
// localStorage.removeItem('auth_token');
// customErrorToast('Please login to continue');
// navigate('/login/');
// } else {
// dispatch(userLoggedIn({
// userLoggedIn: true,
// userId: response.data.userId,
// isSuperUser: response.data.isSuperUser,
// darkTheme: response.data.darkTheme
// }));
// //go to home page
// navigate('/')
// }
// } catch (error) {
// console.error("Error fetching user data:", error);
// }
// };
// console.log('authenticated route');
// //start
// if(userLoggedInApp){
// return
// }

// // Check if auth token exists and fetch user data
// if (authTokenExistInLocal) {
// getUserDataForState();
// } else {
// navigate('/login/');
// }
// }, []);

// // Check if user is admin
// useEffect(() => {
// if (isUserAdmin) {
// // navigate('/admin/login');
// }
// }, [isUserAdmin]);

// return userLoggedInApp ? <Outlet/> : <Login/>;
// };



import React, { useEffect, useState } from "react";
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



const getUserDataForState = async () => {
try {
const response = await axiosInstance.post(authRoot + 'getLoggedUserData/');
if (response.status === 401 || response.data.userDoesNotExist) {
localStorage.removeItem('auth_token');
customErrorToast('Please login to continue');
} else {
dispatch(userLoggedIn({
userLoggedIn: true,
userId: response.data.userId,
isSuperUser: response.data.isSuperUser,
darkTheme: response.data.darkTheme
}));
//go to home page
}
} catch (error) {
console.error("Error fetching user data:", error);
}
};

useEffect(() => {
// Check if auth token exists and fetch user data
if (authTokenExistInLocal) {
getUserDataForState();
}
}, []);

// Check if user is admin
useEffect(() => {
if (isUserAdmin) {
navigate('/admin/login');
}
}, [isUserAdmin]);


return userLoggedInApp ? <Outlet/> : <Login/>;
};

