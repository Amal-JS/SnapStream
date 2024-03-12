import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface authState {
    userLoggedIn:boolean,
    userName:string | null,
    userId:string | null,
    isSuperUser:boolean
}

const userIdFromLocalStorage = localStorage.getItem('userId');
const parsedUserId = userIdFromLocalStorage ? JSON.parse(userIdFromLocalStorage) : null;

const initialState : authState = {
    userLoggedIn : false,
    userName : '',
    userId : parsedUserId,
    isSuperUser:false
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        userLoggedIn:(state,action : PayloadAction<authState>)=>{
                state.userLoggedIn = true,
                state.userId = action.payload.userId,
                state.userName = action.payload.userName,
                state.isSuperUser= action.payload.isSuperUser
            
        },
        userLoggedOut:(state)=>{
                state.isSuperUser = false,
                state.userId = null,
                state.userLoggedIn = false,
                state.userName = ''
        }
    }
    
})

export default authSlice.reducer
export const {userLoggedIn,userLoggedOut} = authSlice.actions 

