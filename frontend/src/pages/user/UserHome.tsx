import { useAppSelector } from "../../hooks/redux"
import { Post } from "./Post/Post";
import { SideNav } from "./SideNav";
import { UserHomeStatus } from "./status/UserHomeStatus";

 const UserHomeComponent = ()=> {
    const userLoggedIn = useAppSelector((state)=>state.user.userLoggedIn)
    if (userLoggedIn){
        console.log('user logged in');
        
    }else{
        console.log('not logged in ');
        
    }
    return (
        
        <div className=" md:pl-40 md:mt-3">
            <UserHomeStatus />
        <div className="flex w-full h-screen p-3 mt-5 md:mt-3">
            <div className="w-full md:w-5/12 p-1 md:p-5 md:ml-36 bg-secondary dark:bg-primary  md:border-r-3 border-r-secondary-border dark:border-r-primary-border flex-col justify-center">
            <Post/>
            </div>
            <div className="hidden px-4 md:flex md:justify-center w-7/12" >
                <p>fasdfasdfsdfsd</p>
            </div>
        </div>
        </div>
    )
}

export const UserHome = ()=>{
    return <SideNav><UserHomeComponent/></SideNav>
}