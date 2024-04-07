import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    initialPageShown : false
}

export const  initialPageSlice = createSlice({
    name:'initialPage',
    initialState,
    reducers:{
        setUserVisitedApp :()=>{
                return {initialPageShown:true}
        }
    }
})


export default initialPageSlice.reducer
export const {setUserVisitedApp} = initialPageSlice.actions 

