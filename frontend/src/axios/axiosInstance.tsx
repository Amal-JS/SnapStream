import axios from "axios";
import {rootUrlPath} from '../../src/utils/url'


// const axiosInstance = axios.create({
//     baseURL:rootUrlPath,
//     withCredentials:true
// })


//get access and refresh token from local storage
const isAuthTokensInLocalStorge = localStorage.getItem('auth_token')
let access_token = ''
let refresh_token = ''
if(isAuthTokensInLocalStorge){
    const authTokens = JSON.parse(isAuthTokensInLocalStorge)
    access_token = authTokens.access_token;
    refresh_token = authTokens.refresh_token
}


const axiosInstance = axios.create({
    baseURL:rootUrlPath, 
    headers:{
        'Authorization':access_token?`Bearer ${access_token}`:'',
        'Accept':'application/json',
        'Refresh-token' : refresh_token ? refresh_token : '',

    },
    withCredentials:true
})



axiosInstance.interceptors.request.use((request)=>{

    return request
})

axiosInstance.interceptors.response.use((response) => {
    //new access token
    if(response.headers['access_token']){
        //delete the existing one from the localstorage update with new one
        console.log('response contains access');
        
        const newAuthToken = JSON.stringify(
        {'access_token':response.headers['access_token'],
            'refresh_token':refresh_token})
        console.log('old access auth token :',localStorage.getItem('auth_token'));
        //remove the old one
        localStorage.removeItem('auth_token')
        //set the new one
        localStorage.setItem('auth_token',newAuthToken)
        console.log('new auth token :',newAuthToken);
        
    }else if (response.headers['refresh_token']){  //intial time user logs in getting and storing refresh token
        console.log('old refresh auth token :',localStorage.getItem('auth_token'));
        //remove the old one
        localStorage.removeItem('auth_token')
        //new one
        const newAuthToken = JSON.stringify(
            {'access_token':response.headers['access_token'],
                'refresh_token':response.headers['refresh_token']})
        //set the new one
        localStorage.setItem('auth_token',newAuthToken)
        console.log('new auth token :',newAuthToken);       
    }else if(response.status === 401){
        //refresh token expired
        //clear the local storage 
        localStorage.removeItem('auth_token')
    }


    return response
})

export default axiosInstance;