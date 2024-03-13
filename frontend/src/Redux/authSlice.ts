import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface authState {
    userLoggedIn:boolean,
    userId:string | null,
    isSuperUser:boolean,
    darkTheme:boolean
}

const userIdFromLocalStorage = localStorage.getItem('userId');
const parsedUserId = userIdFromLocalStorage ? JSON.parse(userIdFromLocalStorage) : null;

const initialState : authState = {
    userLoggedIn : false,
    darkTheme : false,
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
                state.darkTheme = action.payload.darkTheme,
                state.isSuperUser= action.payload.isSuperUser
            
        },
        userLoggedOut:(state)=>{
                state.isSuperUser = false,
                state.userId = null,
                state.userLoggedIn = false,
                state.darkTheme = false
        }
    }
    
})

export default authSlice.reducer
export const {userLoggedIn,userLoggedOut} = authSlice.actions 

