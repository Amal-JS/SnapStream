import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../axios/axiosInstance";
import { authRoot } from "../utils/url";
import { customErrorToast, customSuccessToast } from "../Toast";


interface authState {
    userLoggedIn:boolean,
    userId:string | null,
    isSuperUser:boolean,
    darkTheme:boolean,
    profilePictureUrl?:string
}
interface profilePicture {
    profilePictureUrl :string
}
const userIdFromLocalStorage = localStorage.getItem('userId');
const parsedUserId = userIdFromLocalStorage ? JSON.parse(userIdFromLocalStorage) : null;

const initialState : authState = {
    userLoggedIn : false,
    darkTheme : false,
    userId : parsedUserId,
    isSuperUser:false,
    profilePictureUrl:''
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userLoggedIn:(state,action : PayloadAction<authState>)=>{
                state.userLoggedIn = true;
                state.userId = action.payload.userId;
                state.darkTheme = action.payload.darkTheme;
                state.isSuperUser= action.payload.isSuperUser
                state.profilePictureUrl = action.payload?.profilePictureUrl
            
        },
        userLoggedOut:(state)=>{
                state.isSuperUser = false;
                state.userId = null;
                state.userLoggedIn = false;
                state.darkTheme = false
                state.profilePictureUrl = ''
        },
        themeToggle :(state)=>{
            // if user logged in and user switched the theme update on db
            if(state.userId){
                    const udpateUserThemePreference = async ()=>{
                        const response = await axiosInstance.patch(authRoot+'userData/',{'user_id':state.userId,'darkTheme':!state.darkTheme})
                        if(response.data.profileDetailsUpdated){
                            customSuccessToast('Theme preference updated')
                        }else{
                            customErrorToast('Update theme after some time.')
                        }
                    }
                    udpateUserThemePreference()
                    
            }
            return {...state,
                    darkTheme : state.darkTheme  ? false : true}
        },
        userProfilePictureUpdated : (state,action : PayloadAction<profilePicture>)=>{
            return {
                ...state,
                profilePictureUrl:action.payload.profilePictureUrl
            }
        },
    }
    
})

export default authSlice.reducer
export const {userLoggedIn,userLoggedOut,themeToggle,userProfilePictureUpdated} = authSlice.actions 

